let express = require('express');
let app = express();
app.listen(3000);

// /user?id=1 查一个 /user 查所有 路径都是 /user

// 路径参数
// user/1 查一个 /user 查所有，使用路径区分多个还是一个

app.get('/user', function (req, res) {
  res.send('select all');
});

// :id 表示占位符，必须有但是可以随意写
app.get('/user/:id', function (req, res) {
  console.log(req.params); // 获取路径参数
  res.send('slect one');
});

// 匹配 /user/:id/:name/a
let url = '/user/2/destiny/a';
let url2 = '/user/:id:/:name/a';
let keyArr = [];
// 使用正则替换 :id :name 等
let newReg = url2.replace(/:[^\/]+/g, function () {
  keyArr.push(arguments[0]);
  return '([^\/]+)';
});
// 匹配 url 获取对应的值
let reg = new RegExp(newReg);
let valArr = reg.exec(url);
let result = {};
keyArr.forEach(function (item, index) {
  result[item] = valArr[index + 1];
});
console.log(result);

// 拦截功能，对属性进行预处理，这里的 req 和 res 与下面的所有请求的 req 和 res 是同一个
app.param('id', function (req, res, next) {
  // 对 id 进行预处理
  req.params.id = `id: ${req.params.id}`;
  // 调用了 next 就可以往下匹配
  next();
  // 如果在这里结束了请求那就不会走了
});
app.param('name', function (req, res, next) {
  // 对 name 进行预处理
  req.params.name = `name: ${req.params.name}`;
  // 调用了 next 就可以往下匹配
  next();
  // 如果在这里结束了请求那就不会走了
});
app.get('/user/:id/:name', function (req, res) {
  res.send(`${req.params.id}${req.params.name}`)
});