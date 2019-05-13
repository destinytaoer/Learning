/* 
  对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们。
  for of 会在遍历器返回的值中的 done 属性为 true 时，结束遍历
*/
// let arr = ["a", "b", "c"];
// for (let value of arr) {
//   console.log(value); //=> a, b, c
// }

// 相当于一个 while 循环
// var $iterator = ITERABLE[Symbol.iterator]();
// var $result = $iterator.next();
// while (!$result.done) {
//   var x = $result.value;
//   // ...
//   $result = $iterator.next();
// }

/* 
  一个对象如果要具备可被for...of循环调用的 Iterator 接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）
*/
// class RangeIterator {
//   constructor(start, stop) {
//     this.value = start;
//     this.stop = stop;
//   }

//   [Symbol.iterator]() {
//     return this;
//   }

//   next() {
//     var value = this.value;
//     if (value < this.stop) {
//       this.value++;
//       return { done: false, value: value };
//     }
//     return { done: true, value: undefined };
//   }
// }

// function range(start, stop) {
//   return new RangeIterator(start, stop);
// }

// for (var value of range(0, 3)) {
//   console.log(value); //=> 0, 1, 2
// }

/* 类数组对象，可以直接引用数组的 iterator 接口来快速部署 Iterator 接口 */
// let iterable = {
//   0: "a",
//   1: "b",
//   2: "c",
//   length: 3,
//   [Symbol.iterator]: Array.prototype[Symbol.iterator]
// };
// for (let item of iterable) {
//   console.log(item); //=> 'a', 'b', 'c'
// }

/* for...of 循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。 */
// let arr = [1, 2, 3];
// arr.foo = 4;
// for (let value of arr) {
//   console.log(value); //=> 1, 2, 3
// }

/*
  除 for of 以外，还有下面场景会使用遍历器，会默认调用 Symbol.iterator 方法。
    - 解构赋值
    - 拓展运算符
    - yield*
    - Array.from()
    - Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
    - Promise.all()
    - Promise.race()
*/

/*
  Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用 for...of 循环
  值得注意的地方有两个：
  首先，遍历的顺序是按照各个成员被添加进数据结构的顺序。
  其次，Set 结构遍历时，返回的是一个值，而 Map 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值。
*/
// var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
// for (var e of engines) {
//   console.log(e);// Gecko, Trident, Webkit
// }

// var es6 = new Map();
// es6.set("edition", 6);
// es6.set("committee", "TC39");
// es6.set("standard", "ECMA-262");
// for (var [name, value] of es6) {
//   console.log(name + ": " + value);
// }

// let map = new Map().set("a", 1).set("b", 2);
// for (let pair of map) {
//   console.log(pair); // ['a', 1], ['b', 2]
// }

// for (let [key, value] of map) {
//   console.log(key + " : " + value); // a: 1, b: 2
// }

let arr = [1, 2, 3]
console.log(arr.entries());
