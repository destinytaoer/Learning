// 遍历算法
const fs = require('fs');
const path = require('path');

// 同步深度优先 + 先序遍历
function deepSync(dir) {
  console.log(dir);
  let files = fs.readdirSync(dir);
  files.forEach(file => {
    let curPath = path.join(dir, file);
    let stat = fs.statSync(curPath);
    if (stat.isDirectory()) {
      deepSync(curPath);
    } else {
      console.log(curPath);
    }
  });
}
// deepSync('a');

// 异步深度优先 + 先序遍历
function deep(dir, callback) {
  console.log(dir);

  fs.stat(dir, (err, stat) => {
    if (stat.isDirectory()) {
      fs.readdir(dir, (err, files) => {
        !(function next(i) {
          if (i >= files.length) {
            callback && callback();
            return;
          }
          let curPath = path.join(dir, files[i]);
          deep(curPath, () => {
            next(i + 1);
          });
        })(0);
      });
    } else {
      callback();
    }
  });
}
// deep('a', () => {
//   console.log('done');
// });

// 同步广度优先 + 先序遍历
function wideSync(dir) {
  let arr = [dir]; // 队列
  while (arr.length > 0) {
    let cur = arr.shift(); // 取最前面的一个
    console.log(cur);
    let stat = fs.statSync(cur);
    if (stat.isDirectory()) {
      let files = fs.readdirSync(cur);
      files.forEach(file => {
        arr.push(path.join(cur, file));
      });
    }
  }
}
// wideSync('a');

// 异步广度优先 + 先序遍历
function wide(dir, callback) {
  let arr = [dir];

  !(function next(i) {
    if (i === arr.length) {
      callback && callback();
      return;
    }
    let cur = arr[i];
    console.log(cur);

    fs.stat(cur, function(err, stat) {
      if (stat.isDirectory()) {
        fs.readdir(cur, function(err, files) {
          files.forEach(file => {
            arr.push(path.join(cur, file));
          });
          next(i + 1);
        });
      } else {
        next(i + 1);
      }
    });
  })(0);
}
wide('a');
