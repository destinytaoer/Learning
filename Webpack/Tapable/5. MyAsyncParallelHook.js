class AsyncParallelHook {
  constructor(args) {
    // args 表示 hook 传递的参数, 只用于限定 hook 调用时传递参数的个数
    this.tasks = [];
    this.args = args;
  }
  callAsync(...args) {
    let finalCallback = args.pop(); // 拿到回调函数
    if (typeof finalCallback !== 'function') {
      args.push(finalCallback);
      finalCallback = null;
    }
    let newArgs = args.slice(0, this.args.length);

    let index = 0; // 通过计数来判断是否所有异步函数都执行完毕
    let done = () => {
      index++;
      if (index === this.tasks.length) {
        finalCallback();
      }
    };
    this.tasks.forEach(task => {
      task(...newArgs, done);
    });
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    let newArgs = args.slice(0, this.args.length);
    let tasks = this.tasks.map(task => task(...newArgs));
    return Promise.all(tasks);
  }
}

module.exports = { AsyncParallelHook };
