/**
 * Router
 *   stack
 *      layer Router 的栈中都是由 layer 组成的
 *        path 每一层都包含一个匹配路径
 *        handler 执行 route 的 dispatch
 *        route 每一层也具有一个自己的路由匹配
 *          layer 每个 route 中又有一个栈，也是由 layer 组成
 *            path 每一层包含一个匹配路径，都是 /，即是以外层的 layer 的 path 为准
 *            handler 真正的路由回调
 *            method 请求方法名
 *
 */
const Route = require('./route');
const Layer = require('./layer');
const url = require('url');
const slice = Array.prototype.slice;
const methods = require('methods');

function Router() {
  function router(req, res, next) {
    router.handle(req, res, next);
  }
  Object.setPrototypeOf(router, proto);
  router.stack = [];

  return router;
}
// 配合 Object.setPrototypeOf 进行一定的简写
let proto = Object.create(null);

// 创建一个 Route 实例，向当前路由系统中添加一层
proto.route = function(path) {
  let route = new Route(path);
  let layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route;
  this.stack.push(layer);
  return route;
};

methods.forEach(function(method) {
  proto[method] = function() {
    let args = slice.apply(arguments);
    let path = args.shift();
    let handlers = args;
    let route = this.route(path);
    route[method](handlers);
    return this;
  };
});

proto.handle = function(req, res, out) {
  let idx = 0;
  let self = this;
  let { pathname } = url.parse(req.url, true);
  ~(function next() {
    if (idx >= self.stack.length) {
      return out(); //都已经匹配完，调用 out，即 application 的 done 函数
    }
    // next 方法，进入下一层
    let layer = self.stack[idx++];
    if (
      layer.match(pathname) && // 路径匹配
      layer.route && // 具有处理路由
      layer.route.handle_method(req.method) // 路由中具有这个方法的处理函数
    ) {
      layer.handle_request(req, res, next);
    } else {
      next(); // 匹配下一层
    }
  })();
};
module.exports = Router;
