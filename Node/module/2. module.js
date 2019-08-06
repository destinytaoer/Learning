let person = require('./1. module');
console.log(person);
console.log(__filename);
console.log(__dirname);
console.log(this === exports); // true
console.log(exports === module.exports); // true
console.log(require.cache === module.constructor._cache); // true
// console.log(require.main); // 入口模块
console.log(require.resolve('./1. module.js')); // 返回模块绝对路径，不加载模块
console.log(require.extensions);
console.log(module.paths);
