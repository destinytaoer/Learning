// 异步并行钩子
let { AsyncParallelBailHook } = require('./6. MyAsyncParallelBailHook');

let hook = new AsyncParallelBailHook(['name']);

// hook.tapPromise('node', name => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('node', name);
//       reject('error');
//     }, 1000);
//   });
// });
// hook.tapPromise('react', name => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log('react', name);
//       reject('err');
//     }, 2000);
//   });
// });
// hook
//   .promise('destiny')
//   .then(() => {
//     console.log('end');
//   })
//   .catch(err => console.log(err));
hook.tapAsync('node', (name, cb) => {
  setTimeout(() => {
    console.log('node', name);
    cb('err');
  }, 1000);
});
hook.tapAsync('react', (name, cb) => {
  setTimeout(() => {
    console.log('react', name);
    cb('err');
  }, 2000);
});

hook.callAsync('destiny', err => {
  console.log('end', err);
});
