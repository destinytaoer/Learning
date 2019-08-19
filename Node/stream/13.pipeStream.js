/* 自定义的管道流 */
const { Readable, Writable } = require('stream');

let index = 0;
const rs = Readable({
  highWaterMark: 2,
  read: function() {
    process.nextTick(() => {
      if (index < 10) {
        console.log('push', ++index);
        this.push(index + '');
      }
    });
  }
});

const ws = Writable({
  highWaterMark: 2,
  write: function(chunk, encoding, next) {
    console.log('写入:', chunk.toString());
    next(); // 调用 next 才能进入下次写入
  }
});

rs.pipe(ws);
