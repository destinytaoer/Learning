const fs = require('fs');
const path = require('path');
/* 递归同步删除目录 */
// function rmdirp(dir) {
//   let files = fs.readdirSync(dir);
//   files.forEach(function(file) {
//     let curPath = dir + '/' + file;
//     let child = fs.statSync(curPath);
//     if (child.isDirectory()) {
//       rmdirp(curPath);
//     } else {
//       fs.unlinkSync(curPath);
//     }
//   });
//   fs.rmdirSync(dir);
// }
// rmdirp('a');

/* 递归异步删除目录 */
function rmdirp(dir) {
  return new Promise(function(resolve, reject) {
    fs.stat(dir, (err, stat) => {
      if (stat.isDirectory()) {
        if (err) reject(err);
        fs.readdir(dir, (err, files) => {
          if (err) reject(err);
          // 先删除当前目录的子文件夹和文件，再删除自己
          Promise.all(files.map(item => rmdirp(path.join(dir, item)))).then(
            () => {
              fs.rmdir(dir, resolve);
            }
          );
        });
      } else {
        fs.unlink(dir, resolve);
      }
    });
  });
}
rmdirp('a');
