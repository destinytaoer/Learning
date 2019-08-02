/* Promise 基本用法 是异步任务的一个解决方案*/
// Promise 是一个类，通过 new 调用，传入一个回调函数，表示执行的任务
// 这个回调函数接受两个参数，resolve、reject，分别是成功和失败的回调
let Promise = require('./promiseA+');
let p = new Promise(function(resolve, reject) {
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
p.then(
  function(value) {
    console.log(value);
  },
  function(reason) {
    console.log(reason);
  }
).then(
  function(value) {
    console.log(value);
  },
  function(reason) {
    console.log(reason);
  }
);

/* Promise.all 方法，接受一个 promise 数组，如果 promise 全部成功，这个 promise 才会成功，如果有一个失败，这个 promise 就会失败 */
let p1 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    resolve();
  }, 1000);
});
let p2 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    resolve('p2');
  }, 2000);
});
// 同时异步请求多个数据的时候，会用 all
console.time('all');
Promise.all([p1, p2]).then(
  function(data) {
    console.log('两秒后成功：', data); // 此时的返回结果是请求成功所有结果的数组
    console.timeEnd('all');
  },
  function(err) {
    console.log('失败：', err);
    console.timeEnd('all');
  }
);

/* Promise.race 方法，接受一个 promise 数组，如果有一个 promise 成功，那么这个 promise 就成功，有一个失败，就失败了 */
// 当有三个接口都不稳定时，你可以同时取三个接口，哪个先成功就用哪个
console.time('race');
Promise.race([p1, p2]).then(
  function(data) {
    console.log('一秒后成功：', data); // 此时的返回结果是成功的那个 promise 返回的结果
    console.timeEnd('race');
  },
  function(err) {
    console.log('失败：', err);
    console.timeEnd('race');
  }
);

/* Promise.resolve 方法 */

/* Promise.reject 方法 */
