/* 1. 解构 */
// let a = {
//   name: "destiny",
//   age: 24
// };
// let { name, age } = a;
// console.log(name, age); //=> destiny 24

/* 2. 属性简写 */
// 在以字面量形式给对象属性赋值时，当变量名与属性名一致时，可以简写
// let b = "taoer";
// let c = { b };
//=> let c = { b: b };
// console.log(c.b); //=> taoer

// 对象方法的简写
// let d = {
//   method: function () {
//     //...
//   }
// }
// let d1 = {
//   method() {
//     //...
//   }
// }

/* 3. 属性名表达式 */
// 对象的赋值有两种方法
// let a = {};
// a.b = '1'; // 点操作符
// a['c'] = '2'; // 方括号语法

// 但是在 ES5 中，使用字面量定义对象时，只能有一种写法
// let b = {
//   a: 1
// };

// ES6 也提供了方括号语法来进行定义
// let propKey = 'foo';

// let obj = {
//   [propKey]: true,
//   ['a' + 'bc']: 123
// };
// console.log(obj.foo); //=> true
// console.log(obj.abc); //=> 123
// 注意其值仍然会被转化为字符串。
// let obj1 = {
//   [obj]: 1
// }
// console.log(obj1); //=> { '[object Object]': 1 }

/* 4. 方法的 name 属性 */
// 函数具有 name 属性，对象的方法也是函数
// let obj = {
//   fn() {

//   }
// };
// console.log(obj.fn.name); //=> fn

// 如果对象的方法使用了 get set，则 name 属性不是在该方法上面，而是该方法的属性的描述对象的 get 和 set 属性上面，返回值是方法名前加上 get 和 set。
// const obj = {
//   get foo() {},
//   set foo(x) {}
// };

// obj.foo.name
// TypeError: Cannot read property 'name' of undefined

// const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');

// console.log(descriptor.get.name);//=> get foo
// console.log(descriptor.set.name); //=> set foo

// bind方法创造的函数，name 属性返回 bound 加上原函数的名字；Function 构造函数创造的函数，name 属性返回 anonymous。

// (new Function()).name // "anonymous"

// var doSomething = function() {
//   // ...
// };
// doSomething.bind().name // bound doSomething

// 如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
// const key1 = Symbol('description');
// const key2 = Symbol();
// let obj = {
//   [key1]() {},
//   [key2]() {},
// };
// console.log(obj[key1].name); //=> [description]
// console.log(obj[key2].name);//=> ""

/* 5. super 关键字 */
// this关键字总是指向函数所在的当前对象，super 关键字，指向当前对象的原型对象。
// const proto = {
//   foo: 'hello'
// };

// const obj = {
//   foo: 'world',
//   find() {
//     return super.foo;
//   }
// };

// Object.setPrototypeOf(obj, proto);
// console.log(obj.find()); //=> hello

// super 关键字表示原型对象时，只能用在对象的方法之中，用在其他地方都会报错。目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法，其他定义方法中使用 super 都会报错

/* 6. ...操作符 */
let obj = {
  a: 1,
  b: 2
};
console.log({ ...obj, c: 3 }); //=> { a: 1, b: 2, c: 3 }

