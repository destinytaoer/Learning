/* 1. Math.trunc 去除小数部分 */
console.log(Math.trunc(4.1)); //=> 4
console.log(Math.trunc(4.9)); //=> 4
console.log(Math.trunc(-4.1)); //=> 4
console.log(Math.trunc(-4.9)); //=> 4

// ES5 模拟
Math.trunc = Math.trunc || function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};

/* 2. Math.sign 判断一个数的符号 */
/* 
- 参数为正数，返回 +1
- 参数为负数，返回 -1
- 参数为 0，返回 0
- 参数为 -0，返回 -0
- 其他值，返回 NaN
*/
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN

/* 3. Math.cbrt 计算一个数的立方根 */
Math.cbrt(-1); //=> -1
Math.cbrt(2); //=> 1.2599210498948734
// 非数值会先转换为数值

/* 4. 指数运算符 ** */
console.log(2 ** 2);//=> 4
// 它是右结合的，下面代码相当于 2 ** (3 ** 2)
console.log(2 ** 3 ** 2); //=> 512

// V8 引擎的指数运算符与Math.pow的实现不相同，对于特别大的运算结果，两者会有细微的差异。
console.log(Math.pow(99, 99)); //=> 3.697296376497263e+197

console.log(99 ** 99); //=> 3.697296376497268e+197
