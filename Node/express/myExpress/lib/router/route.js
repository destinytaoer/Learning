const Layer = require('./layer');
function Route(path) {
  this.path = path;
  this.stack = [];
  // 用以判断路由中是否有此方法的处理函数
  this.methods = {};
}

Route.prototype.handle_method = function(method) {
  method = method.toLowerCase();
  return this.methods[method];
};

Route.prototype.get = function(handlers) {
  this.methods.get = true;
  for (let i = 0; i < handlers.length; i++) {
    let layer = new Layer('/', handlers[i]); // 路径为 / 表示都匹配，以外层的 layer 为准，实际上 path 没有被使用
    layer.method = 'get';
    this.stack.push(layer);
  }
  return this;
};

Route.prototype.dispatch = function(req, res, out) {
  let idx = 0;
  let self = this;

  ~(function next() {
    if (idx >= self.stack.length) {
      return out(); // Route 内的 layer 层都已经匹配完，调用 out，即 外层 layer 的 next 函数，往下一层匹配
    }
    // next 方法，进入 Route 内的下一层
    let layer = self.stack[idx++];

    // 方法匹配即可执行回调函数
    // 外层已经匹配了路径
    if ((layer.method = req.method.toLowerCase())) {
      layer.handle_request(req, res, next);
    } else {
      next();
    }
  })();
};
module.exports = Route;
