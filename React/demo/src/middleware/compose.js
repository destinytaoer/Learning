// 实现组合管道
function compose(...fns) {
  return (...args) => {
    let last = fns.pop();
    return fns.reduceRight((result, fn) => {
      fn(result);
    }, last(...args))
  }
}