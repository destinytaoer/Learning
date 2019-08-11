const path = require('path');

// 从当前目录出发，解析出一个绝对路径
// .. 代表上一级目录
// . 代表当前目录
// 字符串 a 表示当前目录下的目录 a 或者文件 a
console.log(path.resolve('a.txt'));
console.log(path.resolve('../..', 'a')); // => e:\a
