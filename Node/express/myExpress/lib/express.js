const http = require('http');
const url = require('url');
// 路由规则容器
let router = [
  {
    path: '*', // 匹配所有路径
    method: '*', // 匹配所有的方法
    handler(req, res) {
      // 默认处理函数
      res.end(`Cannot ${req.method} ${req.url}`);
    }
  }
];
function createApplication() {
  return {
    get(path, handler) {
      router.push({
        path,
        method: 'get',
        handler
      });
    },
    listen() {
      let server = http.createServer(function(req, res) {
        let { pathname } = url.parse(req.url, true);
        for (let i = 0; i < router.length; i++) {
          let { path, method, handler } = router[i];
          if (pathname === path && method === req.method.toLowerCase()) {
            return handler(req, res);
          }
        }
      });
      server.listen.apply(server, arguments);
    }
  };
}
module.exports = createApplication;
