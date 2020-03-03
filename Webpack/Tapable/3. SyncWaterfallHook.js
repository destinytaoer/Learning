// 同步钩子
let { SyncWaterfallHook } = require('./3. MySyncWaterfallHook');

let hook = new SyncWaterfallHook(['a', 'b']);

hook.tap('node', name => {
  console.log('node', name);
  return 'node';
});
hook.tap('react', data => {
  console.log('react', data);
});
hook.call('destiny');
