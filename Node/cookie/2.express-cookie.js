const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.get('/write', function(req, res) {
  res.cookie('name', 'aaa');
  res.end('write ok');
});
app.get('/read', function(req, res) {
  res.send(req.cookies);
});
app.listen(8080);
