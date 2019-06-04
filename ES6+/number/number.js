/* 1. Number.isFinite, Number.isNaN */
// Number.isFinite 用于判断一个数组是否有限
// Number.isFinite(1); //=> true
// Number.isFinite(Infinity); //=> false
// Number.isFinite(-Infinity); //=> false

// 只要不是数值，都返回 false
// Number.isFinite('1'); //=> false
// Number.isFinite('sdf'); //=> false
// Number.isFinite(true); //=> false

// // Number.isNaN 用于判断一个值是否是 NaN
// Number.isNaN(NaN); //=> true
// Number.isNaN(15); //=> false
// Number.isNaN('15'); //=> false
// Number.isNaN(true); //=> false
// Number.isNaN(9 / NaN); //=> true
// Number.isNaN('true' / 0); //=> true
// Number.isNaN('true' / 'true'); //=> true

// 与传统的全局方法：isFinite 和 isNaN 相比，其不进行数值的转换

/* 2. Number.parseFloat Number.parseInt */
// ES6 将全局方法 parseInt 和 parseFloat，移植到 Number 对象上面，行为完全保持不变。

/* 3. Number.isInteger 用来判断一个数值是否为整数 */
Number.isInteger(25) // true
Number.isInteger(25.1) // false

// JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。
Number.isInteger(25) // true
Number.isInteger(25.0) // true

// 如果参数不是数值，Number.isInteger 返回 false。
Number.isInteger() // false
Number.isInteger(null) // false
Number.isInteger('15') // false
Number.isInteger(true) // false

// 注意，由于 JavaScript 采用 IEEE 754 标准，数值存储为64位双精度格式，数值精度最多可以达到 53 个二进制位（1 个隐藏位与 52 个有效位）。如果数值的精度超过这个限度，第54位及后面的位就会被丢弃，这种情况下，Number.isInteger可能会误判。
Number.isInteger(3.0000000000000002) // true

// 在要求精度高时，不应该使用这个方法

/* 4. Number.EPSILON 一个极小的常量，表示 1 与大于 1 的最小浮点数之间的差 */
Number.EPSILON === Math.pow(2, -52); //=> true

// 引入这个最小量的目的，在于为浮点数设置一个误差范围

/* 6. 安全整数 和 Number.isSafeInteger */
// JavaScript 能够表达的整数范围为 -2^52 到 2^52 之间，超过这个范围则无法精确表示
// ES6 引入了 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 表示这个范围的上下限
// 而 Number.isSafeInterger 就用来判断这个值是不是在这个范围内
Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1); // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER); // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER); // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1); // false