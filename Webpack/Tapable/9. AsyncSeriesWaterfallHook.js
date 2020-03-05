// 异步串行钩子
let { AsyncSeriesWaterfallHook } = require('./9. MyAsyncSeriesWaterfallHook');

let hook = new AsyncSeriesWaterfallHook(['name']);
// hook.tapAsync('node', (name, cb) => {
//   setTimeout(() => {
//     console.log('node', name);
//     cb('err', 'from-node');
//   }, 1000);
// });
hook.tapPromise('node', name => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node', name);
      reject('error');
      // resolve('from-node');
    }, 1000);
  });
});
// hook.tapAsync('react', (data, cb) => {
//   setTimeout(() => {
//     console.log('react', data);
//     cb(null);
//   }, 1000);
// });
hook.tapPromise('react', data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', data);
      resolve();
    }, 1000);
  });
});
// hook.callAsync('destiny', () => {
//   console.log('end');
// });
hook
  .promise('destiny')
  .then(() => {
    console.log('end');
  })
  .catch(err => {
    console.log(err);
  });
