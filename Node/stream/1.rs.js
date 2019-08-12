/**
 * 可读流
 */
const fs = require('fs');
// 创建一个可读流时，就会打开文件，触发 open 事件
let rs = fs.createReadStream('./1.txt', {
  flags: 'r', // 表明要对文件进行何种操作的标志位
  mode: 0o666, // 权限位
  autoClose: true, // 是否自动关闭
  start: 2, // 开始读取位置，索引从 0 算起
  end: 8, // 结束读取位置，包含索引 8
  highWaterMark: 3 // 缓存区大小，单位字节
});
rs.setEncoding('utf8'); // 设置编码
// 监听 data 事件时，当你一旦开始监听 data 事件，流就开始读文件的内容，并且发射 data，读一点发射一点，读的时候先进入缓存区（缓存区大小默认 64k，即 1024 * 64 = 65536 个字节），然后再发射出来。也就是说，每一次至多只能读取缓存区大小的内容
rs.on('data', function(data) {
  console.log(data);

  // 默认情况下，当你监听 data 事件之后，会不停读数据，然后触发 data 事件，触发完 data 事件之后，继续读取数据，不会停止，直到到达设定界限或者读完文件
  // 流有时候需要暂停和恢复的机制
  rs.pause(); // 暂停
  setTimeout(() => {
    rs.resume(); // 恢复
  }, 1000);
});
// end 事件
rs.on('end', function() {
  console.log('end');
});
// error 事件
rs.on('error', function(err) {
  console.log(err);
});
// 文件流具有的 open 和 close 事件
rs.on('open', function() {
  console.log('open');
});
rs.on('close', function() {
  console.log('close');
});
