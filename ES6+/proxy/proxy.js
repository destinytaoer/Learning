/*
  Proxy 是 ES6 原生提供的构造函数，用来生成 Proxy 实例。
  Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
  
  new Proxy(target, handler);

  target 是拦截的目标对象，handler 也是一个对象，用来定制拦截行为
  
  与 Object.defineProperty 不同的是：
    - 代理能够拦截的操作较多
    - 代理会把所有属性都进行拦截
*/
// let proxy = new Proxy({}, {
//   get: function (target, key, receiver) {
//     // target 目标对象、key 当前访问的属性、receiver proxy 实例本身（严格地说，是操作行为所针对的对象）
//     return key;
//   }
// });
// console.log(proxy.time); // time
// console.log(proxy.name); // name
// console.log(proxy.title); // title

/*
  要使得 Proxy 起作用，必须针对 Proxy 实例进行操作，而不是针对目标对象进行操作
  但是实际上操作的仍然是同一个对象
*/
let target = {};
let proxy = new Proxy(target, {
  get(target, key) {
    console.log('get');
    return target[key];
  }
});
target.a; //=> 没有打印
proxy.a; //=> get
// 给 proxy 设置 a 属性，会自动反映到 target 中，其实质上操作的是同一个对象
proxy.a = 1;
console.log(target.a);

/* proxy 实例作为某对象的原型对象也能够起作用 */
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);
// 当在 obj 中获取不到值时，就会去原型对象中读取，就会受到拦截
obj.time // 35

/* 
  Proxy 支持的拦截操作一览，一共 13 种。
    - get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
    - set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
    - has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
    - deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
    - ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
    - getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
    - defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
    - preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
    - getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
    - isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
    - setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
    - apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
    - construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
*/

/* Proxy + Reflect 实现观察者模式 */
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, { set });

function set(target, key, value, receiver) {
  //=> 为了保持默认行为，在默认行为的基础上做相应的改变
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}

const person = observable({
  name: '张三',
  age: 20
});

function print() {
  console.log(`${person.name}, ${person.age}`)
}

observe(print);
person.name = '李四'; // 李四, 20