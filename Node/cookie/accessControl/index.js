const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// 检查是否登录中间件，如果登录了则继续，没有则跳到登录页
function checkLogin(req, res, next) {
  if (req.cookies && req.cookies.username) {
    next();
  } else {
    res.redirect('/login');
  }
}

// 解析请求头
app.use(bodyParser.urlencoded({ extended: true }));

// 设置模板引擎
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);

// 解析 cookie
app.use(cookieParser());

app.get('/login', function(req, res) {
  res.render('login', { title: '登录' });
});
app.post('/login', function(req, res) {
  let user = req.body;
  if (user.username == '1' && user.password == '1') {
    res.cookie('username', user.username);
    res.redirect('/user');
  } else {
    // 回到原来的页面
    res.redirect('back');
  }
});

// 需要检查登录的，就把检查函数放到其前面
app.get('/user', checkLogin, function(req, res) {
  // 通过 cookie 获取到 username
  let { username } = req.cookies;
  res.render('user', { title: '用户', username });
});

app.listen(8080);
