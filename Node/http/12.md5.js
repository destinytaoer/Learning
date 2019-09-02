// 其中一个应用场景，当客户端访问服务器时，服务器可以返回一个响应头，Content-Md5，这个值就是响应体的 md5 值，然后客户端拿过来时，进行 md5 值的校验
let crypto = require('crypto');
let path = require('path');
let rs = require('fs').createReadStream(path.join(__dirname, '8.msg.txt'), {
  highWaterMark: 2
});

let md5 = crypto.getHashes('md5');
rs.on('data', function(data) {
  md5.update(data);
});

rs.on('end', function() {
  let val = md5.digest('hex');
  res.setHeader('Content-MD5', val);
});
