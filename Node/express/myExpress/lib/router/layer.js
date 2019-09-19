const pathToRegexp = require('path-to-regexp');
function Layer(path, handler) {
  this.path = path;
  this.handler = handler;
  this.keys = [];
  // this.path =/user/:uid   this.keys = [{name:'uid'}];
  this.regexp = pathToRegexp(this.path, this.keys);
}
// 判断这一层和传入的路径是否匹配
Layer.prototype.match = function(path) {
  // 路由是精确匹配
  if (this.path === path) return true;
  if (!this.route) {
    // 如果是中间件，则匹配开头即可
    return this.path === '/' || path.startsWith(this.path + '/');
  }
  // 对路径参数进行处理
  if (this.route) {
    let matches = this.regexp.exec(path); //   /user/1
    // ['',1,'zfpx']
    if (matches) {
      // 如果匹配了，那么就处理到 params 属性上
      this.params = {};
      for (let i = 1; i < matches.length; i++) {
        let name = this.keys[i - 1].name;
        let val = matches[i];
        this.params[name] = val;
      }
      return true;
    }
  }
  return false;
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
