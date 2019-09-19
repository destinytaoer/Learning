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
const init = require('../middle/init');

function Router() {
  // 将 Router 从构造函数变成普通函数
  // 执行 Router 生成 router 实例
  function router(req, res, next) {
    router.handle(req, res, next); // 匹配第一级成功之后，调用 handle 进行下一级路由的匹配
  }
  Object.setPrototypeOf(router, proto);
  router.stack = [];

  //声明一个对象，用来缓存 路径参数名 对应的 回调函数 数组
  router.paramCallbacks = {};

  // 路由加载后才添加的中间件
  router.use(init);

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

proto.use = function(path, handler) {
  if (typeof path === 'function') {
    handler = path;
    path = '/';
  }
  let layer = new Layer(path, handler);
  layer.route = undefined; // 中间件，没有 route
  this.stack.push(layer);
  return this;
};

proto.param = function(name, handler) {
  if (!this.paramCallbacks[name]) {
    this.paramCallbacks[name] = [];
  }
  // {uid: [handle1,hander2]}
  this.paramCallbacks[name].push(handler);
};

// 用来处理路径参数，处理完成后会走 out 函数
proto.process_params = function(layer, req, res, out) {
  let keys = layer.keys;
  let self = this;
  //用来处理路径参数
  let paramIndex = 0, // 索引
    key, // 单个 param 对象
    name, // 参数名
    val, // 参数值
    callbacks,
    callback;

  // 调用一次 param 意味着处理一个路径参数
  function param() {
    if (paramIndex >= keys.length) {
      return out();
    }
    key = keys[paramIndex++]; //先取出当前的 key
    name = key.name; // uid
    val = layer.params[name];
    callbacks = self.paramCallbacks[name]; // 取出等待执行的回调函数数组
    if (!val || !callbacks) {
      //如果当前的 key 没有值或者没有对应的回调就直接处理下一个参数
      return param();
    }
    execCallback(); // 开始执行回调
  }
  let callbackIndex = 0;
  function execCallback() {
    callback = callbacks[callbackIndex++];
    if (!callback) {
      return param(); // 所有回调执行完毕，处理下一个参数
    }
    // 回调中执行 execCallback 即 next 才能继续执行下一个回调
    callback(req, res, execCallback, val, name);
  }
  param();
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

/**
 * 1. 处理路由匹配逻辑
 * 2. 处理中间件逻辑
 * 3. 处理子路由匹配逻辑
 */
proto.handle = function(req, res, out) {
  let idx = 0;
  let self = this;
  let slashAdded = false; // 是否添加过 /
  let removed = ''; // 被移除的字符串
  let { pathname } = url.parse(req.url, true);
  ~(function next(err) {
    if (slashAdded) {
      req.url = '';
      slashAdded = false;
    }
    if (removed.length > 0) {
      // 在匹配下一层时，要把移除的添加回去
      req.url = removed + req.url;
      removed = '';
    }
    if (idx >= self.stack.length) {
      return out(err); //都已经匹配完，调用 out，即 application 的 done 函数
    }
    // next 方法，进入下一层
    let layer = self.stack[idx++];
    if (layer.match(pathname)) {
      if (!layer.route) {
        // 中间件层
        // 需要将路径从 /user/2 变成 /2，以匹配子路由
        if (layer.path !== '/') {
          // 路径不是 / 时，才进行处理
          removed = layer.path;
          req.url = req.url.slice(removed.length);
          // 防止 req.url = ''
          if (!req.url) {
            req.url = '/';
            slashAdded = true;
          }
        }
        if (err) {
          layer.handle_error(err, req, res, next);
        } else {
          if (layer.handler.length !== 4) {
            layer.handle_request(req, res, next);
          } else {
            next();
          }
        }
      } else {
        // 路由
        if (layer.route.handle_method(req.method)) {
          // 路由中具有这个方法的处理函数
          if (err) {
            layer.handle_error(err, req, res, next);
          } else {
            //把 layer 的 parmas 属性拷贝给 req.params 上
            req.params = layer.params;
            // 进行参数处理
            self.process_params(layer, req, res, () => {
              // 这个函数就是 out，处理完参数之后，就执行路由回调
              layer.handle_request(req, res, next);
            });
          }
        } else {
          next(err); // 匹配下一层
        }
      }
    } else {
      next(err);
    }
  })();
};

module.exports = Router;
