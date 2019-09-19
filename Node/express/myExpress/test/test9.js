const express = require('../lib/express');
const app = express();

app.get('/user', function(req, res) {
  console.log(req.query);
  console.log(req.path);
  console.log(req.hostname);
  res.end('user');
});

app.listen(8080);
