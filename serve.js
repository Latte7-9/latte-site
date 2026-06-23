const http = require('http');
const fs = require('fs');
const path = require('path');
const D = __dirname;

const { user_record, song_url } = require('NeteaseCloudMusicApi');

const CACHE_FILE = path.join(D, 'data', 'currently.json');
const CACHE_TTL = 30 * 60 * 1000;
const PORT = 8760;
const UID = 547894281;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

let cacheData = null;
let cacheTimer = null;

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

async function refreshCache() {
  try {
    const r = await user_record({ uid: UID, type: 1 });
    if (r.body.code !== 200 || !r.body.weekData) return;
    const songs = r.body.weekData.slice(0, 10).map(item => ({
      id: item.song.id,
      name: item.song.name,
      artists: (item.song.ar || []).map(a => a.name).join(' / '),
      cover: (item.song.al || {}).picUrl || '',
      playCount: item.playCount || 0,
      url: 'https://music.163.com/#/song?id=' + item.song.id
    }));
    cacheData = { songs, updatedAt: new Date().toISOString(), status: 'ok' };
    writeJSON(CACHE_FILE, { netease: cacheData });
    console.log('[cache] refreshed,', songs.length, 'songs');
  } catch (e) {
    console.error('[cache] error:', e.message);
  }
}

function startCacheTimer() {
  if (cacheTimer) clearInterval(cacheTimer);
  refreshCache();
  cacheTimer = setInterval(refreshCache, CACHE_TTL);
}

function sendJSON(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(data));
}

async function handleAPI(req, res, apiPath) {
  if (apiPath === '/api/netease/status') {
    return sendJSON(res, { ok: true, uid: UID, cachedAt: cacheData ? cacheData.updatedAt : null, songCount: cacheData ? cacheData.songs.length : 0 });
  }

  if (apiPath === '/api/netease/weekly') {
    if (cacheData && cacheData.songs.length > 0) return sendJSON(res, cacheData);
    await refreshCache();
    return sendJSON(res, cacheData || { error: '鏆傛棤鏁版嵁', songs: [] });
  }

  if (apiPath === '/api/netease/random') {
    if (!cacheData || !cacheData.songs || cacheData.songs.length === 0) await refreshCache();
    const songs = (cacheData && cacheData.songs) || [];
    if (songs.length === 0) return sendJSON(res, { error: '鏆傛棤鏁版嵁' }, 404);
    return sendJSON(res, { song: songs[Math.floor(Math.random() * songs.length)] });
  }


  if (apiPath === '/api/netease/song_url') {
    try {
      const parsed = new URL(req.url, 'http://localhost'); const qid = (parsed.searchParams.get('id') || '').replace(/[^0-9]/g, '');
      if (!qid) return sendJSON(res, { error: 'missing id' }, 400);
      const r = await song_url({ id: qid, br: 128000 });
      const u = r.body && r.body.data && r.body.data[0] ? r.body.data[0].url : null;
      return sendJSON(res, { url: u });
    } catch (e) { return sendJSON(res, { error: e.message }, 500); }
  }
  if (apiPath === '/api/netease/sync' && req.method === 'POST') {
    await refreshCache();
    return sendJSON(res, { ok: true, songCount: cacheData ? cacheData.songs.length : 0 });
  }

  return sendJSON(res, { error: 'unknown api' }, 404);
}

function serveStatic(req, res) {
  let f = req.url.split('?')[0];
  if (f === '/') f = '/index.html';
  const fp = path.join(D, f);

  fs.readFile(fp, (e, d) => {
    if (!e) {
      const ext = path.extname(f);
      res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain', 'Access-Control-Allow-Origin': '*' });
      res.end(d);
      return;
    }
    // 鐩綍璺緞灏濊瘯 index.html
    if (f.endsWith('/')) {
      fs.readFile(path.join(D, f + 'index.html'), (e2, d2) => {
        if (!e2) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
          res.end(d2);
          return;
        }
        res.writeHead(404); res.end('404');
      });
    } else if (!path.extname(f)) {
      fs.readFile(path.join(D, f + '/index.html'), (e2, d2) => {
        if (!e2) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
          res.end(d2);
          return;
        }
        res.writeHead(404); res.end('404');
      });
    } else {
      res.writeHead(404); res.end('404');
    }
  });
}

const server = http.createServer((req, res) => {
  const p = req.url.split('?')[0];
  if (p.startsWith('/api/netease/')) return handleAPI(req, res, p);
  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log('Server: http://localhost:' + PORT + '/');
  console.log('[netEase] user ID:', UID);
  startCacheTimer();
});