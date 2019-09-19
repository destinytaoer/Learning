// 中间件实现多级路由
const express = require('../lib/express');
const app = express();

app.use(function(req, res, next) {
  console.log('middleware1');
  next();
});
app.get('/', function(req, res, next) {
  res.end('1');
});

const user = express.Router();
user.use(function(req, res, next) {
  console.log('middleware2');
  next();
});
user.use('/2', function(req, res, next) {
  res.end('2');
});
app.use('/user', user);
app.use(function(err, req, res, next) {
  res.end('catch ' + err);
});
app.listen(8080);
