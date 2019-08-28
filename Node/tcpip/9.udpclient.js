let dgram = require('dgram');
let socket = dgram.createSocket('udp4');

// 发消息
let buf = Buffer.from('hello');
socket.send(buf, 0, 5, 41234, 'localhost', function(err, bytesLength) {
  console.log(arguments);
});
socket.on('message', function(msg, rinfo) {
  console.log(msg.toString());
});
