/* q 是 Promise 的一个实现库，在 angular 中的 promise 就是用的 q */
// 需要先安装 q，npm i q
let Q = require('q');
let fs = require('fs');
function readFile(fileName) {
  let defer = Q.defer();
  fs.readFile(fileName, 'utf8', function(err, data) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(data);
    }
  });
  return defer.promise;
}

// q 的结构
let Q = {
  defer() {
    let success, error;
    return {
      resolve(value) {
        success(value);
      },
      reject(err) {
        error(err);
      },
      promise: {
        then(onFulfilled, onRejected) {
          success = onFulfilled;
          error = onRejected;
        }
      }
    };
  }
};

// Q.all([]);
