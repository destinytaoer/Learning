let { Map, is } = require('immutable');

let map1 = Map({ a: { aa: 1 }, b: 2, c: 3 });

let map2 = map1.set('b', 2); // 如果值没有变,那么就不会产生新的对象
console.log(map1 === map2); //=> false
let map3 = map1.set('b', 3); // 如果值没有变,那么就不会产生新的对象
console.log(map1 === map3); //=> false
let map4 = map1.set('b', 3); // 改变的值是一样的, 但是每次产生的对象也不是同一个
console.log(map4 === map3); //=> false

console.log(map1.get('a') === map2.get('a'));
console.log(map1.get('a') === map3.get('a'));

// 还提供了 is 方法, 进行深比较, 但是这个方法的性能比普通的递归比较要高很多
console.log(is(map3, map4)); //=> true
