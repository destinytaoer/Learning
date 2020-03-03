// 异步并行钩子
let { AsyncParallelHook } = require('./5. MyAsyncParallelHook');

let hook = new AsyncParallelHook(['name']);
// hook.tapAsync('node', (name, cb) => {
//   setTimeout(() => {
//     console.log('node', name);
//     cb();
//   }, 1000);
// });
hook.tapPromise('node', name => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node', name);
      resolve();
    }, 1000);
  });
});
// hook.tapAsync('react', (name, cb) => {
//   setTimeout(() => {
//     console.log('react', name);
//     cb();
//   }, 1000);
// });
hook.tapPromise('react', name => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name);
      resolve();
    }, 1000);
  });
});
// hook.callAsync('destiny', () => {
//   console.log('end');
// });
hook.promise('destiny').then(() => {
  console.log('end');
});
