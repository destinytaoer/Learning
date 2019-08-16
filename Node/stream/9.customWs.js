/**
 * 自定义可写流
 */
let { Writable } = require('stream');
let util = require('util');
util.inherits(Writer, Writable);

let stock = [];
function Writer(opt) {
  Writable.call(this, opt);
}
// 覆盖 _write，其原本是用于写入文件的
Writer.prototype._write = function(chunk, encoding, callback) {
  setTimeout(() => {
    stock.push(chunk.toString('utf8'));
    console.log('增加: ' + chunk);
    callback();
  }, 500);
};
var w = new Writer();
for (var i = 1; i <= 5; i++) {
  w.write('项目:' + i, 'utf8');
}
w.end(function() {
  console.log(stock);
});
