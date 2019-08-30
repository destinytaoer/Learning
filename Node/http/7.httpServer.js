let http = require('http');

let server = http.createServer();
server.on('request', function(req, res) {
  let result = [];
  req.on('data', function(data) {
    result.push(data);
  });
  req.on('end', function() {
    let str = Buffer.concat(result).toString();
    console.log('请求体：', str);

    // 通过 Content-Type 类型，将 str 进行转换
    let contentType = req.headers['content-type'];
    let body;
    if (contentType === 'application/x-www-form-urlencoded') {
      body = querystring.parse(str);
    } else if (contentType === 'application/json') {
      body = JSNO.parse(str);
    } else {
    }
  });
  res.end('ok');
});
server.listen(8080);
