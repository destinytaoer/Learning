/* 1. Object.is 对比两个值是否相等 */
// ES6 提出 Same-value equality（同值相等）算法，Object.is 就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
// Object.is('foo', 'foo'); //=> true
// Object.is({}, {}); //=> false

// 有两个不同之处
// console.log(+0 === -0); //=> true
// console.log(NaN === NaN); //=> false

// console.log(Object.is(+0, -0)); //=> false
// console.log(Object.is(NaN, NaN)); //=> true

// // ES5 兼容
// Object.defineProperty(Object, 'is', {
//   value: function(x, y) {
//     if (x === y) {
//       // 针对+0 不等于 -0的情况
//       return x !== 0 || 1 / x === 1 / y;
//     }
//     // 针对NaN的情况
//     return x !== x && y !== y;
//   },
//   configurable: true,
//   enumerable: false,
//   writable: true
// });


/* 2. Object.assign 对象的合并 */
// const target = { a: 1 };

// const source1 = { b: 2 };
// const source2 = { c: 3 };

// Object.assign(target, source1, source2);
// console.log(target); //=> {a:1, b:2, c:3}

// 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
// const target = { a: { b: 'c', d: 'e' } }
// const source = { a: { b: 'hello' } }
// Object.assign(target, source)
// console.log(target);//=> { a: { b: 'hello' } }

// 取值函数的处理，会取值之后再合并，而不会复制取值函数
// const source = {
//   get foo() { return 1 }
// };
// const target = {};

// Object.assign(target, source)
// console.log(target);//=> { foo: 1 }

// 用途
// 1. 将属性绑定到实例上
// class Ponit {
//   constructor(x, y) {
//     Object.assign(this, { x, y });
//   }
// }

// 2. 合并默认参数配置
// function person(options) {
//   var _default = {
//     name: 'destiny',
//     age: 24
//   };
//   options = Object.assign({}, _default, options);
// }

// 3. 为对象添加方法
// Object.assign(obj.prototype, {
//   someMethod() {
//     //...
//   }
// })

// 4. 克隆对象
// function clone(origin) {
//   return Object.assign({}, origin);
// }

/* 3. Object.getOwnPropertyDescriptor 获取指定对象所有自身属性的描述对象 */
// ES5 中有 Object.getOwnPropertyDescriptor 返回某个对象属性的描述对象
// let obj = {
//   foo: 123,
//   get bar() {
//     return 'abc';
//   }
// };
// console.log(Object.getOwnPropertyDescriptor(obj, 'foo'));
//=> { value: 123,
  // writable: true,
  // enumerable: true,
  // configurable: true }
// console.log(Object.getOwnPropertyDescriptors(obj));
/** 
 { 
    foo: { 
     value: 123,
     writable: true,
     enumerable: true,
     configurable: true
    },
    bar:{
      get: [Function: get bar],
      set: undefined,
      enumerable: true,
      configurable: true
    }
  }
 */

// 用途
// 1. 完成取值函数的拷贝，弥补 Object.assign 的不足
// const source = {
//   set foo(value) {
//     console.log(value);
//   }
// };

// const target2 = {};
// Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));

// const shallowMerge = (target, source) => Object.defineProperties(
//   target,
//   Object.getOwnPropertyDescriptors(source)
// );

// 2. 对象的克隆
// const shallowClone = (obj) => Object.create(
//   Object.getPrototypeOf(obj),
//   Object.getOwnPropertyDescriptors(obj)
// );

// 3. 继承
// ES5
// const obj = {
//   __proto__: prot,
//   foo: 123,
// };

// ES6
// const obj = Object.assign(
//   Object.create(prot),
//   {
//     foo: 123,
//   }
// );

// 4. 实现 Mixin（混入）模式
// let mix = (object) => ({
//   with: (...mixins) => mixins.reduce(
//     (c, mixin) => Object.create(
//       c, Object.getOwnPropertyDescriptors(mixin)
//     ), object)
// });

/* 4. __proto__, Object.setPrototypeOf, Object.getPrototypeOf */
// __proto__ 属性一直，没有被纳入标准，但是被几乎所有浏览器实现，所以 ES6 加入了它，但是写在附录中，只有浏览器实现才会有这个属性，其他环境没有，所以仍然不建议使用。
// 使用 Object.setPrototypeOf, Objet.getPrototypeOf, Object.create 代替

// Object.setPrototypeOf 用来设置一个对象的 prototype 对象，返回参数对象本身。它是 ES6 正式推荐的设置原型对象的方法。
// let proto = {};
// let obj = { x: 10 };
// Object.setPrototypeOf(obj, proto);

// proto.y = 20;
// proto.z = 40;

// obj.x // 10
// obj.y // 20
// obj.z // 40

// 如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。但是如果第一个参数是 null 或 undefined，则会报错

// Object.setPrototypeOf 用于读取一个对象的原型对象
// Object.getPrototypeOf(obj);
// 如果参数是 undefined 或 null，它们无法转为对象，所以会报错

// Object.create 是 ES5 的方法，用于创建新对象，并指定其原型对象和可枚举属性
// let newObj = Object.create(obj);
// console.log(newObj); //=> {}
// console.log(newObj.x); //=> 10
// console.log(newObj.y); //=> 20
// console.log(newObj.z); //=> 40

/* 5. 对象的遍历 Object.keys, Object.values, Object.entries */
let obj = {
  a: '1',
  b: '2'
}
// Object.keys, 获取对象属性组成的数组
console.log(Object.keys(obj)); //=> ['a', 'b']
// Object.values, 获取对象属性对应的值组成的数组
console.log(Object.values(obj)); //=> ['1', '2']
// Object.entries, 获取以 [key, value] 形式数组组成的二维数组
console.log(Object.entries(obj)); //=> [ [ 'a', '1' ], [ 'b', '2' ] ]

/* 6. Object.fromEntries 是 Object.entries 的逆操作，用于将一个键值对数组转为对象*/
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
]); //=> { foo: "bar", baz: 42 }

// 该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
]);

Object.fromEntries(entries)
// { foo: "bar", baz: 42 }

const map = new Map().set('foo', true).set('bar', false);
Object.fromEntries(map)
// { foo: true, bar: false }

// 该方法的一个用处是配合 URLSearchParams 对象，将查询字符串转为对象。
Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// { foo: "bar", baz: "qux" }
