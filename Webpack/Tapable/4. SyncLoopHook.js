// 同步钩子
// 不返回 undefined 的监听函数会执行多次
let { SyncLoopHook } = require('./4. MySyncLoopHook');

let hook = new SyncLoopHook(['a', 'b']);
let index = 0;
hook.tap('node', name => {
  console.log('node', name);

  return ++index === 3 ? undefined : 'continue';
});
hook.tap('react', data => {
  console.log('react', data);
});
hook.call('destiny');
