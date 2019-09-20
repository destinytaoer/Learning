const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // 处理 JSON
app.use(bodyParser.urlencoded({ extended: true })); // 处理表单

// echo 回声，客户端发送过来什么，服务器端就返回什么
app.post('/user', function(req, res) {
  let body = req.body;
  console.log(body);
  res.send(body);
});
app.listen(8080);
