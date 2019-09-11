// 中间件，当我们访问到最终目标之前执行的内容，就是进行预处理
let express = require('express');
let app = express();
app.listen(3000);

// 中间件的功能：
// 1. 进行权限判断，是否调用 next
// 2. 处理公共逻辑，对 req 和 res 的属性扩充
// 3. 默认情况下都匹配，可以指定匹配路径的开头，中间件需要放在路径匹配之前，路由是严格匹配，中间件是匹配开头
// 4. 错误处理，错误中间件一般放在最后面，只要在 next 中传递了参数，那么就会直接跳到错误中间件来接收

// 第一个参数进行路径匹配，没有第一个参数时默认为 /，此时所有请求都会走中间件
// 指定了路径，会匹配所有以这个路径来头的请求
app.use('/', function (req, res, next) {
  // 不调用 next 就不继续往下走
  console.log("过滤石头");
  req.stone = 'too big';
  next();
});
app.use('/', function (req, res, next) {
  // 不调用 next 就不继续往下走
  console.log("过滤沙子");
  req.sand = 'too small';
  next();
});

app.get('/water', function (req, res) {
  console.log(req.stone, req.sand);
  res.send('water');
})

app.use(function (err, req, res, next) {
  // 内部 fn.length === 4 ，四个参数
  console.log(err);
});

// 监听响应时间
app.use(function (req, res, next) {
  let t = new Date().getTime();
  // 装饰模式，重写 res.end
  let end = res.end;
  res.end = function (...args) {
    console.log(new Date().getTime() - t);
    end.call(res, ...args);
  }
  next();
});

// middleWare 的实现
function app() {
  
}
app.middleware = [];
// 每次调用 use 都会将回调放在数组中，默认调用数组的第一项，将 next 方法传递给数组中的函数
app.use = function (cb) {
  app.middleware.push(cb);
}
let index = 0;
function next() {
  app.middleware[index++](req, res, next);
}
next();
// 将 next 的控制权交给每个回调函数，只有调用了 next，才会继续调用数组中的下一个回调函数