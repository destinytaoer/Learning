let http = require('http');
process.on('message', function(msg, server) {
  console.log(msg);
  if (msg === 'server') {
    http
      .createServer(function(req, res) {
        res.setHeader('Content-Type', 'text/html;charset=utf8');
        res.end('请求被子进程处理');
      })
      .listen(server); // 可以传入一个 server
  }
});
