// 广播就是当客户端向服务器发消息时，服务器向所有主机发送消息
let dgram = require('dgram');
let socket = dgram.createSocket('udp4'); // udp4 或 udp6
// 在 udp 中 socket 是平等的，客户端之间直接交互，不需要服务器端。

// 在本机的 41234 端口监听消息
socket.bind(41234, 'localhost');
// 监听对方发送过来的消息
socket.on('message', function(msg, rinfo) {
  // 设置为 true 表示要广播了
  socket.setBroadcast(true);
  console.log(msg.toString());
  // 向 255 发消息表示广播，ip 前面的是从 address 中获取
  socket.send(Buffer.from(msg), rinfo.port, '192.168.0.255');
});
