let express = require('express');
let app = express();
app.listen(3000);

// 直接返回对象 res.json()
// 返回 HTML 页面 res.sendFile()
// res.statusCode res.end => res.sendStatus()
// res.setHeader res.end => res.send()

app.get('/json', function (req, res) {
  res.json({ name: 'destiny', age: 9 });
  res.send({ name: 'destiny', age: 9 });
});

app.get('/', function (req, res) {
  // 两种写法，绝对路径或者加 root
  // res.sendFile(__dirname + '/index.html');
  res.sendFile('./index.html', { root: __dirname });
  // 想用上一级的，不能直接通过 ../ 查找，可以使用 path 模块进行拼接
  res.sendFile(require('path').join(__dirname, '..', 'index.html'));
});

app.get('/status', function (req, res) {
  res.sendStatus(500);
});
// send 原理
app.use(function (req, res, next) {
  res.mySend = function (data) {
    if (typeof data === 'object') {
      res.setHeader('Content-type', 'application/json;charset=utf-8');
      return res.end(JSON.stringify(data));
    }
    if (typeof data === 'string') {
      res.setHeader('Content-type', 'text/plain;charset=utf-8');
      return res.end(data);
    }
    if (typeof data === 'number') {
      res.statusCode = data;
      return res.end(require('_http_server').STATUS_CODE[data]);
    }
  }
  next();
})

app.get('/send', function (req, res) {
  // res.send({ name: 'destiny', age: 9 });
  res.send(200); // 其内部会进行校验，自动根据传值返回
});