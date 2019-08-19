/* 对象流：普通流里放的是 buffer，对象流里放的是对象 */
let { Transform } = require('stream');
let fs = require('fs');
let rs = fs.createReadStream('./user.json');
let toJSON = Transform({
  readableObjectMode: true, // 开启可以向可读流里放对象
  transform(chunk, encoding, cb) {
    // 往可读流里放入数据只能是 Buffer 或 String
    this.push(JSON.parse(chunk.toString()));
  }
});
let outJSON = Transform({
  writableObjectMode: true, // 开启可以向可写流里放对象
  transform(chunk, encoding, cb) {
    console.log(chunk);
  }
});
rs.pipe(toJSON).pipe(outJSON);
