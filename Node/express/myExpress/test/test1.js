// TDD 测试驱动开发
// 先编写测试用例
const express = require('../lib/express');
const app = express();
app.get('/', function(req, res) {
  res.end('hello');
});
app.listen(8080, function() {
  console.log('server started at 8080');
});
