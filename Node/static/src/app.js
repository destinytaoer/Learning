// 要创建一个服务器
let config = require('./config');
let http = require('http');
let fs = require('fs');
let path = require('path');
let zlib = require('zlib');
let crypto = require('crypto');
let mime = require('mime');
let url = require('url');
let { promisify, inspect } = require('util');
let stat = promisify(fs.stat);
let readdir = promisify(fs.readdir);
// 这个模块能够打印出有颜色的命令行
let chalk = require('chalk');
// 这是一个控制 控制台是否输出的模块
// 每个 debug 实例都有一个名字，名称最好由两个部分组成：第一部分一般是项目名，第二部分是模块名
// 是否输出取决于环境变量中 DEBUG 的值是否等于其名字
// 通过命令行 set DEBUG=xxx 设置环境变量名
// 使用 set DEBUG=* 可以使得所有模块的 debug 都打印出来
let handlebars = require('handlebars'); // 模板引擎
// 编译模板，得到一个渲染方法，然后传入实际数据就可以得到渲染后的 HTML
function list() {
  let tmpl = fs.readFileSync(
    path.resolve(__dirname, 'template', 'list.html'),
    'utf8'
  );
  return handlebars.compile(tmpl);
}
// 需要设置环境变量才能打印出 log
process.env.DEBUG = 'static:*';
let debug = require('debug')('static:app');
class Server {
  constructor(argv) {
    // 获取到渲染文件列表的方法
    this.list = list();
    this.config = Object.assign({}, config, argv);
  }
  start() {
    let server = http.createServer();
    server.on('request', this.request.bind(this));
    server.listen(this.config.port, () => {
      let url = `${this.config.host}:${this.config.port}`;
      debug(`server started at ${chalk.green(url)}`);
    });
  }
  async request(req, res) {
    // 先取到客户端想要的文件或文件路径
    let { pathname } = url.parse(req.url);
    if (pathname == '/favicon.ico') {
      return this.sendError(req, res, 404);
    }
    let filepath = path.join(this.config.root, pathname);
    try {
      // 获取到文件的详情
      // TODO: 对文件名中的特殊字符需要进行处理
      filepath = filepath.replace('%20', ' ');
      let statObj = await stat(filepath);
      if (statObj.isDirectory()) {
        let files = await readdir(filepath);
        files = files.map(file => ({
          url: path.join(pathname, file),
          name: file
        }));
        // 如果是目录，应该显示目录下面的文件列表
        let html = this.list({
          title: pathname,
          files
        });
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
      } else {
        // 如果是文件，那么就直接发送该文件
        // this.sendFile(req, res, filepath, statObj);
        // 走缓存
        this.handleCache(req, res, filepath, statObj);
      }
    } catch (e) {
      // inspect 把一个对象转换成字符串
      debug(inspect(e));
      this.sendError(req, res);
    }
  }
  sendFile(req, res, filepath, statObj) {
    // 设置文件类型，然后将文件流传给 res
    res.setHeader('Content-Type', mime.getType(filepath) + ';charset=utf8');
    // 范围请求，获取到范围
    let { start, end } = this.getRange(req, res, filepath, statObj);
    // 文件只获取到范围字节
    let rs = fs.createReadStream(filepath, { start, end });
    // 实现压缩
    let encoding = this.getEncoding(req, res);
    if (encoding) {
      rs.pipe(encoding).pipe(res);
    } else {
      rs.pipe(res);
    }
  }
  sendError(req, res, statusCode) {
    res.statusCode = statusCode || 500;
    res.end(`There is somethiing wrong in the server! Please try later`);
  }
  handleCache(req, res, filepath, statObj) {
    // 强制缓存 30s
    res.setHeader('Cache-Control', 'private, max-age=30');
    res.setHeader('Expires', new Date(Date.now() + 30 * 1000).toGMTString());

    // 对比缓存，使用 etag
    let ifNoneMatch = req.headers['is-none-match'];
    let out = fs.createReadStream(filepath);
    let sha = crypto.createHash('sha1');
    out.on('data', function(data) {
      sha.update(data);
    });
    out.on('end', () => {
      let etag = sha.digest('hex');
      if (ifNoneMatch === etag) {
        res.writeHead(304);
        res.end('');
      } else {
        res.setHeader('Etag', etag);
        this.sendFile(req, res, filepath, statObj);
      }
    });
  }
  getEncoding(req, res) {
    // Accept-Encoding: gzip, deflate
    let acceptEncoding = req.headers['accept-encoding'];
    if (/\bgzip\b/.test(acceptEncoding)) {
      res.setHeader('Content-Encoding', 'gzip');
      return zlib.createGzip();
    } else if (/\bdeflate\b/.test(acceptEncoding)) {
      res.setHeader('Content-Encoding', 'deflate');
      return zlib.createDeflate();
    } else {
      return null;
    }
  }
  getRange(req, res, filepath, statObj) {
    // 告诉客户端自身支持 range
    res.setHeader('Accept-Ranges', 'bytes');
    let range = req.headers['range'];
    let start = 0;
    let end = statObj.size;
    if (range) {
      // bytes=0-xxx
      let [, s, e] = range.match(/bytes=(\d*)-(\d*)/);
      start = s ? parseInt(s) : start;
      end = e ? parseInt(e) : end;
      res.setHeader('Content-Range', `bytes ${start}-${end}/${statObj.size}`);
    }
    return { start, end: end - 1 };
  }
}

// let server = new Server();
// server.start(); // 启动服务

module.exports = Server;
