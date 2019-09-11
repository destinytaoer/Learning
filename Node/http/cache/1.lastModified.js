/**
 * 1. 第一次访问服务器的时候，服务器返回资源和缓存规则，客户端则把此资源缓存在本地的缓存数据库中
 * 2. 第二次客户端需要此数据的时候，要取得缓存的标识，然后去问一下服务器是否有更新，如果是最新的就返回 304 ，直接使用缓存数据，如果不是最新的，则返回最新的资源以及缓存规则，客户端根据缓存规则把资源缓存到数据库中
 */
let http = require('http');
let url = require('url');
let fs = require('fs');
let mime = require('mime');
let path = require('path');
http
  .createServer(function(req, res) {
    let { pathname } = url.parse(req.url);
    let filepath = path.join(__dirname, pathname);
    fs.stat(filepath, (err, stat) => {
      if (err) {
        return sendError(req, res);
      } else {
        // 获取客户端发过来的上次修改时间
        let ifModifiedSince = req.headers['if-modified-since'];
        let LastModified = stat.ctime.toGMTString();
        if (ifModifiedSince === LastModified) {
          res.writeHead(304);
          res.end('');
        } else {
          return send(req, res, filepath, LastModified);
        }
      }
    });
  })
  .listen(8080);

function send(req, res, filepath, LastModified) {
  res.setHeader('Content-Type', mime.getType(filepath));
  // 发给客户端之后，客户端把这个时间保存起来，下一次再请求这个资源时，会把这个时间再发回给服务器
  res.setHeader('Last-Modified', LastModified);
  fs.createReadStream(filepath).pipe(res);
}
function sendError(req, res) {
  res.statusCode = 500;
  res.end('Error');
}
