/* fs 核心模块读写文件 */
let fs = require('fs');
fs.readFile('./1.txt', { encoding: 'utf8' }, function(err, data) {
  console.log(err);
  if (err) {
  } else {
    console.log(data); // 得到一个 Buffer
  }
});
