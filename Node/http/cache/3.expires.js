let http = require('http');
let url = require('url');
let fs = require('fs');
let mime = require('mime');
let path = require('path');
/**
 * 强制缓存：把资源缓存在客户端，如果客户端再次请求这个资源时，先获取到缓存中的数据，查看是否过期，如果没有过期，则根本不需要向服务器确认，直接使用本地缓存即可
 */
http
  .createServer(function(req, res) {
    let { pathname } = url.parse(req.url);
    let filepath = path.join(__dirname, pathname);
    console.log(filepath);
    fs.stat(filepath, (err, stat) => {
      if (err) {
        return sendError(req, res);
      } else {
        return send(req, res, filepath);
      }
    });
  })
  .listen(8080);

function send(req, res, filepath) {
  res.setHeader('Content-Type', mime.getType(filepath));
  res.setHeader('Expires', new Date(Date.now() + 60 * 1000).toUTCString());
  res.setHeader('Cache-Control', 'max-age=60');
  fs.createReadStream(filepath).pipe(res);
}
function sendError(req, res) {
  res.statusCode = 500;
  res.end('Error');
}
