const http = require('http');
const url = require('url');
function createApplication() {
  // app 其实就是真正的请求监听函数
  let app = function(req, res) {
    // 这里还会进行 req/res 的增强
    // 遍历路由规则进行匹配，成功就执行回调
    let method = req.method;
    let { pathname } = url.parse(req.url, true);
    let index = 0;
    ~(function next(err) {
      if (index >= app.routes.length) {
        return res.end(`Cannot ${method} ${pathname}`);
      }
      let route = app.routes[index++];
      if (err) {
        // 个人感觉可以直接将 method 设置为 errMiddle，需要在 use 方法中进行处理
        // 先判断是否是中间件
        if (route.method === 'middle') {
          // 再判断路径是否匹配
          if (
            route.path === '/' ||
            pathname.startsWith(route.path + '/') ||
            pathname === route.name
          ) {
            // 再看参数数量是否是 4 个
            if (route.handler.length === 4) {
              route.handler(err, req, res, next);
            } else {
              next(err);
            }
          } else {
            next(err);
          }
        } else {
          next(err);
        }
      } else {
        if (route.method === 'middle') {
          // 只要请求路径是以中间件路径开头即可，加 / 为了使 /user 不能匹配 /users
          if (
            route.path === '/' ||
            pathname.startsWith(route.path + '/') ||
            pathname === route.name
          ) {
            route.handler(req, res, next);
          } else {
            next();
          }
        } else {
          // 路由
          if (
            (route.method === method.toLowerCase() || route.method === 'all') &&
            (route.path === pathname || route.path === '*')
          ) {
            return route.handler(req, res);
          }
        }
      }
    })();
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
  // all 方法
  app.all = function(path, handler) {
    app.routes.push({
      method: 'all',
      path,
      handler
    });
  };

  app.use = function(path, handler) {
    if (typeof path === 'function') {
      handler = path;
      path = '/';
    }
    app.routes.push({
      method: 'middle',
      path,
      handler
    });
  };

  return app;
}
module.exports = createApplication;
