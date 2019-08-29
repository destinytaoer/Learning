let http = require('http');
let server = http.createServer();
// 服务器监听到客户端的请求时，执行回调
// req 代表客户端的连接，服务器把客户端请求的信息进行解析，然后放入 req 中
server.on('request', function(req, res) {
  console.log(req.method); // 请求方法
  console.log(req.url); // 获取请求路径
  console.log(req.protocol); // 获取协议
  console.log(req.headers); // 获取请求头

  // 通过流的方式来获取请求体
  let result = [];
  req.on('data', function(data) {
    result.push(data);
  });
  req.on('end', function() {
    let r = Buffer.concat(result); // result 是请求体
    console.log(r.toString());
    res.end(r);
  });
});

server.listen(8080, function() {
  console.log('server started at http://localhost:8080');
});
