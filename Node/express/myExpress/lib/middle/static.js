const path = require('path');
const fs = require('fs');
const url = require('url');
const mime = require('mime');
function static(root, options = {}) {
  /**
   * dotfiles: 处理.开头的文件是否允许访问，比如 .gitignore
   * etag: 控制 etag 是否发送
   * lastModified: 控制 lastModified 是否发送
   * maxAge: 控制 maxAge 的值
   * extensions: 是否自动补充后缀名，值是一个后缀名查找顺序数组或者 false
   */
  let {
    dotfiles = 'ignore',
    etag = true,
    lastModified = true,
    maxAge = 0,
    extensions = false
  } = options;
  return function(req, res, next) {
    let { pathname } = url.parse(req.url, true);
    let filepath = path.join(root, pathname);
    let parts = filepath.split(path.sep);
    // 文件名以点开头
    let isDotFile = parts[parts.length - 1][0] === '.';
    if (isDotFile && dotfiles == 'deny') {
      // 拒绝访问
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 403; // 客户端无权限访问
      return res.end(http.STATUS_CODES[403]);
    }
    fs.stat(filepath, function(err, stat) {
      if (err) {
        // 没有找到这个文件，就继续往下
        next();
      } else {
        res.setHeader('Content-Type', mime.getType(pathname) + ';charset=utf8');
        if (etag) {
          // 这里 etag 值是简单处理，实际需要参考前面的 hash 算法
          res.setHeader('Etag', stat.mtime.toUTCString());
        }
        if (lastModified) {
          res.setHeader('Last-Modified', stat.mtime.toUTCString());
        }
        res.setHeader('Cache-Control', `max-age=${maxAge}`);
        fs.createReadStream(filepath).pipe(res);
      }
    });
  };
}

module.exports = static;
