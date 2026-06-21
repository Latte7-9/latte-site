const http = require('http');
const fs = require('fs');
const path = require('path');
const D = __dirname;

// NeteaseCloudMusicApi
const { user_record, song_detail, login_qr_key, login_qr_create, login_qr_check, login_status } = require('NeteaseCloudMusicApi');

const CACHE_FILE = path.join(D, 'data', 'currently.json');
const COOKIE_FILE = path.join(D, 'data', '.netease_cookie');
const CACHE_TTL = 30 * 60 * 1000; // 30 分钟
const PORT = 8760;

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

// ====== 全局状态 ======
let neteaseCookie = '';
let cacheData = null;
let cacheTimer = null;
let qrUnikey = '';

// ====== 工具函数 ======
function readJSON(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf-8')); }
  catch { return null; }
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
}

function sendJSON(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
  res.end(JSON.stringify(data));
}

// ====== 网易云缓存逻辑 ======
async function refreshCache() {
  if (!neteaseCookie) return;
  try {
    const recordRes = await user_record({ cookie: neteaseCookie, type: 1 });
    if (recordRes.body.code !== 200) {
      console.log('[网易云] 刷新缓存失败:', recordRes.body);
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
    cacheData = {
      netease: { songs, updatedAt: new Date().toISOString(), status: 'ok' }
    };
    writeJSON(CACHE_FILE, cacheData);
    console.log('[网易云] 缓存已刷新，共', songs.length, '首');
  } catch (e) {
    console.error('[网易云] 缓存刷新异常:', e.message);
  }
}

function startCacheTimer() {
  if (cacheTimer) clearInterval(cacheTimer);
  refreshCache();
  cacheTimer = setInterval(refreshCache, CACHE_TTL);
}

// ====== 加载持久化 cookie ======
function loadCookie() {
  try {
    if (fs.existsSync(COOKIE_FILE)) {
      neteaseCookie = fs.readFileSync(COOKIE_FILE, 'utf-8').trim();
      if (neteaseCookie) console.log('[网易云] 已加载持久化 cookie');
    }
  } catch { /* ignore */ }
}

function saveCookie() {
  if (neteaseCookie) fs.writeFileSync(COOKIE_FILE, neteaseCookie, 'utf-8');
}

// ====== API 路由处理 ======
async function handleAPI(req, res, apiPath) {
  // GET /api/netease/status
  if (apiPath === '/api/netease/status') {
    if (!neteaseCookie) return sendJSON(res, { loggedIn: false, reason: 'no_cookie' });
    try {
      const statusRes = await login_status({ cookie: neteaseCookie });
      const profile = (statusRes.body && statusRes.body.data && statusRes.body.data.profile) || null;
      return sendJSON(res, {
        loggedIn: !!profile,
        nickname: profile ? profile.nickname : null,
        cachedAt: cacheData && cacheData.netease ? cacheData.netease.updatedAt : null,
        songCount: cacheData && cacheData.netease ? cacheData.netease.songs.length : 0
      });
    } catch (e) {
      return sendJSON(res, { loggedIn: false, reason: e.message });
    }
  }

  // GET /api/netease/weekly
  if (apiPath === '/api/netease/weekly') {
    if (!neteaseCookie) return sendJSON(res, { error: '未登录网易云', songs: [] }, 401);
    if (cacheData && cacheData.netease && cacheData.netease.songs.length > 0) {
      return sendJSON(res, cacheData.netease);
    }
    await refreshCache();
    if (cacheData && cacheData.netease) {
      return sendJSON(res, cacheData.netease);
    }
    return sendJSON(res, { error: '暂无数据', songs: [] });
  }

  // GET /api/netease/random
  if (apiPath === '/api/netease/random') {
    if (!neteaseCookie) return sendJSON(res, { error: '未登录网易云' }, 401);
    if (!cacheData || !cacheData.netease || cacheData.netease.songs.length === 0) {
      await refreshCache();
    }
    const songs = cacheData && cacheData.netease ? cacheData.netease.songs : [];
    if (songs.length === 0) return sendJSON(res, { error: '暂无数据' }, 404);
    const song = songs[Math.floor(Math.random() * songs.length)];
    return sendJSON(res, { song });
  }

  // GET /api/netease/qr-key
  if (apiPath === '/api/netease/qr-key') {
    try {
      const keyRes = await login_qr_key();
      qrUnikey = keyRes.body.data.unikey;
      const qrRes = await login_qr_create({ key: qrUnikey, qrimg: true });
      return sendJSON(res, {
        unikey: qrUnikey,
        qrimg: qrRes.body.data.qrimg
      });
    } catch (e) {
      return sendJSON(res, { error: e.message }, 500);
    }
  }

  // GET /api/netease/qr-check?key=xxx
  if (apiPath === '/api/netease/qr-check') {
    const url = new URL('http://localhost' + req.url);
    const key = url.searchParams.get('key') || qrUnikey;
    if (!key) return sendJSON(res, { error: 'missing key' }, 400);
    try {
      const checkRes = await login_qr_check({ key });
      const code = checkRes.body.code;
      if (code === 803) {
        neteaseCookie = checkRes.body.cookie;
        saveCookie();
        startCacheTimer();
        return sendJSON(res, { status: 'ok', nickname: checkRes.body.nickname || (checkRes.body.profile ? checkRes.body.profile.nickname : null) });
      }
      if (code === 800) return sendJSON(res, { status: 'expired' });
      if (code === 801) return sendJSON(res, { status: 'waiting' });
      if (code === 802) return sendJSON(res, { status: 'scanned' });
      return sendJSON(res, { status: 'unknown', code });
    } catch (e) {
      return sendJSON(res, { error: e.message }, 500);
    }
  }

  // POST /api/netease/sync
  if (apiPath === '/api/netease/sync' && req.method === 'POST') {
    if (!neteaseCookie) return sendJSON(res, { error: '未登录网易云' }, 401);
    await refreshCache();
    return sendJSON(res, { ok: true, songCount: cacheData && cacheData.netease ? cacheData.netease.songs.length : 0 });
  }

  return sendJSON(res, { error: 'unknown api' }, 404);
}

// ====== 静态文件服务 ======
function serveStatic(req, res) {
  let f = req.url.split('?')[0];
  if (f === '/') f = '/index.html';
  const fp = path.join(D, f);
  fs.readFile(fp, (e, d) => {
    if (e) { res.writeHead(404); res.end('404: ' + f); return; }
    const ext = path.extname(f);
    res.writeHead(200, {
      'Content-Type': mime[ext] || 'text/plain',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(d);
  });
}

// ====== 主服务器 ======
const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];

  if (urlPath.startsWith('/api/netease/')) {
    return handleAPI(req, res, urlPath);
  }

  serveStatic(req, res);
});

// ====== 启动 ======
loadCookie();
cacheData = readJSON(CACHE_FILE);

server.listen(PORT, async () => {
  console.log('Server running at http://localhost:' + PORT + '/');
  if (neteaseCookie) {
    try {
      const statusRes = await login_status({ cookie: neteaseCookie });
      const profile = (statusRes.body && statusRes.body.data && statusRes.body.data.profile);
      if (profile) {
        console.log('[网易云] 已登录:', profile.nickname);
        startCacheTimer();
      } else {
        console.log('[网易云] cookie 已过期，请前往管理面板扫码登录');
        neteaseCookie = '';
      }
    } catch (e) {
      console.log('[网易云] 登录检查失败:', e.message);
    }
  } else {
    console.log('[网易云] 未登录，请访问 http://localhost:' + PORT + '/admin/ 扫码登录');
  }
});
