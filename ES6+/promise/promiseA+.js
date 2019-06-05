/* Promise A+ 规范源码 */
function Promise(task) {
  let that = this;

  // 初始状态
  this.status = 'pending';

  // 存放所有成功的回调
  this.onResolvedCallbacks = [];
  // 存放所有失败的回调
  this.onRejectedCallbacks = [];
  // 存放 promise 的结果
  this.value = null;
  this.reason = null;
  function resolve(value) {
    // 只有当状态为 pending 才执行
    if (that.status === 'pending') {
      // 状态变为成功态，执行之后状态固化，再执行 reject 或 resolve 都会被判断拦截
      this.status = 'fulfilled';
      this.value = value;
      that.onResolvedCallbacks.forEach(item => item(value));
    }
  }
  function reject(reason) {
    if (that.status === 'pending') {
      // 状态变为失败态
      this.status = 'rejected';
      this.reason = reason;
      that.onResolvedCallbacks.forEach(item => item(reason));
    }
  }

  // 执行任务
  try {
    task(resolve, reject);
  } catch (e) {
    // 执行任务报错会自动调用 reject
    reject(e);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  let that = this;

  switch (this.status) {
    case 'fulfilled':
      onFulfilled && onFulfilled(this.value);
      break;
    case 'rejected':
      onRejected && onRejected(this.reason);
      break;
    case 'pending':
      that.onResolvedCallbacks.push(onFulfilled);
      that.onRejectedCallbacks.push(onRejected);
  }
  return this;
}

module.exports = Promise;