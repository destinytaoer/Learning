let http = require('http');
let server = http.createServer(function(req, res) {
  if (req.url == '/write') {
    // 首次请求服务器，向客户端写入 cookie
    res.setHeader('Set-Cookie', 'name=aaa');
    res.end('write ok');
  } else if (req.url == '/read') {
    // 客户端在后面的请求中，都会自行携带 cookie
    let cookie = req.headers['cookie'];
    res.end(cookie);
  } else {
    res.end('Not Found');
  }
});
server.listen(8080);
