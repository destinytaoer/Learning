let fs = require('fs');

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
    flag = ws.write(n + '');
    n--;
  }
}
ws.on('drain', function() {
  console.log('drain');
  write();
});
write();
