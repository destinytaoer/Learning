const express = require('express');
const session = require('express-session');

const app = express();

app.use(
  session({
    name: '', // 保存在 cookie 中的属性名
    resave: true, // 每次请求都重新设置 session，并重设有效时间
    saveUninitialized: true, // 每次请求都重新设置 session
    rolling: true,
    // genid: function () {// 生成 id 的函数
    //   return uuid.v4()
    // },
    secret: 'aa' // 密钥
    // store: 自定义 session 保存的位置
  })
);

app.get('/visit', function(req, res) {
  let visit = req.session.visit;
  if (visit) {
    visit = visit + 1;
  } else {
    visit = 1;
  }
  req.session.visit = visit;
  res.send(`欢迎你的第${visit}次光临`);
});

app.listen(8080);
