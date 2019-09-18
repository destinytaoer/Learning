function Layer(path, handler) {
  this.path = path;
  this.handler = handler;
}
// 判断这一层和传入的路径是否匹配
Layer.prototype.match = function(path) {
  return this.path === path;
};
// 执行普通的路由回调
Layer.prototype.handle_request = function(req, res, next) {
  this.handler(req, res, next);
};
// 执行错误处理路由的回调
Layer.prototype.handle_error = function(err, req, res, next) {
  if (this.handler.length != 4) {
    return next(err);
  }
  this.handler(err, req, res, next);
};
module.exports = Layer;
