/*
  遍历器（Iterator）是一种机制，它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作。
  Iterator 的作用有三个：
  一是为各种数据结构，提供一个统一的、简便的访问接口；
  二是使得数据结构的成员能够按某种次序排列；
  三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

  Iterator 的遍历过程：
  （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
  （2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
  （3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
  （4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。
*/

// makeIterator 就是一个遍历器
// function makeIterator(array) {
//   var nextIndex = 0;
//   return {
//     next: function() {
//       return nextIndex < array.length
//         ? { value: array[nextIndex++], done: false }
//         : { value: undefined, done: true };
//     }
//   };
// }
// var it = makeIterator(["a", "b"]);
// 通过 next 不断获取下一个值，这个值是一个对象，包含 value, done 两个属性，如果 done 为 false，可以省略，如果 value 为 undefined，也可以省略
// it.next(); // { value: "a", done: false }
// it.next(); // { value: "b", done: false }
// it.next(); // { value: undefined, done: true }

/* 
由于 Iterator 只是把接口规格加到数据结构之上，所以，遍历器与它所遍历的那个数据结构，实际上是分开的，完全可以写出没有对应数据结构的遍历器对象，或者说用遍历器对象模拟出数据结构。
*/
// function idMaker() {
//   var index = 0;

//   return {
//     next: function() {
//       return { value: index++, done: false };
//     }
//   };
// }
// var it = idMaker();

// it.next().value; // 0
// it.next().value; // 1
// it.next().value; // 2
// ...

/* 
一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。

ES6 默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是 iterable）

Symbol.iterator 返回 Symbol 对象的 iterator 属性，这是一个预定义好的、类型为 Symbol 的特殊值
*/
// 此时 obj 就是可遍历的，
// const obj = {
//   [Symbol.iterator]: function() {
//     return {
//       next: function() {
//         return {
//           value: 1,
//           done: true
//         };
//       }
//     };
//   }
// };
// let it = obj[Symbol.iterator]();
// it.next(); //=> { value: 1, done: true }
// it.next(); //=> { value: 1, done: true }

/* 
  原生具备 Iterator 接口的数据结构如下。
  - Array
  - Map
  - Set
  - String
  - TypedArray
  - 函数的 arguments 对象
  - NodeList 对象
*/
// let arr = ['a', 'b', 'c'];
// let iter = arr[Symbol.iterator]();
// iter.next(); //=> { value: 'a', done: false }
// iter.next(); //=> { value: 'b', done: false }
// iter.next(); //=> { value: 'c', done: false }
// iter.next(); //=> { value: undefined, done: true }

/* 如果 Symbol.iterator 方法对应的不是遍历器生成函数（即会返回一个遍历器对象），解释引擎将会报错。 */
// var obj = {};
// obj[Symbol.iterator] = () => 1;
// [...obj] //=> TypeError: [] is not a function

/* 部署 Symbol 最简单的实现，就是使用 Generator 函数 */
// let myIterable = {
//   [Symbol.iterator]: function* () {
//     yield 1;
//     yield 2;
//     yield 3;
//   }
// };
// 或者这样写
// let obj = {
//   *[Symbol.iterator]() {
//     yield "hello";
//     yield "world";
//   }
// };
// [...myIterable] // [1, 2, 3]

/* Iteraor 遍历器中除了必须有 next 方法外，还可以有 return 和 throw */
// 情况一
// for (let line of readLinesSync(fileName)) {
//   console.log(line);
//   break;
// }

// 情况二
// for (let line of readLinesSync(fileName)) {
//   console.log(line);
//   throw new Error();
// }
// 在上面两种情况下，会调用 return 方法，return 方法也必须返回一个对象
function aa() {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { value: '1', done: false };
        },
        return() {
          console.log('return');
          return { done: true };
        }
      };
    }
  };
}
for (let value of aa()) {
  console.log(value);
  break;
} //=> 1, return
