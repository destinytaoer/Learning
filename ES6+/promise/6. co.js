/* 实现 co */
function co(gen) {
  let it = gen(); // 要让生成器持续执行
  return new Promise(function(resolve, reject) {
    !(function next(lastVal) {
      let { value, done } = it.next(lastVal);
      if (done) {
        resolve(value);
      } else {
        value.then(next, reject);
      }
    })();
  });
}
module.exports = co;
