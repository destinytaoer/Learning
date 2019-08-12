// 读一点写一点
let fs = require('fs');
let rs = fs.createReadStream('./1.txt');
let ws = fs.createWriteStream('./2.txt');
// rs.pipe(ws);

// 原理
rs.on('data', function(data) {
  var flag = ws.write(data); // 读到一点写一点
  if (!flag) rs.pause(); // 如果写的缓存已满，那么就暂停读取
});
ws.on('drain', function() {
  rs.resume(); // 等到可写流的数据块缓存清空之后，再恢复读取
});
rs.on('end', function() {
  ws.end(); // 读取完成之后，写入也结束
});
