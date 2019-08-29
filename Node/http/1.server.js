// http 服务器是继承自 tcp 服务器的，http 协议是应用层协议，是继承自 tcp 的
// TCP -> HTTP 对请求和响应进行了一定的包装
let http = require('http');
// req 可读流
// res 可写流
// let server = http.createServer(function (req, res) { });
// 可以拆分为
let server = http.createServer();
// 服务器监听到客户端的请求时，执行回调
server.on('request', function(req, res) {});

// 当客户端连接上服务器时，执行回调
server.on('connection', function(socket) {
  console.log('客户端连接：', socket.address());
});

// 服务器关闭
server.on('close', function(req, res) {});
// 服务器出错
server.on('error', function(err) {});

server.listen(8080, function() {
  console.log('server started at http://localhost:8080');
});
