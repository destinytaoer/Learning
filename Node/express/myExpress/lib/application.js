// 实现 Router 和 app 的分离
const Router = require('./router');
const http = require('http');
const path = require('path');
const methods = require('methods'); // 返回所有方法字符串的数组
// http.METHODS 都是大写，而 methods 中都是小写
// 用于将类数组转换为数组
const slice = Array.prototype.slice;

function Application() {
  this.settings = {};
  this.engines = {}; // 用来保存文件扩展名和渲染函数
}
// 延迟初始化 Router，只有当需要的时候再进行 Router 的初始化，节省性能
Application.prototype.lazyrouter = function() {
  if (!this._router) {
    this._router = Router();
  }
};

// 传二个参数表示设置，传一个参数表示获取
Application.prototype.set = function(key, val) {
  if (arguments.length == 1) {
    return this.settings[key];
  }
  this.settings[key] = val;
};

methods.forEach(function(method) {
  Application.prototype[method] = function() {
    // 额外的 get 功能，获取 app 中设置的值
    if (method == 'get' && arguments.length == 1) {
      return this.set(arguments[0]);
    }
    // 使用到时，才进行初始化
    this.lazyrouter();
    this._router.get.apply(this._router, slice.call(arguments));
    return this;
  };
});

// 规定特定后缀文件的渲染引擎
Application.prototype.engine = function(ext, render) {
  // 没有 . 就给它加上 .
  let extension = ext[0] == '.' ? ext : '.' + ext;
  this.engines[extension] = render;
};

Application.prototype.render = function(name, options, callback) {
  // 对应 app.set
  let ext = '.' + this.get('view engine');
  // 如果没有拓展名，就添加默认的拓展名
  name = name.indexOf('.') != -1 ? name : name + ext;
  // 文件路径为设置的模板目录 + 文件名
  let filepath = path.join(this.get('views'), name);
  // 获取到模板引擎的渲染方法
  let render = this.engines[ext];
  render(filepath, options, callback);
};

Application.prototype.param = function() {
  this.lazyrouter();
  this._router.param.apply(this._router, arguments);
  return this;
};

// 添加中间件，中间件和普通路由都是放在一个数组中的，放在 this._router.stack
Application.prototype.use = function() {
  this.lazyrouter();
  this._router.use.apply(this._router, arguments);
  return this;
};

Application.prototype.listen = function() {
  let self = this;
  let server = http.createServer(function(req, res) {
    function done(err) {
      if (err) {
        res.writeHead(500);
        console.log(err);
        res.end(err.toString());
      }
      //如果没有任何路由规则匹配的话会走 done
      res.end(`Cannot ${req.method} ${req.url}`);
    }
    // 设置 res.app 为当前 app 实例
    res.app = self;
    //如果路由系统无法处理，也就是没有一条路由规则跟请求匹配，是会把请求交给done
    self._router.handle(req, res, done);
  });
  server.listen.apply(server, slice.call(arguments));
};

module.exports = Application;
