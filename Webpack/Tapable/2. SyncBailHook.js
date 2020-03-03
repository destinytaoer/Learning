// 同步钩子
let { SyncBailHook } = require('./2. MySyncBailHook');

let hook = new SyncBailHook(['a', 'b']);

hook.tap('node', name => {
  console.log('node', name);
  return 'error';
});
hook.tap('react', name => {
  console.log('react', name);
});
hook.call('destiny');
