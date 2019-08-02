/* async/await 是异步的终极解决方案，它其实是 generator 和 promise 结合的语法糖 */
/**
 * 1. 简洁
 * 2. 有很好的语义
 * 3. 可以很好的处理异步
 *   - 可以抛异常 使用 throw Error
 *   - 可以返回值 使用return
 *   - 可以 try catch 捕获异常
 */
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
async function read() {
  // await 后面必须跟一个 promise
  let a = await readFile('./1.1.txt');
  console.log(a);
  let b = await readFile('./1.2.txt');
  console.log(b);
  let c = await readFile('./1.3.txt');
  console.log(c);
  return c;
}
read(); // 返回的是一个 promise

/* 原理就是 generator + promise 查看 promise*/
// function read() {
//   return co(function*() {
//     let a = yield readFile('./1.1.txt');
//     console.log(a);
//     let b = yield readFile('./1.2.txt');
//     console.log(b);
//     let c = yield readFile('./1.3.txt');
//     console.log(c);
//     return c;
//   });
// }
