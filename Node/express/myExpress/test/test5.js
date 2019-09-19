// 错误处理中间件
const express = require('../lib/express');
const app = express();
app.use(function(req, res, next) {
  console.log('middleware');
  next();
});
app.get('/', function(req, res, next) {
  console.log('1');
  next('wrong');
});
app.use(function(err, req, res, next) {
  res.end('catch ' + err);
});
app.listen(8080);
