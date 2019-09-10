let http = require('http');
let httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer();
let config = {
  'a.com': 'http://localhost:8080',
  'b.com': 'http://localhost:9090'
};
let server = http
  .createServer(function(req, res) {
    let host = req.headers['host'];
    let target = config[host];
    if (target) {
      proxy.web(req, res, {
        target
      });
    } else {
      res.end(host);
    }
  })
  .listen(80);
