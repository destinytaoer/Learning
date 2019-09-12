const express = require('./express');
const app = express();

app.param('userid', function(req, res, next, userid) {
  console.log(userid);
  next();
});
app.get('/user/:userid', function(req, res) {
  console.log(req.params); // {name: 'aa', age: '9'}
  res.end('ok');
});
app.listen(8080);
