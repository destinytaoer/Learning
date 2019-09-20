// 静态服务中间件测试用例
let express = require('../lib/express');
let path = require('path');
let app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/user', function(req, res) {
  res.end('user');
});
app.listen(8080);
