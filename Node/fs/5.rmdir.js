const fs = require('fs');

/* 递归同步删除目录 */
function rmdirp(dir) {
  let files = fs.readdirSync(dir);
  files.forEach(function(file) {
    let curPath = dir + '/' + file;
    let child = fs.statSync(curPath);
    if (child.isDirectory()) {
      rmdirp(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  });
  fs.rmdirSync(dir);
}
rmdirp('a');
