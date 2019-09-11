const http = require('http');
const url = require('url');
function createApplication() {
  // app 其实就是真正的请求监听函数
  let app = function(req, res) {
    let method = req.method;
    let { pathname } = url.parse(req.url, true);
    for (let i = 0; i < app.routes.length; i++) {
      let route = app.routes[i];
      if (route.method === method.toLowerCase() && route.path === pathname) {
        return route.handler(req, res);
      }
    }
    res.end(`Cannot ${method} ${pathname}`);
  };
  app.listen = function() {
    let server = http.createServer(app);
    server.listen.apply(server, arguments);
  };
  // 用来保存路由规则
  app.routes = [];
  http.METHODS.forEach(function(method) {
    method = method.toLowerCase();
    app[method] = function(path, handler) {
      // 添加路由对象
      app.routes.push({
        method,
        path,
        handler
      });
    };
  });

  return app;
}
module.exports = createApplication;
