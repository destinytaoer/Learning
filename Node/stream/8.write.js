let fs = require('fs');
let WriteStream = require('./10.WriteStream');
// let ws = new WriteStream('./2.txt', {
//   flags: 'w',
//   mode: 0o666,
//   start: 0,
//   encoding: 'utf8',
//   autoClose: true,
//   highWaterMark: 3
// });
let ws = fs.createWriteStream('./2.txt', {
  flags: 'w',
  mode: 0o666,
  start: 0,
  encoding: 'utf8',
  autoClose: true,
  highWaterMark: 3
});

let n = 9;
function write() {
  let flag = true;
  while (flag && n > 0) {
    let s = n;
    flag = ws.write(n + '', function() {
      console.log(s);
    });
    console.log(flag);
    n--;
  }
}
ws.on('drain', function() {
  console.log('drain');
  write();
});
write();
// true
// true
// false
// 9
// drain
// true
// true
// false
// 8
// 7
// 6
// drain
// true
// true
// false
// 5
// 4
// 3
// drain
// 2
// 1
