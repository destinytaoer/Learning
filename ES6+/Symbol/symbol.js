/*
  ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。是 JavaScript 的第七种数据类型。

  Symbol 的出现在于：ES5 对象属性只能是字符串，容易造成属性冲突，需要一种机制能保证每一种属性都是独一无二的，从根本上解决属性名的冲突。

  因此，现在对象的属性名可以是两种类型：字符串和 Symbol
*/
/* 1. Symbol 类型由 Symbol 函数直接创建，注意不需要 new，使用 new 会报错 */
// let s = Symbol();
// console.log(typeof s); //=> symbol

/* 2. Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。 */
// let s = Symbol('aa');
// console.log(s); //=> Symbol(aa)
// console.log(s.toString()); //=> Symbol(aa)
// 如果传入的参数是对象，那么会调用对象的 toString 方法转化为字符串
// let obj = {};
// let s = Symbol(obj);
// console.log(s); //=> Symbol([object Object])

/* 3. 无论带不带参数，参数是否相同，每一次创建的 Symbol 值都是独一无二的 */
// 不带参数
// let s1 = Symbol();
// let s2 = Symbol();
// console.log(s1 === s2, s1 == s2); //=> false false
// 带参数
// let s1 = Symbol('foo');
// let s2 = Symbol('foo');
// console.log(s1 === s2, s1 == s2); //=> false false

/* 4. Symbol 可以转化为字符串和布尔值 */
// let s = Symbol('a');
// console.log(String(s)); //=> 'Symbol(a)'
// console.log(s.toString()); //=> 'Symbol(a)'
// console.log(Boolean(s)); //=> true, 都会转化为 true
// console.log(!s); //=> false

/* 5. 获取 Symbol 的描述 */
// 由于需要获取 Symbol 的描述需要手动转化为字符串进行截取，不方便操作，于是 ES2019 为 Symbol 实例添加了一个 description 属性
let s = Symbol('s');
console.log(s.description); // 尝试 Node 暂不支持，但是浏览器中可以打印出来