const express = require('express');
const app = express();

// next 表示执行下一个
/* 一个路径中有多个回调函数，路径的分组 */
app
  .get(
    '/',
    function(req, res, next) {
      console.log(1);
      next();
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
    res.end('hello');
  });
app.listen(8080);
