const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
// 传入密钥
app.use(cookieParser('aa'));
app.get('/write', function(req, res) {
  // 设置 signed 为 true
  res.cookie('name', 'aaa', { signed: true });
  // 基于真实值和密钥生成一个签名。一旦值被修改掉，则签名验证会失败
  res.end('write ok');
});
app.get('/read', function(req, res) {
  res.send(req.cookies);
});
app.listen(8080);
