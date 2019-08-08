const fs = require('fs');
// 整体文件操作的复制
// function copy(src, target) {
//   fs.readFile(src, function(err, data) {
//     fs.writeFile(target, data);
//   });
// }

// 节约内存的拷贝
const BUFFER_SIZE = 3; // 缓存大小 3 个字节，每次读取和写入的字节数
function copy(src, target) {
  fs.open(src, 'r', 0o666, function(err, readFd) {
    fs.open(target, 'w', 0o666, function(err, writeFd) {
      let buff = Buffer.alloc(BUFFER_SIZE);
      !(function next() {
        fs.read(readFd, buff, 0, BUFFER_SIZE, null, function(
          err,
          bytesRead,
          buffer
        ) {
          if (bytesRead > 0)
            fs.write(writeFd, buffer, 0, bytesRead, null, next);
        });
      })();
    });
  });
}
copy('./1.txt', './2.txt');
