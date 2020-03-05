class AsyncSeriesWaterfallHook {
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

    let next = (i, err, data) => {
      let task = this.tasks[i];
      if (!task || err != undefined) return finalCallback();
      if (i === 0) {
        task(...newArgs, (err, data) => next(i + 1, err, data));
      } else {
        task(data, (err, data) => next(i + 1, err, data));
      }
    };
    next(0);
  }
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    let newArgs = args.slice(0, this.args.length);
    // let [first, ...rest] = this.tasks;
    // return rest.reduce((p, next) => {
    //   return p.then(() => next(...newArgs));
    // }, first(...newArgs));
    let next = (i, p) => {
      let task = this.tasks[i];
      if (!task) return p;
      return next(
        i + 1,
        p.then(() => task(...newArgs))
      );
    };
    return next(0, Promise.resolve());
  }
}

module.exports = { AsyncSeriesWaterfallHook };
