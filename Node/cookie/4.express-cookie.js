const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.get('/write', function(req, res) {
  res.cookie('name', 'aaa', {
    domain: 'localhost:8080'
  });
  res.cookie('age', '11', {
    path: '/read1'
  });
  res.end('write ok');
});
app.get('/read', function(req, res) {
  res.send(req.cookies);
});
app.get('/read1', function(req, res) {
  res.send(req.cookies);
});
app.get('/', function(req, res) {
  res.send(req.cookies);
});
app.listen(8080);
