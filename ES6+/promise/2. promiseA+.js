/* Promise A+ 规范源码 */
// 三种状态
const PENDING = 'pending'; // 初始态
const FULFILLED = 'fulfilled'; // 成功态
const REJECTED = 'rejected'; // 失败态

function Promise(task) {
  let that = this;

  // 初始状态为 pending
  this.status = PENDING;

  // 保存成功的结果 value 和 失败的原因 reason
  this.value = null;
  this.reason = null;

  // 发布订阅模式, 保存成功和失败的回调
  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  // resolve 和 reject 是一个函数
  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (that.status === PENDING) {
        // 状态凝固
        that.status = FULFILLED; // 执行 resolve 修改为成功态
        that.value = value;
        // 在修改状态之后, 按顺序执行成功的回调
        that.onFulfilledCallbacks.forEach(function(cb) {
          cb(value);
        });
      }
    });
  }

  function reject(reason) {
    setTimeout(() => {
      if (that.status === PENDING) {
        that.status = REJECTED; // 执行 reject 修改为失败态
        that.reason = reason;
        // 在修改状态之后, 按顺序执行失败的回调
        that.onRejectedCallbacks.forEach(function(cb) {
          cb(reason);
        });
      }
    });
  }

  try {
    task(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  // 判断是否一个函数, 不是一个函数则透传其值
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

  // 处理同步的情况, 同步情况下, 调用 then 时, 状态已经修改为 fulfilled 或者 rejected
  if (this.status === FULFILLED) {
    // then 需要返回一个 Promise
    promise2 = new Promise(function(resolve, reject) {
      setTimeout(() => {
        try {
          // 已经成功, 直接执行 onFulfilled, 并传入 value
          let x = onFulfilled(that.value);
          // 成功回调执行成功, 则 promise2 成功, 并传递成功回调执行的返回值 x 作为 value
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
          // 已经失败, 直接执行 onRejected, 并传入 reason
          let x = onRejected(that.reason);
          // 失败回调执行成功, 则 promise2 成功, 将失败回调执行的返回值 x 作为 value 传递下去
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  // 处理异步的情况, 异步情况下, 调用 then 时, 状态还是 pending
  if (this.status === PENDING) {
    promise2 = new Promise(function(resolve, reject) {
      // 处理异步, 用到发布订阅模式, 先保存两个回调函数
      that.onFulfilledCallbacks.push(function(value) {
        try {
          let x = onFulfilled(value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      that.onRejectedCallbacks.push(function(reason) {
        try {
          let x = onRejected(reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  return promise2;
};

// 处理传递的 value 值是 promise 或 thenable 的情况
function resolvePromise(promise, x, resolve, reject) {
  // 如果两个值相等, 说明已经循环引用了, 直接失败
  if (promise === x) return reject(new TypeError('循环引用'));

  let called = false; // thenable 不一定有状态来判断是否已经调用了 resolve 或 reject, 使用 called 来记录
  if (x instanceof Promise) {
    // x 是 promise
    if (x.status === PENDING) {
      // 回调是异步
      x.then(function(y) {
        resolvePromise(promise, y, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
  } else if (x != null && (typeof x === 'function' || typeof x === 'object')) {
    // x 可能是 thenable 对象
    try {
      // 执行报错处理
      let then = x.then;
      if (typeof then === 'function') {
        // x 是 thenable 对象
        then.call(
          x,
          function(y) {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          function(reason) {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        // x 不是 thenable 对象
        resolve(x); // 直接传递 x 即可
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // x 是一个普通值, 直接传递下去即可
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
c;
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
