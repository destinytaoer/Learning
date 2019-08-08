const fs = require('fs');

/* 创建目录 */
// 创建目录的时候，要求父目录必须是存在的，否则出错
fs.mkdir('a/b', 0o666, function(err) {
  console.log(err);
});

// 判断一个文件或目录是否具有某权限
fs.access('a', fs.constants.R_OK, function(err) {
  console.log(err);
});

// 递归异步创建目录
function mkdirp(dir) {
  let paths = dir.split('/');
  !(function next(index) {
    if (index > paths.length) return;
    let cur = paths.slice(0, index).join('/');
    fs.access(cur, fs.constants.R_OK, function(err) {
      if (err) {
        fs.mkdir(cur, 0o666, function() {
          next(index + 1);
        });
      } else {
        next(index + 1);
      }
    });
  })(1);
}
mkdirp('a/b/c/d');
