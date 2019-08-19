/* 可读流测试用例 */
let fs = require('fs');
let ReadStream = require('./12.ReadStream');
let WriteStream = require('./10.WriteStream');
/**
 * 流动模式
 */
// let rs = new ReadStream('./1.txt', {
//   flags: 'r',
//   mode: 0o666,
//   start: 3,
//   end: 7,
//   autoClose: true,
//   encoding: 'utf8',
//   highWaterMark: 3
// });
// let rs = fs.createReadStream('./1.txt', {
//   flags: 'r',
//   mode: 0o666,
//   start: 3,
//   end: 7,
//   autoClose: true,
//   encoding: 'utf8',
//   highWaterMark: 3
// });

// rs.on('open', () => {
//   console.log('open');
// });

// rs.on('data', data => {
//   console.log(data);
// });

// rs.on('end', () => {
//   console.log('end');
// });

// rs.on('close', () => {
//   console.log('close');
// });
// open
// 456
// 78
// end
// close

/**
 * pipe
 */
// let ws = new WriteStream('./2.txt', {
//   highWaterMark: 3
// });

// rs.pipe(ws);

/**
 * 暂停模式
 */
let rs = new ReadStream('./1.txt', {
  flags: 'r',
  mode: 0o666,
  start: 3,
  end: 8,
  autoClose: true,
  encoding: 'utf8',
  highWaterMark: 3
});
// 监听 readable 后，会立刻进行暂停模式，并立刻填充缓存区
// 填充完成触发 readable 事件
rs.on('readable', function() {
  console.log(rs.length); // 3
  let char = rs.read(1);
  console.log(rs.length); // 2
  setTimeout(() => {
    console.log(rs.length); // 5
  }, 200);
});
