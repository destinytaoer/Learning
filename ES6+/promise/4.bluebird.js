/**
 * bluebird 是世界上最快的 promise 库
 * 他能把任意的通过回调函数实现的异步 API 转换为 promise API
 */
// 需要先安装 bluebird
let Promise = require('bluebird');
let fs = require('fs');
let readFile = fs.readFile;

// 返回一个新的函数
let readFileAsync = Promise.promisify(readFile);
readFileAsync('./1.txt', 'utf8').then(function(data) {
  console.log(data);
});

// 还可以转换一个模块，会遍历对象上所有方法，然后对每一个方法都添加一个新的方法 xxxAsync
Promise.promisifyAll(fs);

// 实现 promisify，可以把一个通过回调函数实现的异步方法转换成 promise API
function promisify(fn) {
  return function(...arg) {
    return new Promise(function(resolve, reject) {
      fn.apply(null, [
        ...arg,
        function(err, data) {
          err ? reject(err) : resolve(data);
        }
      ]);
    });
  };
}
// 实现 promisifyAll
function promisifyAll(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'function') {
      obj[key + 'Async'] = Promsie.promisify(obj[key]);
    }
  }
}
