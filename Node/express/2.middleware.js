const express = require('./express');
const app = express();

// 使用 use 定义一个中间件，next 是一个函数，调用它意味着当前中间件执行完毕，可以继续往下执行别的中间件或路由匹配了
// 省略路径时，就是 / 匹配所有路径
app.use(function(req, res, next) {
  console.log('没有路径的中间件');
  next('err');
});

app.use('/water', function(req, res, next) {
  console.log('过滤 water');
  next();
});

// 错误处理中间件
app.use(function(err, req, res, next) {
  // res.end(err);
  console.log(err);
  next();
});

app.get('/water', function(req, res) {
  res.end('water');
});

app.listen(8080, function() {
  console.log('server started at 8080');
});
