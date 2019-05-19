/* ES6 中数组主要变化是：拓展运算符、增加了几个方法 */

/* 1. 拓展运算符 */
// console.log(...[1, 2, 3]);//1 2 3

// 替代函数的 apply 方法
// ES5 的写法
// Math.max.apply(null, [14, 3, 77])
// ES6 的写法
// Math.max(...[14, 3, 77])

// 数组克隆
// let a = [1, 2, 3];
// ES5
// let a1 = a.concat();
// let a2 = a.slice();
// let [...a1] = a;
// // 或者
// let a2 = [...a];

// 数组合并
// let a1 = [1, 2, 3];
// let a2 = [3, 5];
// console.log(a1.concat(a2));//=> [1, 2, 3, 3, 5]
// console.log([...a1, ...a2]);//=> [1, 2, 3, 3, 5]

// 剩余操作符
// let a = [1, 2, 3, 4];
// let [a1, ...a2] = a;
// console.log(a1, a2); //=> 1 [2, 3, 4]

// 字符串转化为数组
// console.log([...'hello']); //=> [ "h", "e", "l", "l", "o" ]
// 还有一个重要的好处，那就是能够正确识别四个字节的 Unicode 字符。
// 'x\uD83D\uDE80y'.length; // 4
// [...'x\uD83D\uDE80y'].length; // 3
// 因此可以定义一个正确获取长度的函数
// function length(str) {
//   return [...str].length;
// }
// 实际上，任何定义了 Iterator 接口的对象都可以使用 拓展运算符转化为数组
// let nodeList = document.querySelectorAll('div');
// let array = [...nodeList];

/* 2. Array.from 将类数组对象（array-like object）和可遍历（iterable）的对象转换为数组 */
// 类数组，本质特征只有一点，即必须有 length 属性。因此，任何有 length 属性的对象，都可以通过 Array.from 方法转为数组
// let arrLike = {
//   0: 'a',
//   1: 'b',
//   length: 2
// }
// ES5 写法
// console.log([].slice.call(arrLike)); // ['a', 'b']
// ES6 写法
// console.log(Array.from(arrLike)); //=> ['a', 'b']

// Iterator
// console.log(Array.from('hello')); //=> ['h', 'e', 'l', 'l', 'o']

// Array.from 还可以接受第二个参数，作用类似于数组的 map 方法，用来对每个元素进行处理，将处理后的值放入返回的数组
// Array.from(arrayLike, x => x * x);
// 等同于
// Array.from(arrayLike).map(x => x * x);

// 如果第二个参数里面用到了 this 关键字，还可以传入 Array.from 的第三个参数，用来绑定this。

/* 3. Array.of 用于将一组值，转换为数组。其主要目的，是弥补数组构造函数 Array() 的不足。因为参数个数的不同，会导致 Array() 的行为有差异。 */

// Array.of(3, 11, 8) // [3,11,8]
// Array.of(3) // [3]
// Array.of(3).length // 1

/* 
  4. copyWithin 数将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。会修改当前数组。

  Array.prototype.copyWithin(target, start = 0, end = this.length)
    - target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
    - start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
    - end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。
*/

// [1, 2, 3, 4, 5].copyWithin(0, 3) //=> [4, 5, 3, 4, 5]

/* 
  5. find & findIndex 用于找出第一个符合条件的数组成员。
  它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
*/

// [1, 4, -5, 10].find((n) => n < 0); //=> -5

// 都可以接受第二个参数，用来绑定回调函数的this对象。
// function f(v){
//   return v > this.age;
// }
// let person = {name: 'John', age: 20};
// [10, 12, 26, 15].find(f, person);

// 这两个方法都可以借助 Object.is 方法发现 NaN，弥补了数组的 indexOf 方法的不足
// [NaN].indexOf(NaN)
// -1

// [NaN].findIndex(y => Object.is(NaN, y))
// 0

/* 6. fill 使用给定值，填充整个数组 */
// ['a', 'b', 'c'].fill(7); //=> [7, 7, 7] 会抹去已有元素

// 可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
// ['a', 'b', 'c'].fill(7, 1, 2); //=> ['a', 7, 'c']

/*
 7. entries & keys & values 遍历数组
 都返回一个遍历器对象，可以用 for...of 循环进行遍历，唯一的区别是 keys 是对键名的遍历、values 是对键值的遍历，entries 是对键值对的遍历。
*/
// 实际上，数组本身就具有 Iterator 接口，可以使用 for...of 遍历
// 也可以直接使用 forEach 进行遍历更加方便，个人觉得没有太大存在的必要
// let arr = [0, 1, 2, 3];
// for (let val of arr) {
//   console.log(val); // 0, 1, 2, 3
// }

// for (let index of ['a', 'b'].keys()) {
//   console.log(index); //=> 0, 1
// }

