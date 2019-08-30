let http = require('http');

let options = {
  // 请求头和请求行的配置
  host: 'localhost',
  port: 8080,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};
let req = http.request(options, function(res) {
  // response 回调
  console.log(res.statusCode);
  console.log(res.headers);
  let result = [];
  res.on('data', function(chunk) {
    result.push(chunk);
  });
  res.on('end', function() {
    let str = Buffer.concat(result);
    console.log(str.toString());
  });
});
// 相当于 req.on('response', function(res) {})

// req 是一个可写流，向请求体写入数据，最终发动给服务器中
// 注意 GET 请求没有请求体，写入也没有用
req.write('name=xxx');
// 结束请求体的写入，调用 end 才真正发送给服务器
req.end();
