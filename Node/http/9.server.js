let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let { promisify } = require('util');
let stat = promisify(fs.stat);
let mime = require('mime');
let zlib = require('zlib');
/**
 * 客户端向服务器端发起请求的时候，会通过请求头的 Accept-Encoding 字段告知服务器支持的解压缩格式。
 * Accept-Encoding: gzip, deflate
 */
let server = http.createServer(async function(req, res) {
  let { pathname } = url.parse(req.url);
  // 请求的文件路径
  let filepath = path.join(__dirname, pathname);
  try {
    let statObj = await stat(filepath);
    // mime 可以根据不同的文件内容类型返回不同的 Content-Type
    res.setHeader('Content-Type', mime.getType(pathname));

    // 为了兼容不同浏览器，Node 把所有请求头转换为小写
    let acceptEncoding = req.headers['accept-encoding'];
    // 内容协商
    if (acceptEncoding) {
      if (acceptEncoding.match(/\bgzip\b/)) {
        // 告诉客户端自己用什么压缩格式
        res.setHeader('Content-Encoding', 'gzip');
        fs.createReadStream(filepath)
          .pipe(zlib.createGzip())
          .pipe(res);
      } else if (acceptEncoding.match(/\bdeflate\b/)) {
        res.setHeader('Content-Encoding', 'deflate');
        fs.createReadStream(filepath)
          .pipe(zlib.createDeflate())
          .pipe(res);
      } else {
        fs.createReadStream(filepath).pipe(res);
      }
    }
  } catch (e) {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(8080);
