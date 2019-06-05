/* Promise 基本用法 是异步任务的一个解决方案*/
// Promise 是一个类，通过 new 调用，传入一个回调函数，表示执行的任务
// 这个回调函数接受两个参数，resolve、reject，分别是成功和失败的回调
let Promise = require('./promiseA+');
let p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    let num = Math.random();
    if (num > 0.5) {
      // resolve 需要手动调用，表示成功
      resolve('成功');
    } else {
      // 执行任务报错会自动调用 reject
      // 也可以手动调用 reject 表示失败
      reject('失败');
    }
  }, 1000);
});

/* Promise 的状态：
  1. pending（初始态）
  2. fulfilled（成功态）
  3. rejected（失败态）

  状态只能有 pending -> fulfilled 或者 pending -> rejected，状态一旦变更就会固化，不会再改变。
  即，只要调用了 resolve 状态变更为 fulfilled，那么再执行 resolve 或 rejected 都不会有任何效果。调用了 reject 同理。
*/

/* then 方法，具有两个参数，onFulfilled、onRejected，分别是成功和失败的回调 */
p.then(function (value) {
    console.log(value);
  }, function (reason) {
    console.log(reason);
  });

