// 实现 Router 和 app 的分离
const Router = require('./router');
const http = require('http');
const methods = require('methods'); // 返回所有方法字符串的数组
// http.METHODS 都是大写，而 methods 中都是小写
// 用于将类数组转换为数组
const slice = Array.prototype.slice;
function Application() {}
// 延迟初始化 Router，只有当需要的时候再进行 Router 的初始化，节省性能
Application.prototype.lazyrouter = function() {
  if (!this._router) {
    this._router = new Router();
  }
};
methods.forEach(function(method) {
  Application.prototype[method] = function() {
    // 使用到时，才进行初始化
    this.lazyrouter();
    this._router.get.apply(this._router, slice.call(arguments));
    return this;
  };
});

Application.prototype.listen = function() {
  let self = this;
  let server = http.createServer(function(req, res) {
    function done() {
      //如果没有任何路由规则匹配的话会走 done
      res.end(`Cannot ${req.method} ${req.url}`);
    }
    //如果路由系统无法处理，也就是没有一条路由规则跟请求匹配，是会把请求交给done
    self._router.handle(req, res, done);
  });
  server.listen.apply(server, slice.call(arguments));
};

module.exports = Application;
