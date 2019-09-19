const express = require('../lib/express');
const app = express();
app.param('uid', function(req, res, next, val, name) {
  req.user = { id: 1, name: 'haha' };
  next();
});
app.param('uid', function(req, res, next, val, name) {
  req.user.name = 'xxx';
  next();
});
app.get('/user/:uid', function(req, res) {
  console.log(req.user);
  res.end('user');
});
app.listen(8080);
