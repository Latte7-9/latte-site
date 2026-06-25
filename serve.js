const http = require('http');
const fs = require('fs');
const path = require('path');
const D = __dirname;

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
  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log('Server: http://localhost:' + PORT + '/');
});