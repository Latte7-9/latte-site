const http = require('http');
const fs = require('fs');
const path = require('path');
const D = __dirname;
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
http.createServer((q, r) => {
  let f = q.url.split('?')[0];
  if (f === '/') f = '/index.html';
  const fp = path.join(D, f);
  fs.readFile(fp, (e, d) => {
    if (e) { r.writeHead(404); r.end('404: ' + f); return; }
    const ext = path.extname(f);
    r.writeHead(200, {
      'Content-Type': mime[ext] || 'text/plain',
      'Access-Control-Allow-Origin': '*'
    });
    r.end(d);
  });
}).listen(8760, () => console.log('Server running at http://localhost:8760/'));
