/* 字符串新增了一些实用的方法 */

// for of 遍历，最大的优点是可以识别大于 0xFFFF 的码点
// let text = String.fromCodePoint(0x20BB7);

// for (let i of text) {
//   console.log(i);
// }
//=> "𠮷"

/* 
传统上，JavaScript 只有 indexOf 方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6 又提供了三种新方法。

includes：返回布尔值，表示是否找到了参数字符串。
startsWith：返回布尔值，表示参数字符串是否在原字符串的头部。
endsWith：返回布尔值，表示参数字符串是否在原字符串的尾部。
*/
// let s = 'Hello world!';

// s.startsWith('Hello') // true
// s.endsWith('!') // true
// s.includes('o') // true

// 都支持第二个参数，表示开始搜索的位置。
// let s1 = 'Hello world!';

// s1.startsWith('world', 6) // true
// s1.endsWith('Hello', 5) // true
// s1.includes('Hello', 6) // false

/* repeat 将某个字符串重复 n 遍 */
console.log('x'.repeat(0))//=> ""
console.log('x'.repeat(2))//=> "xx"
console.log('x'.repeat(NaN))//=> "" NaN 被当做 0 来看待

// 参数为负数或者 Infinite 会报错，但是 0 ~ -1 之间的小数会被取整为 0

console.log('x'.repeat(-0.9)) //=> ""

// 也就是说，参数会先进行取整操作，如果是字符串，则会先转换成数字。

console.log('x'.repeat(0.9)) //=> ""
console.log('x'.repeat('1')) //=> "x"

/* 补足长度，如果某个字符串不够指定长度，会在头部或尾部补全。padStart 用于头部补全，padEnd 用于尾部补全。 */
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

// 第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串，补全字符串是可选的，默认为空格

// 如果原字符串的长度，等于或大于最大长度，则字符串补全不生效，返回原字符串。
'xxx'.padStart(2, 'ab') // 'xxx'

// 如果用来补全的字符串与原字符串，两者的长度之和超过了最大长度，则会截去超出位数的补全字符串。

'abc'.padStart(10, '0123456789') //=> '0123456abc'

/* 
去掉空格
ES2019 新增了 trimStart 和 trimEnd。与 trim()一致，trimStart消除字符串头部的空格，trimEnd消除尾部的空格。
*/

const s = '  abc  ';

console.log(s.trim()) // "abc"
// Node 测试暂不支持，毕竟是 ES2019
s.trimStart() // "abc  "
s.trimEnd() // "  abc"

// 除了空格键，这两个方法对字符串头部（或尾部）的 tab 键、换行符等不可见的空白符号也有效。浏览器还部署了额外的两个方法，trimLeft 是trimStart 的别名，trimRight 是trimEnd 的别名。

/* 匹配正则 matchAll，返回一个正则表达式在当前字符串的所有匹配 */
