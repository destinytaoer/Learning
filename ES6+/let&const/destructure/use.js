/* 用途 */
/* 1. 函数参数的解构 */
// function add([x, y]){
//   return x + y;
// }

// add([1, 2]); //=> 3

// 一般用于对象配置，可以减少函数开始时的大量赋值操作
// function add({a, b}){
//   return a + b;
// }
// let options = {
//   a: 1,
//   b: 2
// }
// add(options); //=> 3

// 参数解构时的默认值
// 第一个默认值是，没有传参时的默认值为 {}，然后再解构，传了参，就会对传入的参数进行解构，解构失败才会使用默认值
// function move({x = 0, y = 0} = {}) {
//   return [x, y];
// }

// move({x: 3, y: 8}); //=> [3, 8]
// move({x: 3}); //=> [3, 0]
// move({}); //=> [0, 0]
// move(); //=> [0, 0]

// 注意，下面的写法会得到不一样的结果。
// 这里只设置了没有传参的默认值，而没有设置解构的默认值
// function move({x, y} = { x: 0, y: 0 }) {
//   return [x, y];
// }

// move({x: 3, y: 8}); //=> [3, 8]
// move({x: 3}); //=> [3, undefined]
// move({}); //=> [undefined, undefined]
// move(); //=> [0, 0]

/* 2. 交换变量的值 */
// let a = 1;
// let b = 2;
// [a, b] = [b, a];
// console.log(a, b); //=> 2 1

/* 3. 从函数返回多个值 */
// function  a() {
//   return [1, 2, 3];
// }
// let [b, c, d] = a();
// console.log(b, c, d); //=> 1 2 3

/* 4. 遍历 Map 结构 */
// const map = new Map();
// map.set("first", "hello");
// map.set("second", "world");
// for (let [key, value] of map) {
//   console.log(key, value); //=> first hello second world
// }
// // 获取键名
// for (let [key] of map) {
//   // ...
// }
// // 获取键值
// for (let [,value] of map) {
//   // ...
// }

/* 5. 输入模块的指定方法 */
// 加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。 
// import { Component } from 'react'
