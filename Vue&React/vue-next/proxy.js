/**
 * 对象
 */
let obj = { name: 'hh' };
// 对一个对象做代理, 其内部所有属性的获取和设置等都需要经过代理来完成
let proxy = new Proxy(obj, {
  get(target, key) {
    console.log('get', key);

    // 需要通过 Reflect.get 来获取值
    return Reflect.get(target, key);
  },
  set(target, key, val) {
    console.log('set', key, val);

    // 通过 Reflect.set 设置值
    return Reflect.set(target, key, val);
  }
});

// 使用代理对象
// proxy.name = 'oo';
// proxy.name;
/*
  set name oo
  get name
 */

/**
 * 数组
 */
let arr = [1, 2, 3];
let proxy2 = new Proxy(arr, {
  get(target, key) {
    console.log('get', key);

    // 需要通过 Reflect.get 来获取值
    return Reflect.get(target, key);
  },
  set(target, key, val) {
    console.log('set', key, val);

    // 通过 Reflect.set 设置值
    return Reflect.set(target, key, val);
  }
});

// 使用代理数组的 push 方法
// proxy2.push(4); // 发现一次 push 会调用两次 get 和两次 set, 这就是 push 方法内部的逻辑
/*
  get push => 获取了一次 push 方法
  get length => 获取了一次 length 属性
  set 3 4 => 修改属性 3 为值 4
  set length 4 => 修改属性 length 为 4
 */
// proxy2.unshift(4); // unshift 方法调用更多
/*
  get unshift
  get length
  get 3
  set 4 4
  get 2
  set 3 3
  get 1
  set 2 2
  get 0
  set 1 1
  set 0 4
  set length 5
 */

/**
 * 对象嵌套
 */
let obj2 = { name: 'hh', info: { age: 18, a: { b: 1 } } };
// 对一个对象做代理, 其内部所有属性的获取和设置等都需要经过代理来完成
let proxy3 = new Proxy(obj2, {
  get(target, key) {
    console.log('get', key);

    // 需要通过 Reflect.get 来获取值
    return Reflect.get(target, key);
  },
  set(target, key, val) {
    console.log('set', key, val);

    // 通过 Reflect.set 设置值
    return Reflect.set(target, key, val);
  }
});

// 使用代理对象
proxy3.info.age = 19; // 设置和获取嵌套对象属性都只调用了第一层级属性的 get 方法
proxy3.info.age;
proxy3.info.a.b = 1;
proxy3.info.a.b;
/*
 get info
 get info
 get info
 get info
*/
