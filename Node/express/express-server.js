let express = require('express');
// express 是一个函数，返回的是一个 http 的监听函数，就是 http.createServer 中的函数
let app = express();

// 监听端口
app.listen(8080, function () {
  
});
// 相当于 require('http').createServer(app).listen(8080)

// app.listen 的封装
app.listen = function (...args) {
  require('http').createServer(app).listen(...args);
}

