let http = require('http');
http
  .createServer(function(req, res) {
    res.end('ok' + process.pid);
  })
  .listen(3000, function() {
    console.log(process.pid);
  });
