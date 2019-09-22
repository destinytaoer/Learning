const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid'); // 生成一个永远不会重复的字符串
const app = express();

app.use(cookieParser());

// 实现一套 session 原理
const SESSION_KEY = 'connect.sid';
const sessions = {}; // 记录 sessionId 和 其数据 的对应关系
function makeSessionId(req, res) {
  // 要求：
  // 1. 不能重复
  // 2. 不容易猜
  let sessionId = uuid.v4();
  // 记录一些数据
  sessions[sessionId] = {
    balance: 100
  };
  // 把 id 发送给客户端
  res.cookie(SESSION_KEY, sessionId);
  res.send('欢迎新客户');
}
app.get('/', function(req, res) {
  let sessionId = req.cookies[SESSION_KEY];
  if (sessionId) {
    let session = sessions[sessionId];
    if (session) {
      session.balance -= 10;
      res.send(`还剩下${session.balance}元`);
    }
  } else {
    makeSessionId(req, res);
  }
});
app.listen(8080);
