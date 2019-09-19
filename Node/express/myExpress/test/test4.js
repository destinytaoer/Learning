const express = require('../lib/express');
const app = express();
app.use(function(req, res, next) {
  console.log(req.url);
  console.log('middleware');
  next();
});
app.get('/', function(req, res, next) {
  console.log('1');
  res.end('ok');
});
app.listen(8080);
