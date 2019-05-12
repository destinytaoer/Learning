let http = require("http");

// 路由：根据不同的路径返回不同的内容
http.createServer(function (req, res) {
  // 1. /sigin
  // 2. /signup
  // 3. /xxx 404
  let { pathname, query } = url.parse(req.url, true);

  if (pathname === '/signin') {
    res.setHeader('Content-type', 'text/plain;charset=utf-8');
    return res.end('登录');
  }
  if (pathname === '/signup') {
    res.setHeader('Content-type', 'text/plain;charset=utf-8');
    return res.end('注册');
  }
  res.end('404');
}).listen(8080)