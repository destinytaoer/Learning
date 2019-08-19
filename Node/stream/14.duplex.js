/* 实现双工流：读和写是独立的 */
let { Duplex } = require('stream');
let index = 0;
let duplex = Duplex({
  read() {
    if (index++ < 10) {
      this.push('a');
    } else {
      this.push(null);
    }
  },
  write(chunk, encoding, next) {
    console.log(chunk.toString().toUpperCase());
    next();
  }
});
// process.stdin 标准输入流
// process.stdout 标准输出流
process.stdin.pipe(duplex).pipe(process.stdout);
