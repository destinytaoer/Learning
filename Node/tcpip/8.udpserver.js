let dgram = require('dgram');
let socket = dgram.createSocket('udp4'); // udp4 或 udp6
// 在 udp 中 socket 是平等的，客户端之间直接交互，不需要服务器端。

// 在本机的 41234 端口监听消息
socket.bind(41234, 'localhost');
// 监听对方发送过来的消息
socket.on('message', function(msg, rinfo) {
  console.log(msg.toString());
  socket.send(Buffer.from(msg), rinfo.port, rinfo.address);
});
