let express = require('express');
let app = express();

app.listen(3000);

// 区分是查询一个还是查询所有
app.get('/user', function (req, res) {
  console.log(req.query); // 获取问号传参
  console.log(req.url); // 获取整个路径包括问号等
  console.log(req.path); // 获取路径，不包括问号参数
  console.log(req.headers) // 获取请求头，所有都是小写的
  console.log(req.method) // 获取请求方法，所有都是大写的
  res.send("用户");
})