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
          if (route.paramsNames) {
            let matcheres = pathname.match(route.reg_path);
            // [匹配值，'捕获值', '捕获值',...]
            if (matcheres) {
              let params = {};
              for (let i = 0; i < route.paramsNames.length; i++) {
                let key = route.paramsNames[i];
                let value = matcheres[i + 1];
                params[key] = value;
              }
              req.params = params;
              route.handler(req, res);
            } else {
              next();
            }
          } else {
            if (
              (route.method === method.toLowerCase() ||
                route.method === 'all') &&
              (route.path === pathname || route.path === '*')
            ) {
              route.handler(req, res);
            }
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
      const layer = {
        method,
        path,
        handler
      };
      if (path.includes(':')) {
        let paramsNames = [];
        // 1.把原本路径转换为正则表达式
        // 2.提取变量名
        path = path.replace(/:([^\/]+)/g, function() {
          // 第一个是匹配 :name, 第二个是捕获 name
          paramsNames.push(arguments[1]);
          return '([^/]+)';
        });
        layer.reg_path = new RegExp(path);
        layer.paramsNames = paramsNames;
      }
      // 添加路由对象
      app.routes.push(layer);
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

  // 内置中间件，为 req 和 res 添加方法和属性
  app.use(function(req, res, next) {
    let urlObj = url.parse(req.url, true);
    req.query = urlObj.query;
    req.path = urlObj.pathname;
    req.hostname = req.headers['host'].split(':')[0];
    next();
  });
  return app;
}
module.exports = createApplication;
