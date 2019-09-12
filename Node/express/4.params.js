const express = require('./express');
const app = express();

// :意味着是一个占位符，用来匹配任意字符串
// restful api GET /user/1 获取 ID 为 1 的用户详情，不可能每一个用户添加一个路由，而是交给一个路由处理
// /user/aa/9 称为路径参数
app.get('/user/:name/:age', function(req, res) {
  console.log(req.params); // {name: 'aa', age: '9'}
  res.end('ok');
});
app.listen(8080);
