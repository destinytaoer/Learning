let http = require('http');
let server = http
  .createServer(function(req, res) {
    res.end('9090');
  })
  .listen(9090);
