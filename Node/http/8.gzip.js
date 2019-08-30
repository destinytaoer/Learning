let fs = require('fs');
let zlib = require('zlib');
let path = require('path');

// 实现压缩
function gzip(src) {
  fs.createReadStream(src)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(src + '.gz'));
}
// gzip(path.join(__dirname, '8.msg.txt'));

// 实现解压缩
function gunzip(src) {
  fs.createReadStream(src)
    .pipe(zlib.createGunzip())
    .pipe(
      fs.createWriteStream(path.join(__dirname, path.basename(src, '.gz')))
    );
}
gunzip(path.join(__dirname, '8.msg.txt.gz'));
