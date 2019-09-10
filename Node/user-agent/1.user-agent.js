let http = require('http');
let userAgentParse = require('user-agent-parse');
let server = http
  .createServer(function(req, res) {
    let userAgent = req.headers['user-agent'];
    console.log(userAgent);
    let userAgentObj = userAgentParse.parse(userAgent);
    res.end(JSON.stringify(userAgentObj));
  })
  .listen(8080);
