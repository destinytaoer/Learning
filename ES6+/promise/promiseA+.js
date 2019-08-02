/* Promise A+ 规范源码 */
const PENDING = 'pending'; // 初始态
const FULFILLED = 'fulfilled'; // 成功态
const REJECTED = 'rejected'; // 失败态

function Promise(task) {
  let that = this;

  that.status = PENDING; // 设置初始状态
  // 定义存放成功回调的数组
  that.onResolvedCallbacks = [];
  // 定义存放失败回调的数组
  that.onRejectedCallbacks = [];

  // promise 最终返回的结果
  that.value = null; // 成功结果
  that.reason = null; // 报错信息

  // 成功
  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    if (that.status === PENDING) {
      // 只有当状态是 pending 时，才会修改状态
      that.status = FULFILLED;
      that.value = value;
      // 调用成功回调
      that.onResolvedCallbacks.forEach(cb => cb(that.value));
    }
  }
  // 失败
  function reject(reason) {
    if (that.status === PENDING) {
      // 只有当状态是 pending 时，才会修改状态
      that.status = REJECTED;
      that.reason = reason;
      // 调用失败回调
      that.onRejectedCallbacks.forEach(cb => cb(that.reason));
    }
  }

  // 创建 Promise 实例时，就直接开始执行任务
  try {
    // 函数执行可能报错，所以需要进行捕获
    task(resolve, reject);
  } catch (e) {
    // 如果执行报错，则执行失败回调
    reject(e);
  }
}
// onFulfilled 用来接收 promise 成功的值
// onRejected 用来接收 promise 失败的值
// 都是可选参数
Promise.prototype.then = function(onFulfilled, onRejected) {
  // 如果这两个参数不是函数，那么需要给其一个默认函数，把成功或失败的结果往后抛，即值的穿透
  onFulfilled =
    typeof onFulfilled === 'function'
      ? onFulfilled
      : function(value) {
          return value;
        };
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function(reason) {
          throw reason;
        };

  let that = this;
  let promise2;
  // 如果已经成功了，就直接调用成功回调，用于处理同步代码
  if (this.status === FULFILLED) {
    promise2 = new Promise(function(resolve, reject) {
      setTimeout(() => {
        try {
          let x = onFulfilled(that.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  if (this.status === REJECTED) {
    promise2 = new Promise(function(resolve, reject) {
      setTimeout(() => {
        try {
          let x = onRejected(that.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
  // 处理异步代码
  if (this.status === PENDING) {
    promise2 = new Promise(function(resolve, reject) {
      that.onResolvedCallbacks.push(function() {
        setTimeout(() => {
          try {
            let x = onFulfilled(that.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
      that.onRejectedCallbacks.push(function() {
        setTimeout(() => {
          try {
            let x = onRejected(that.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    });
  }
  return promise2;
};

// 处理返回结果是 Promise 或 thenable 对象
function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('循环引用'));
  }
  let called = false;
  if (x != null && (typeof x === 'function' || typeof x === 'object')) {
    // 处理 x 可能是 thenable 对象，只要有 then 方法的对象，为了兼容其他 promise 库
    // 当我们的 promise 和别的 promise 进行交互，编写这段代码的时候尽量的考虑兼容性，允许别人瞎写
    try {
      let then = x.then;
      if (typeof then === 'function') {
        // x 是一个 thenable 对象
        then.call(
          x,
          function(y) {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          function(err) {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        // 不是 thenable 对象，直接成功
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果 x 只是一个普通值，就直接成功
    resolve(x);
  }
}

// catch 原理，只传失败回调即可
Promise.prototype.catch = function(onRejected) {
  this.then(null, onRejected);
};
function gen(times, cb) {
  let result = [];
  let count = 0;
  return function(data, index) {
    result[index] = data;
    if (++count === times) {
      cb && cb(result);
    }
  };
}
Promise.all = function(promises) {
  return new Promise(function(resolve, reject) {
    let done = gen(promises.length, resolve);
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(function(data) {
        done(data, i);
      }, reject);
    }
  });
};
Promise.race = function(promises) {
  return new Promise(function(resolve, reject) {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};
// 返回一个立即成功的 promise
Promise.resolve = function(value) {
  return new Promise(function(resolve, reject) {
    resolve(value);
  });
};
// 返回一个立即失败的 promise
Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) {
    reject(reason);
  });
};

/* 用于 promises-aplus-tests 的单元测试 */
Promise.deferred = Promise.defer = function() {
  let df = {};
  df.promise = new Promise(function(resolve, reject) {
    df.resolve = resolve;
    df.reject = reject;
  });
  return df;
};

module.exports = Promise;
