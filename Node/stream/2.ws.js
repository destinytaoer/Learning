/**
 * 可写流
 */
const fs = require('fs');
// 创建可写流，如果文件不存在，就会直接创建文件
let ws = fs.createWriteStream('./2.txt', {
  flags: 'w',
  mode: 0o666,
  start: 0,
  highWaterMark: 3
});
// 当你往可写流中写数据时，也是会先写入缓存区（缓存区大小默认为 16k，即 16 * 1024 = 16384），然后再写入文件中。也就是说，每次只能写 16k

// write 返回一个布尔值，如果缓存区已满，返回 false，未满返回 true
// 即能接着写，返回 true，不能写了返回 false
// 本来应该是返回 false，就不能再往里面写了，但是继续写，数据也不会丢失，会缓存在内存里，等缓存区清空之后再从内存中读出来
let flag = ws.write('1', function() {
  console.log(1);
});
console.log(flag); // true
flag = ws.write('2', function() {
  console.log(2);
});
console.log(flag); // true
flag = ws.write('3', function() {
  console.log(3);
  flag = ws.write('5', function() {
    console.log(5);
  });
  console.log(flag);
  flag = ws.write('6', function() {
    console.log(6);
  });
  console.log(flag);
  flag = ws.write('7', function() {
    console.log(7);
  });
  console.log(flag);
  flag = ws.write('8', function() {
    console.log(8);
  });
  console.log(flag);
  flag = ws.write('9', function() {
    console.log(9);
  });
  console.log(flag);
});
console.log(flag); // false
flag = ws.write('4', function() {
  console.log(4);
});
console.log(flag); // false

ws.on('drain', function() {
  console.log('drain');
});

// ws.on('finish', function() {
//   console.log('finish');
// });
// ws.end('a', function() {
//   console.log('end');
// });
