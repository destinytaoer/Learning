let http = require('http');
let server = http
  .createServer(function(req, res) {
    res.end('8080');
  })
  .listen(8080);
