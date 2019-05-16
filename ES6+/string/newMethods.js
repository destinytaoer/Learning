/* 字符串新增了一些实用的方法 */

// for of 遍历，最大的优点是可以识别大于 0xFFFF 的码点
let text = String.fromCodePoint(0x20BB7);

for (let i of text) {
  console.log(i);
}
//=> "𠮷"

/* 
传统上，JavaScript 只有 indexOf 方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

includes：返回布尔值，表示是否找到了参数字符串。
startsWith：返回布尔值，表示参数字符串是否在原字符串的头部。
endsWith：返回布尔值，表示参数字符串是否在原字符串的尾部。
*/
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

// 都支持第二个参数，表示开始搜索的位置。
let s1 = 'Hello world!';

s1.startsWith('world', 6) // true
s1.endsWith('Hello', 5) // true
s1.includes('Hello', 6) // false