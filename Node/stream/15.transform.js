/* 转换流：转换流是实现数据转换的，转换流是一个双工的，但是其读写是由关系的 */
let { Transform } = require('stream');
let ts = Transform({
  transform(chunk, encoding, cb) {
    this.push(chunk.toString().toUpperCase());
    cb();
  }
});

process.stdin.pipe(ts)
  ts.pipe(process.stdout);
