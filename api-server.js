// ====== 随心一听 API 服务器 ======
const http = require('http');
const { user_record } = require('NeteaseCloudMusicApi');

const PORT = process.env.PORT || 8760;
const UID = 547894281; // 拿铁超人獭
const CACHE_TTL = 30 * 60 * 1000;

const ALLOWED_ORIGINS = [
  'https://latte7-9.github.io',
  'http://localhost:8760',
  'http://127.0.0.1:8760'
];

let cacheData = null;
let cacheTimer = null;

// ====== 缓存 ======
async function refreshCache() {
  try {
    const r = await user_record({ uid: UID, type: 1 });
    if (r.body.code !== 200 || !r.body.weekData) {
      console.log('[缓存] 获取失败:', r.body.code);
      return;
    }
    const songs = r.body.weekData.slice(0, 10).map(item => ({
      id: item.song.id,
      name: item.song.name,
      artists: (item.song.ar || []).map(a => a.name).join(' / '),
      cover: (item.song.al || {}).picUrl || '',
      playCount: item.playCount || 0,
      url: 'https://music.163.com/#/song?id=' + item.song.id
    }));
    cacheData = { songs, updatedAt: new Date().toISOString(), status: 'ok' };
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

// ====== HTTP ======
function sendJSON(res, data, status = 200, origin) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

function getOrigin(req) {
  const o = req.headers.origin || '';
  return ALLOWED_ORIGINS.includes(o) ? o : ALLOWED_ORIGINS[0];
}

const server = http.createServer(async (req, res) => {
  const origin = getOrigin(req);
  const url = new URL(req.url, 'http://localhost');
  const p = url.pathname;

  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET,POST', 'Access-Control-Allow-Headers': 'Content-Type' });
    return res.end();
  }

  if (p === '/health') return sendJSON(res, { status: 'ok' }, 200, origin);

  if (p === '/api/netease/weekly') {
    if (cacheData && cacheData.songs.length > 0) return sendJSON(res, cacheData, 200, origin);
    await refreshCache();
    return sendJSON(res, cacheData || { error: '暂无数据', songs: [] }, 200, origin);
  }

  if (p === '/api/netease/random') {
    if (!cacheData || !cacheData.songs || cacheData.songs.length === 0) await refreshCache();
    const songs = (cacheData && cacheData.songs) || [];
    if (songs.length === 0) return sendJSON(res, { error: '暂无数据' }, 200, origin);
    const song = songs[Math.floor(Math.random() * songs.length)];
    return sendJSON(res, { song }, 200, origin);
  }

  if (p === '/api/netease/status') {
    return sendJSON(res, {
      ok: true,
      uid: UID,
      cachedAt: cacheData ? cacheData.updatedAt : null,
      songCount: cacheData ? cacheData.songs.length : 0
    }, 200, origin);
  }

  if (p === '/api/netease/sync' && req.method === 'POST') {
    await refreshCache();
    return sendJSON(res, { ok: true, songCount: cacheData ? cacheData.songs.length : 0 }, 200, origin);
  }

  return sendJSON(res, { error: 'not found' }, 404, origin);
});

server.listen(PORT, () => {
  console.log('API running on port', PORT);
  startCacheTimer();
});
