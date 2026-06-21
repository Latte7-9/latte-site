// ====== 随心一听 API 服务器（Railway 部署用） ======
const http = require('http');
const { user_record, login_qr_key, login_qr_create, login_qr_check, login_status } = require('NeteaseCloudMusicApi');

const PORT = process.env.PORT || 8760;
const CACHE_TTL = 30 * 60 * 1000; // 30 分钟

// CORS 允许的域名
const ALLOWED_ORIGINS = [
  'https://latte7-9.github.io',
  'http://localhost:8760',
  'http://127.0.0.1:8760'
];

let neteaseCookie = process.env.NETEASE_COOKIE || '';
let cacheData = null;
let cacheTimer = null;
let qrUnikey = '';

function sendJSON(res, data, status = 200, origin) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  res.writeHead(status, headers);
  res.end(JSON.stringify(data));
}

async function refreshCache() {
  if (!neteaseCookie) return;
  try {
    const recordRes = await user_record({ cookie: neteaseCookie, type: 1 });
    if (recordRes.body.code !== 200) {
      console.log('[缓存] 刷新失败:', recordRes.body.code);
      return;
    }
    const weekData = recordRes.body.weekData || [];
    const songs = weekData.slice(0, 5).map(item => ({
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

function getOrigin(req) {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  return ALLOWED_ORIGINS[0];
}

const server = http.createServer(async (req, res) => {
  const origin = getOrigin(req);
  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname;

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // Health check
  if (pathname === '/health') {
    return sendJSON(res, { status: 'ok', loggedIn: !!neteaseCookie }, 200, origin);
  }

  // Status
  if (pathname === '/api/netease/status') {
    if (!neteaseCookie) return sendJSON(res, { loggedIn: false, reason: 'no_cookie' }, 200, origin);
    try {
      const r = await login_status({ cookie: neteaseCookie });
      const profile = (r.body && r.body.data && r.body.data.profile) || null;
      return sendJSON(res, {
        loggedIn: !!profile,
        nickname: profile ? profile.nickname : null,
        cachedAt: cacheData ? cacheData.updatedAt : null,
        songCount: cacheData ? cacheData.songs.length : 0
      }, 200, origin);
    } catch (e) {
      return sendJSON(res, { loggedIn: false, reason: e.message }, 200, origin);
    }
  }

  // Weekly Top 5
  if (pathname === '/api/netease/weekly') {
    if (!neteaseCookie) return sendJSON(res, { error: '未登录', songs: [] }, 200, origin);
    if (cacheData && cacheData.songs.length > 0) return sendJSON(res, cacheData, 200, origin);
    await refreshCache();
    return sendJSON(res, cacheData || { error: '暂无数据', songs: [] }, 200, origin);
  }

  // Random
  if (pathname === '/api/netease/random') {
    if (!neteaseCookie) return sendJSON(res, { error: '未登录' }, 200, origin);
    if (!cacheData || !cacheData.songs || cacheData.songs.length === 0) await refreshCache();
    const songs = (cacheData && cacheData.songs) || [];
    if (songs.length === 0) return sendJSON(res, { error: '暂无数据' }, 200, origin);
    const song = songs[Math.floor(Math.random() * songs.length)];
    return sendJSON(res, { song }, 200, origin);
  }

  // QR Key
  if (pathname === '/api/netease/qr-key') {
    try {
      const keyRes = await login_qr_key();
      qrUnikey = keyRes.body.data.unikey;
      const qrRes = await login_qr_create({ key: qrUnikey, qrimg: true });
      return sendJSON(res, { unikey: qrUnikey, qrimg: qrRes.body.data.qrimg }, 200, origin);
    } catch (e) {
      return sendJSON(res, { error: e.message }, 500, origin);
    }
  }

  // QR Check
  if (pathname === '/api/netease/qr-check') {
    const key = url.searchParams.get('key') || qrUnikey;
    if (!key) return sendJSON(res, { error: 'missing key' }, 400, origin);
    try {
      const checkRes = await login_qr_check({ key });
      const code = checkRes.body.code;
      if (code === 803) {
        neteaseCookie = checkRes.body.cookie;
        startCacheTimer();
        return sendJSON(res, { status: 'ok', nickname: checkRes.body.nickname || (checkRes.body.profile ? checkRes.body.profile.nickname : null) }, 200, origin);
      }
      if (code === 800) return sendJSON(res, { status: 'expired' }, 200, origin);
      if (code === 801) return sendJSON(res, { status: 'waiting' }, 200, origin);
      if (code === 802) return sendJSON(res, { status: 'scanned' }, 200, origin);
      return sendJSON(res, { status: 'unknown', code }, 200, origin);
    } catch (e) {
      return sendJSON(res, { error: e.message }, 500, origin);
    }
  }

  // Get cookie (admin use)
  if (pathname === '/api/netease/get-cookie' && req.method === 'POST') {
    if (!neteaseCookie) return sendJSON(res, { cookie: '' }, 200, origin);
    return sendJSON(res, { cookie: neteaseCookie, hint: '复制到 Railway 环境变量 NETEASE_COOKIE 以持久化' }, 200, origin);
  }

  // Sync
  if (pathname === '/api/netease/sync' && req.method === 'POST') {
    if (!neteaseCookie) return sendJSON(res, { error: '未登录' }, 200, origin);
    await refreshCache();
    return sendJSON(res, { ok: true, songCount: cacheData ? cacheData.songs.length : 0 }, 200, origin);
  }

  return sendJSON(res, { error: 'not found' }, 404, origin);
});

// 启动
server.listen(PORT, async () => {
  console.log('API server running on port', PORT);
  if (neteaseCookie) {
    try {
      const r = await login_status({ cookie: neteaseCookie });
      if (r.body && r.body.data && r.body.data.profile) {
        console.log('[网易云] 已登录:', r.body.data.profile.nickname);
        startCacheTimer();
      } else {
        console.log('[网易云] cookie 过期');
        neteaseCookie = '';
      }
    } catch (e) {
      console.log('[网易云] 登录检查失败:', e.message);
    }
  } else {
    console.log('[网易云] 未登录，请通过管理面板扫码');
  }
});
