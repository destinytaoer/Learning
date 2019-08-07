/**
 * 以前 JS 只需要处理字符即可，但是在 node 中处理后台就需要处理二进制文件，比如图片
 */

// let a = 0b10100; // 二进制
// console.log(a); // 20
// let b = 0o24; // 八进制
// console.log(b); // 20
// let c = 0x14; // 十六进制
// console.log(c); // 20
// let d = 20; // 十进制
// console.log(d); // 20
// // 四个值都相等

// // 十进制转换为任意进制
// console.log(d.toString(2)); // '10100'
// console.log(d.toString(8)); // '24'
// console.log(d.toString(16)); // '14'

// // 任意进制转换为十进制
// console.log(parseInt('10100', 2)); // 20
// console.log(parseInt('24', 8)); // 20
// console.log(parseInt('14', 16)); // 20

/**
 * 1.如何把一个unicode码转成utf8编码
 * 传进去一个unicode码，返回一个utf8编码 万 4E07
 * Unicode符号范围     |        UTF-8编码方式
 (十六进制)        |              （二进制）
 ----------------------+---------------------------------------------
 0000 0000-0000 007F | 0xxxxxxx
 0000 0080-0000 07FF | 110xxxxx 10xxxxxx
 0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
 0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
 **/
let e = (0x4e07).toString(2);
console.log(e); // 100 111000 000111
// 0x4e07 在第三个范围中，所以填入 1110xxxx 10xxxxxx 10xxxxxx
// 由后往前填 100 111000 000111
// 1110xxxx 10xxxxxx 10000111 剩下 100 111000
// 1110xxxx 10111000 10000111 剩下 100
// 1110x100 10111000 10000111
// 用 0 补齐
// 11100100 10111000 10000111
console.log((0b11100100).toString(16)); // e4
console.log((0b10111000).toString(16)); // b8
console.log((0b10000111).toString(16)); // 87
// 这就转换成了 UTF-8 表示法 0xe4b887
console.log(Buffer.from('万')); // <Buffer e4 b8 87>
// buffer 使用 UTF-8 编码

// UTF-8 是 Unicode 的一种计算机存储形式，是一种实现
// 第三个范围，三个字节中文的转换
function transfer(number) {
  let arr = ['1110', '10', '10'];
  // 转成 二进制
  let str = number.toString(2);
  arr[2] += str.slice(-6);
  arr[1] += str.slice(-12, -6);
  arr[0] += str.slice(0, -12).padStart(4, '0');
  return arr.map(item => parseInt(item, 2).toString(16)).join('');
}
console.log(transfer(0x4e07));
