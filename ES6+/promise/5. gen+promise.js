let fs = require('fs');
function readFile(fileName) {
  return new Promise(function(resolve, reject) {
    fs.readFile(fileName, 'utf8', function(err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
function* read() {
  let a = yield readFile('./5.1.txt');
  console.log(a);
  let b = yield readFile('./5.2.txt');
  console.log(b);
  let c = yield readFile('./5.3.txt');
  console.log(c);
  return c;
}

// let it = read();
// let p1 = it.next().value;
// p1.then(function(data) {
//   let p2 = it.next(data).value;
//   p2.then(function(data) {
//     let p3 = it.next(data).value;
//     p3.then(function(data) {
//       let p4 = it.next(data).value;
//       console.log(p4);
//     });
//   });
// });

/* co 就是方便 promise 和 generator 结合使用的库，由 koa 的作者 tj 实现 */
let co = require('./6. co.js');
let p = co(read); // read 就会自己执行，返回一个 promise
p.then(function(data) {
  console.log(data); // 获取到最后 read 返回的值
});
