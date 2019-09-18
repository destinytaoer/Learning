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
proto.get = function(path, handler) {
  let route = this.route(path);
  route.get(handler);
};
proto.handle = function(req, res, out) {};
module.exports = Router;
