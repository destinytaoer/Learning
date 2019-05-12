let express = require('express');
// 创建路由池
let router = express.Router();
let path = require('path');
// function bodyparse() {
//   return function (req, res, next) {
//     let str = '';
//     req.on('data', function (chunk) {
//       str += chunk;
//     });
//     req.on('end', function () {
//       req.body = require('querystring').parse(str);
//       next();
//     })
//   }
// }
let bodyParse = require('body-parser');
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());
// router 也是函数
router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});
router.get('/reg', function (req, res) {
  // path.resolve('../views/reg.html') 是根据运行的文件进行解析的
  // path.join 是拼接成固定的绝对路径
  // 此时不能用 resolve
  res.sendFile(path.join(__dirname, '../views/reg.html'));
});

router.post('/reg', function (req, res) {
  // 使用中间件 bodyparse 解决
  res.body
});

module.exports = router;
/*
router.post('/reg', function (req, res) {
  // 获取表单数据
  let str = '';
  req.on('data', function (chunk) {
    str += chunk;
  });
  req.on('end', function () {
    console.log(str);
    // 开始解析 str： username=admin&password=123
    // 使用正则
    // let obj = {};
    // str.replace(/([^&=]+)=([^&=]+)/g,, function () {
    //   obj[arguments[1]] = arguments[2]
    // });
    // 使用 querystring 模块
    let obj = require('querystring').parse(str);
  })
})
*/