/* 1. 不存在变量提升 */
// console.log(a); //=> 报错，a is not defined
// let a = 1;

/* 2. 不能重复声明 */
// let a;
// let a; //=> 报错，Identifier 'a' has already been declared

/* 3. 块级作用域*/
// if (true) {
//   let a = 1;
// }
// console.log(a); //=> 报错，a is not defined

// function 在 ES6 中，
// function f() {
//   console.log('I am outside!');
// }

// (function () {
//   if (false) {
//     // 在块级作用域中的函数，只会提升声明，而不会赋值
//     function f() {
//       console.log('I am inside!');
//     }
//   }

//   f(); //=> 报错，f is not a function
// }());

//=> 相当于
// (function () {
//   var f = undefined;
//   if (false) {
//     function f() {
//       console.log('I am inside!');
//     }
//   }

//   f();
// }());

// 应该避免在块级作用域内声明函数。如果确实需要，也应该写成函数表达式，而不是函数声明语句。

// ES6 的块级作用域必须有大括号，如果没有大括号，JavaScript 引擎就认为不存在块级作用域。
// if (true) let x = 1; //=> 报错，Lexical declaration cannot appear in a single-statement context
// 函数声明也是如此，严格模式下，函数只能声明在当前作用域的顶层。

/* 4. 暂时性死区 */

// 意思是，在这个块级作用域中使用了 let 或 const 声明了变量，那么其前面就成为了那些变量的死区，在声明之前使用变量就会报错

/* 5. const 一旦声明必须立即初始化，不能留到以后赋值 */
// const a; //=> 报错，Missing initializer in const declaration

/* 6. const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。 */

// const foo = {};
// foo.prop = 123; //=> 不报错
// foo.prop //=> 123
// foo = {}; //=> 将 foo 指向另一个对象，就会报错，"foo" is read-only