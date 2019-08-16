// 可读流具有两种模式：流动模式和暂停模式
// 流动模式，会不断读取设定的字节数到缓存区，满了之后就通过 data 发射出来，然后继续读取到缓存，然后发射，直到读取完成。发射的数据不会再进行缓存，如果你在回调中不进行消费，那么就会白白流失。
// 暂停模式，会停止读取，已经读到的仍然会放在缓存区中，以便下次恢复时继续用于发射

// 暂停 -> 流动
// 1. 监听 data
// 2. 调用 resume
// 3. 调用 pipe

// 流动 -> 暂停
// 1. 监听 readable
// 2. 调用 pause
// 3. 有管道的情况下，调用 unpipe
let fs = require('fs');

let rs = fs.createReadStream('./1.txt', {
  highWaterMark: 3
});

// 监听 readable 事件时，会进入暂停模式
// 可读流会马上向底层读取文件，然后放入缓存区，只是把缓存区填满，但是不会发射 data 事件，而是发射 readable 事件，就是可以继续读取的意思，然后你可以在回调中通过 rs.read 读取缓存区数据
// let index = 1;
// rs.on('readable', function() {
//   // 打印缓存区的字节数
//   console.log(rs._readableState.length);
//   // read 如果不加参数，表示读取整个缓存区数据
//   // 参数为读取字节数，如果要读的字节小于等于缓存区大小，则直接返回
//   let ch;
//   if (index === 1) {
//     ch = rs.read(1);
//   } else {
//     ch = rs.read();
//   }
//   index++;
//   console.log(ch);
//   console.log(rs._readableState.length);
//   // 当你读取完指定字节之后，可读流发现剩余的字节小于设定的最高水位线时，就会立刻读取填满，但是每次读取的都是最高水位线数量的字节，所以现在实际字节会超过最高值，缓存区实际上是没有限制的
//   // 只要向底层读取了文件放入缓存区，那么就会触发 readable 事件
// });

rs.on('data', function(ch) {
  console.log(ch);
});
rs.on('readable', function() {
  let ch = rs.read();
  console.log('readable');
});
rs.on('end', function() {
  console.log('end');
});
