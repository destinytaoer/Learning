const fs = require('fs');

fs.readFile('./1.txt', function(err, data) {
  if (data[0] == 0xef && data[1] == 0xbb && data[2] == 0xbf) {
    data = data.slice(3);
  }
});

// node 不支持 GBK 编码
fs.readFile('./2.txt', function(err, data) {
  console.log(data);
});
/* 使用第三方模块 iconv-lite 进行转码，需要先安装 */
let iconv = require('iconv-lite');
fs.readFile('./2.txt', function(err, data) {
  let str = iconv.decode(data, 'gbk');
  console.log(str);
});
