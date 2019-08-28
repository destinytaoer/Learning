/* 聊天室，可以设置昵称 可以广播 */
let net = require('net');
let clients = {};
let server = net.createServer(function(socket) {
  socket.setEncoding('utf8'); // 设置编码
  server.getConnections(function(err, count) {
    socket.write(
      '欢迎光临聊天室，现在在线人数是' + count + '位，请输入您的昵称\r\n'
    );
  });
  let username;

  socket.on('data', function(data) {
    data = data.replace(/\r\n/, '');
    if (!username) {
      username = data;
      clients[username] = socket; // 缓存用户的 socket，方便以后广播使用
      broadcast(username, `欢迎 ${username} 加入聊天室 \r\n`);
    } else {
      broadcast(username, `${username}: ${data}`);
    }
  });
  socket.on('end', function(hasError) {
    if (username) {
      broadcast(username, `${username} 离开聊天室`);
      clients[username].destroy(); // 销毁此 socket
      delete clients[username]; // 从缓存中删掉
    }
  });
});

function broadcast(username, msg) {
  for (let name in clients) {
    if (name !== username) {
      let socket = clients[name];
      socket.write(msg + '\r\n'); // 写入并换行
    }
  }
}

server.on('error', function(err) {
  console.log(err);
});

server.listen(8080, function() {
  console.log('TCP 聊天室已经启动，信息是', server.address());
});
