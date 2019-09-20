const http = require('http');
let options = {
  host: 'localhost',
  port: 8080,
  method: 'POST',
  path: '/user',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};
let req = http.request(options, function(res) {
  res.pipe(process.stdout);
});

req.end('name=xxx&age=8');
