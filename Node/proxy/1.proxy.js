let http = require('http');
let httpProxy = require('http-proxy');
let proxy = proxy.createProxyServer();
// 正向代理 帮助或代理局域网内的用户访问外网
// 反向代理 用来代理局域网内的服务器被访问

let server = http
  .createServer(function(req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:9000'
    });
  })
  .listen(8000);
