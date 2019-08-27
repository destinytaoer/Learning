/* 将所有客户端的输入都写入一个文件中 */
let net = require('net');
let fs = require('fs');
let path = require('path');
let ws = fs.createWriteStream(path.join(__dirname, 'msg.txt'));
let server = net.createServer({}, function(socket) {
  // socket.pipe(ws); // 这样会把所有客户端的输入，按顺序写入，不区分哪个客户端。
  // 希望分开写入，先暂停可读流
  socket.pause();
  // 等待 10s 再把内容读取并一起写入到可写流中
  setTimeout(() => {
    // 默认情况下，当可读流读到末尾的时候，会关闭可写流
    // 两个客户端，就会报错，write after end
    socket.pipe(
      ws,
      { end: false }
    ); // end false 表示写完之后不关闭可写流
  }, 10 * 1000);

  // 上面的用法会有一个问题，就是时间不好把握，不知道客户端究竟会输入多长时间，所以不合理
  // 我们可以使用超时时间来更好的实现
  // 设置客户端超时时间，如果客户端超过一定的时间不输入就被认为超时了，实际上就是防抖原理
  socket.setTimeout(3 * 1000);
  // 在超时之后，再将内容写入
  socket.on('timeout', function() {
    console.log('timeout');
    socket.pipe(
      ws,
      { end: false }
    );
  });
});

server.listen(8080);
