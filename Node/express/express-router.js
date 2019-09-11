let express = require('express');
let app = express();

app.listen(3000);

// app 监听函数上拓展了很多方法，包括 get、post 等等
// 两个参数：path，callback
// 从上到下匹配，匹配到了并且结束了响应，就不会继续往下走 
// path 指的是路径，没有问号后面的内容
// express 的重点是拓展了 res 和 req 的属性
app.get('/signin', function (req, res) {
  res.setHeader('Content-type', 'text/plain;charset=utf-8');
  res.end('登录');
});
app.get('/signup', function (req, res) {
  res.setHeader('Content-type', 'text/plain;charset=utf-8');
  res.end('注册');
});
// 最后匹配不到的所有路径都返回 404
// all 表示所有的请求方法，* 表示所有的路径
app.all('*', function (req, res) {
  res.end('404');
})