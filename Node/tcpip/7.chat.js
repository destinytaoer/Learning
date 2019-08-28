/**
 * 功能较为完善的聊天室，作出以下约定：
 * 广播 b:msg 向所有其他客户端发送消息
 * 私聊 c:username:msg 向指定客户端发送消息，实际上不应该使用 username，而是会有唯一标识
 * 列出在线用户列表 l 列出所有的在线用户信息列表
 * 修改昵称 n:newName 修改自己的名称
 */

let net = require('net');
let clients = {};
let server = net.createServer(function(socket) {
  let key = socket.remoteAddress + socket.remotePort; // ip 地址 + 端口号
  // 给定默认用户名
  clients[key] = {
    nickname: '匿名',
    socket
  };
  socket.setEncoding('utf8');
  socket.on('data', function(data) {
    data = data.replace(/\r\n/, '');
    let type = data.slice(0, 1);
    let msg;
    switch (type) {
      case 'b':
        msg = data.slice(2);
        broadcast(msg);
        break;
      case 'c': // c:username:内容，这里还需要再考虑，因为内容可能有 :
        let msgs = data.split(':');
        let username = msgs[1];
        msg = msgs[2];
        sendTo(username, msg);
        break;
      case 'l':
        list();
        break;
      case 'n':
        let newName = data.slice(2);
        clients[key].nickname = newName;
        socket.write(`你的用户名已经修改为 ${newName}\r\n`);
        break;
      default:
        socket.write('此命令不能识别，请重新输入！\r\n');
    }
  });
  socket.on('end', function(data) {
    broadcast(`${clients[key].nickname} 离开聊天室`);
    clients[key].socket.destroy(); // 销毁此 socket
    delete clients[key]; // 从缓存中删掉
  });
  function list() {
    let result = '';
    for (let user in clients) {
      result += clients[user].nickname + '\r\n';
    }
    socket.write(result);
  }
  function sendTo(toUser, text) {
    let toUserObj;
    for (let user in clients) {
      if (clients[user].nickname === toUser) {
        toUserObj = clients[user];
        break;
      }
    }
    if (toUserObj) {
      toUserObj.socket.write(`${toUserObj.nickname}:${text}\r\n`);
    } else {
      socket.write('此用户名不存在或者对方已经下线\r\n');
    }
  }
  function broadcast(msg) {
    for (let item in clients) {
      if (clients.hasOwnProperty(item) && item !== key) {
        let user = clients[item];
        let username = clients[key].nickname; // 这个用户名必须是当前的 username
        user.socket.write(`${username}: ${msg}\r\n`);
      }
    }
  }
});

server.listen(8080);
