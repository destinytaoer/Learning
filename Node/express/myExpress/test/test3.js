const express = require('../lib/express');
const app = express();
// 错误处理路由
app
  .get(
    '/',
    function(req, res, next) {
      console.log(1);
      next('wrong');
    },
    function(req, res, next) {
      console.log(11);
      next();
    }
  )
  .get('/', function(req, res, next) {
    console.log(2);
    next();
  })
  .get('/', function(req, res, next) {
    console.log(3);
    res.end('ok');
  });
app.listen(8080);
