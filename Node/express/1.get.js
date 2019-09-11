let express = require('./express');
let app = express();

// 启动 8080 服务
app.listen(8080);
// 最重要的是路由功能，根据不同的方法和不同的路径返回不同的响应
// 定义路由规则
app.get('/hello', function(req, res) {
  res.end('hello');
});
app.get('/world', function(req, res) {
  res.end('world');
});
