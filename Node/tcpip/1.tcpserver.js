let net = require('net');
// 创建一个服务器，监听客户端的连接，当客户端连接之后执行回调函数
// socket 是一个双工流 duplex，可读可写
let server = net.createServer({}, function(socket) {
  // 设置客户端连接的总数量
  server.maxConnections = 2;
  // 获取当前有多少客户端正在连接服务器
  server.getConnections((err, count) => {
    console.log(
      `当前正在连接客户有：${count}，可连接的总数量是 ${server.maxConnections}`
    );
  });
  console.log('客户端已连接');
  console.log(socket.address());
  socket.setEncoding('utf8');

  // 监听客户端发送的消息
  socket.on('data', function(data) {
    console.log('接收到客户端发过来的数据：', data);
    // 返回给客户端的信息
    socket.write('服务器确认：' + data);
  });
  // 服务器收到客户端发出的关闭请求时，会触发 end 事件
  // 在这里客户端并没有真正关闭，只是开始关闭，当真正关闭的时候会触发一个 close 事件
  socket.on('end', function() {
    console.log('客户端开始关闭');
  });

  socket.on('close', function(hasError) {
    console.log('客户端真正关闭', hasError);
  });
});
server.listen(8080, function() {
  console.log(server.address());
  console.log('服务器已启动');
});

// 服务器有一个 close 方法，执行这个方法之后，不再接收新的连接请求，但也不会直接关闭服务器，而是等到正在连接的其他客户端断开连接之后，再关闭
// setTimeout(() => {
//   server.unref();
// }, 5000);

// 监听服务器关闭事件，只有 手动调用了 close 方法，才会触发 close 事件
server.on('close', function() {
  console.log('服务器关闭');
});
server.on('error', function(err) {
  console.log(err);
});
