/* 创建 TCP 客户端 */
let net = require('net');
// 手动创建一个 socket
let socket = new net.Socket();
socket.setEncoding('utf8');
socket.connect(8080, 'localhost', function() {
  socket.write('hello'); // 向服务器端写数据
});
// 接收服务器端返回的数据
socket.on('data', function(data) {
  console.log(data);
});
