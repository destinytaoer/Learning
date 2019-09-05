/**
 * 作用
 * 1. 可以用来校验要下载的文件是否被改动过
 * 2. 对密码进行加密
 */

let crypto = require('crypto');
let str = 'hello';
// console.log(crypto.getHashes()); // 获取拥有的哈希算法
let md5 = crypto.createHash('md5');
md5.update(str); // 添加要加密的值
md5.update(str); // 再次添加要加密的值
console.log(md5.digest('hex')); // 输出 md5 值，指定输出的格式
// 23b431acfeb41e15d466d75de822307c  输出32位

let sha1 = crypto.createHash('sha1');
sha1.update(str); // 添加要加密的值
sha1.update(str); // 再次添加要加密的值
console.log(sha1.digest('hex')); // 输出 sha1 值，指定输出的格式
// 0b156215b189103c3d268f61299a854cd0b31e70 输出40位
