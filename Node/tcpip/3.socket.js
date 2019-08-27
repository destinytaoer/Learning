/* 当客户端访问服务器时，服务器给客户端发送一个文件 */
let net = require('net');
let fs = require('fs');
let path = require('path');
let rs = fs.createReadStream(path.join(__dirname, '1.test'));
let server = net.createServer(function(socket) {
  rs.on('data', function(data) {
    let flag = socket.write(data); // 可写流缓存区是否满了
    console.log('flag：', flag);
    console.log('缓存的字节数：', socket.bufferSize);
  });
  socket.on('drain', function() {
    console.log('缓存区的数据已经发送完成');
  });
});
server.listen(8080);
