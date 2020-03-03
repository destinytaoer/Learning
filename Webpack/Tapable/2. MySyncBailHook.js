class SyncBailHook {
  constructor(args) {
    // args 表示 hook 传递的参数, 只用于限定 hook 调用时传递参数的个数
    this.tasks = [];
    this.args = args;
  }
  call(...args) {
    let newArgs = args.slice(0, this.args.length);
    let ret; // 当前监听函数执行的返回值
    let index = 0;
    do {
      ret = this.tasks[index++](...newArgs);
    } while (ret === undefined && index < this.tasks.length);
  }
  tap(name, task) {
    this.tasks.push(task);
  }
}

module.exports = { SyncBailHook };
