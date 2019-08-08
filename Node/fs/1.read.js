/* fs 核心模块读写文件 */
let fs = require('fs');

/* readFile */
// fs.readFile('./1.txt', { encoding: 'utf8' }, function(err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data); // 得到一个 Buffer
//   }
// });
// let result = fs.readFileSync('./1.txt', { encoding: 'utf8' });
// console.log(result);

/* writeFile */
// fs.writeFile('./2.txt', 'xxx', function(err) {
//   console.log(err);
// });
/* appendFile */
// fs.appendFile('./1.txt', 'xxx', function() {
//   console.log('ok');
// });
/* 都是把文件当成一个整体来操作的（整体读取到内存中），当文件特别大时，大于内存时，是无法执行这样的操作的。我们此时需要更加精确的控制读取的字节 */

/* open */
// fd file discriptor 文件描述符
// 0 标准输入 1 标准输出 2 错误输出
// 标准输入
// process.stdin.on('data', function(data) {
//   console.log(data);
// });
// 标准输出
// console.log('hello'); // 内部调用下面这行
// process.stdout.write('hello');
// 错误输出
// console.error('wrong'); // 内部调用下面这行
// process.stderr.write('wrong')
// 路径 flag mode
// fs.open('./1.txt', 'r', 0o666, function(err, fd) {
//   console.log('fd', fd); // 5 前面的都被占用了
//   let buff = Buffer.alloc(4);
//   // fd buffer offset length position cb
//   // 读取字节长度超过 buffer 长度会报错
//   // position 不传表示文件的当前字节位置
//   fs.read(fd, buff, 0, 3, 0, function(err, bytesRead, buffer) {
//     console.log(buffer.toString());
//     console.log(err);
//     console.log(bytesRead); // 读取的字节数
//     console.log(buffer === buff); // 读取后的 buffer 与 buff 是完全一样的
//   });
// });

// r+ 不清空写入，w 会清空再写入，a 是追加
fs.open('./2.txt', 'w', 0o666, function(err, fd) {
  console.log(fd);
  let buff = Buffer.from('中国');
  fs.write(fd, buff, 0, 3, null, function(err, bytesWritten, buffer) {
    console.log(bytesWritten); // 写入字节数
    console.log(buffer);
    console.log(buff === buffer); // 写入的 buffer 与 buff 完全一样
  });
  // 后续操作并不会清空
  fs.write(fd, buff, 3, 3, null, function(err, bytesWritten, buffer) {
    console.log(bytesWritten); // 写入字节数
    console.log(buffer);
    console.log(buff === buffer); // 写入的 buffer 与 buff 完全一样
  });
});
