const http = require('http');
const fs = require('fs');
const path = require('path');
const D = __dirname;

const { user_record } = require('NeteaseCloudMusicApi');

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

// ====== 缓存 ======
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
    console.log('[缓存] 已刷新,', songs.length, '首');
  } catch (e) {
    console.error('[缓存] 异常:', e.message);
  }
}

function startCacheTimer() {
  if (cacheTimer) clearInterval(cacheTimer);
  refreshCache();
  cacheTimer = setInterval(refreshCache, CACHE_TTL);
}

// ====== API ======
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
    return sendJSON(res, cacheData || { error: '暂无数据', songs: [] });
  }

  if (apiPath === '/api/netease/random') {
    if (!cacheData || !cacheData.songs || cacheData.songs.length === 0) await refreshCache();
    const songs = (cacheData && cacheData.songs) || [];
    if (songs.length === 0) return sendJSON(res, { error: '暂无数据' }, 404);
    return sendJSON(res, { song: songs[Math.floor(Math.random() * songs.length)] });
  }

  if (apiPath === '/api/netease/sync' && req.method === 'POST') {
    await refreshCache();
    return sendJSON(res, { ok: true, songCount: cacheData ? cacheData.songs.length : 0 });
  }

  return sendJSON(res, { error: 'unknown api' }, 404);
}

// ====== 静态 ======
function serveStatic(req, res) {
  let f = req.url.split('?')[0];
  if (f === '/') f = '/index.html';
  const fp = path.join(D, f);
  fs.readFile(fp, (e, d) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    const ext = path.extname(f);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'text/plain', 'Access-Control-Allow-Origin': '*' });
    res.end(d);
  });
}

// ====== 启动 ======
const server = http.createServer((req, res) => {
  const p = req.url.split('?')[0];
  if (p.startsWith('/api/netease/')) return handleAPI(req, res, p);
  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log('Server: http://localhost:' + PORT + '/');
  console.log('[网易云] 用户: 拿铁超人獭, UID:', UID);
  startCacheTimer();
});
