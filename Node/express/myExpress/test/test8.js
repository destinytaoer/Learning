// 实现模板引擎
const express = require('../lib/express');
const path = require('path');
const html = require('../lib/html');
const app = express();
const fs = require('fs');

// views 设置模板存放目录
app.set('views', path.resolve('views'));
// 设置模板引擎，如果 res.render 方法没有指定模板后缀名，会以这个作为后缀名
app.set('view engine', 'html');

// 设置模板引擎遇到 .html 结尾的模板使用 html 来进行渲染
app.engine('.html', html);

// let ejs = require('ejs');
// ejs.__express 就是 html 文件中 render 方法 render(filepath, data, callback)
// app.engine('.html', ejs.__express);

app.get('/', function(req, res, next) {
  // render(filepath, data)
  res.render('index', { total: 5, user: { name: 'xxx' } });
});
app.listen(8080);