// for (let elem of ['a', 'b'].values()) {
//   console.log(elem); //=> a, b
// }

// for (let [index, elem] of ['a', 'b'].entries()) {
//   console.log(index, elem); //=> 0 a, 1 b
// }

/*
  8. includes 判断数组是否存在给定值
  第一个参数是要查找的值，第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从 0 开始。
  
  与 find & findIndex 相区别：、
    - 这两个方法都是传入回调函数而不是一个值
    - find 返回找到的成员
    - findIndex 返回找到的位置

  而 includes 返回的是布尔值，表示是否存在。实际上三者都可以用于判断，但 includes 更加方便并且专业用于判断某个值，而且它可以直接判断 NaN 的存在
*/
// if ([0, 1].includes(0)) {
//   //=> true
// }

/* 
  9. flat & flatMap ES10 的方法 用于数组降维或者说扁平化
  
  返回一个数组，不会改变原有数组
*/
// flat 第一个参数是指降维的层数，默认为 1 
// [1, 2, [3, 4]].flat(); //=> [1, 2, 3, 4]
// [1, 2, [3, [4, 5]]].flat(); //=> [1, 2, 3, [4, 5]]
// [1, 2, [3, [4, 5]]].flat(2); //=> [1, 2, 3, 4, 5]

// 如果不管有多少层嵌套，都要转成一维数组，可以用 Infinity 关键字作为参数。
// [1, [2, [3]]].flat(Infinity); //=> [1, 2, 3]

// 如果原数组有空位，flat()方法会跳过空位。
// [1, 2, , 4, 5].flat(); //=> [1, 2, 4, 5]

// flatMap 则先对原数组的每个成员执行一个函数（相当于 map），然后对返回的数组执行 flat。注意先后顺序。
// [2, 3, 4].flatMap((x) => [x, x * 2]); //=> [2, 4, 3, 6, 4, 8]

// flatMap 只能展开一层数组
// [1, 2, 3, 4].flatMap(x => [[x * 2]]); //=> [[2], [4], [6], [8]]

// flatMap 接受第二个参数指定遍历函数中的this
// 遍历函数接受三个参数：value index array，与 map 一致
// arr.flatMap(function callback(currentValue[, index[, array]]) {
//   // ...
// }[, thisArg])

/* 10. 数组的空位 空位的处理规则非常不统一，建议避免出现空位。*/
// 数组的空位指，数组的某一个位置没有任何值。
// Array(3) //=> [, , ,]

// 空位不是 undefined，一个位置的值等于 undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。
// 0 in [undefined, undefined, undefined]; //=> true
// 0 in [, , ,]; //=> false

/* 
  ES5 对空位的处理，已经很不一致了，大多数情况下会忽略空位。

  - forEach, filter, reduce, every 和 some 都会跳过空位。
  - map 会跳过空位，但会保留这个值
  - join 和 toString 会将空位视为 undefined，而 undefined 和 null 会被处理成空字符串
*/
// forEach方法
// [,'a'].forEach((x,i) => console.log(i)); //=> 1

// filter方法
// ['a',,'b'].filter(x => true); //=> ['a','b']

// every方法
// [, 'a'].every(x => x === 'a'); //=> true

// reduce方法
// [1, , 2].reduce((x, y) => x + y); //=> 3

// some方法
// [, 'a'].some(x => x !== 'a'); //=> false

// map方法
// [, 'a'].map(x => 1); //=> [,1]

// join方法
// [, 'a', undefined, null].join('#'); //=> "#a##"

// toString方法
// [, 'a', undefined, null].toString(); //=> ",a,,"

/* ES6 则是明确将空位转为 undefined */
// Array.from 方法会将数组的空位，转为 undefined，不会忽略空位。
Array.from(['a', , 'b']);//=> [ "a", undefined, "b" ]

// 扩展运算符（...）也会将空位转为 undefined

[...['a', , 'b']]; //=> [ "a", undefined, "b" ]

// copyWithin 会连空位一起拷贝

// [, 'a', 'b', ,].copyWithin(2, 0); //=> [,"a",,"a"]

// fill 会将空位视为正常的数组位置
// new Array(3).fill('a'); //=> ["a","a","a"]

// for...of 循环也会遍历空位
// let arr = [, ,];
// for (let i of arr) {
//   console.log(1); //=> 1, 1
// }

// entries、keys、values、find 和 findIndex 会将空位处理成 undefined。
// [...[, 'a'].entries()]; //=> [[0,undefined], [1,"a"]]
// [...[, 'a'].keys()]; //=> [0,1]
// [...[, 'a'].values()]; //=> [undefined,"a"]
// [, 'a'].find(x => true); //=> undefined
// [, 'a'].findIndex(x => true); //=> 0


