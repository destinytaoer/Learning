class SyncLoopHook {
  constructor(args) {
    // args 表示 hook 传递的参数, 只用于限定 hook 调用时传递参数的个数
    this.tasks = [];
    this.args = args;
  }
  call(...args) {
    let newArgs = args.slice(0, this.args.length);
    this.tasks.forEach(task => {
      let ret;
      do {
        ret = task(...newArgs);
      } while (ret !== undefined);
    });
  }
  tap(name, task) {
    this.tasks.push(task);
  }
}

module.exports = { SyncLoopHook };
