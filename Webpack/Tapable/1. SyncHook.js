// 同步钩子
let { SyncHook } = require('tapable');

class Lesson {
  constructor() {
    // 绑定钩子
    this.hooks = {
      arch: new SyncHook(['name'])
    };
  }
  tap() {
    // 注册监听函数
    this.hooks.arch.tap('node', function(name) {
      console.log('node', name);
    });
    this.hooks.arch.tap('react', function(name) {
      console.log('react', name);
    });
  }
  start() {
    // 启动钩子, 启动时, 让注册的钩子依次执行
    this.hooks.arch.call('destiny');
  }
}

let l = new Lesson();
l.tap(); // 注册事件
l.start(); // 启动钩子
