/* 1. 数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。 */
// let { bar, foo } = { foo: "aaa", bar: "bbb" };
// console.log(bar, foo); //=> aaa bbb

/* 2. 解构失败，则值为 undefined */
// let { baz } = { foo: "aaa", bar: "bbb" };
// console.log(baz); //=> undefined

/* 3. 起别名，通过冒号起别名 */
// 实际上，前面的对象解构都是简写形式，下面才是完整的
// let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
// 对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

// let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
// console.log(baz); //=> aaa
// console.log(foo); //=> foo is not defined

/* 4. 解构嵌套对象 */
// let obj = { p: [1, 2] };
// let { p: [x, y] } = obj; // p 是一个匹配模式，不是变量
// console.log(x, y); //=> 1 2
// console.log(p); //=> p is not defined

// 如果需要 p，可以这样写
// let obj = { p: [1, 2] };
// let { p, p: [x, y] } = obj;
// console.log(x, y); //=> 1 2
// console.log(p); //=> [1, 2]

// let obj = { p: { x: { b: '1' } } };
// let { p: { x: { b } } } = obj; // p, x 都只是匹配模式，不是变量
// console.log(b); //=> 1

/* 5. 解构赋值的变量可以是某个对象的属性或者数组中的某一项 */
// let obj = {};
// let arr = [];
// 这种方式，由于赋值的对象不是一个变量，不能用 var、let 等声明，但是直接使用大括号开头会被认为是块级作用域，所以要使用括号包裹
// ({ foo: obj.a, bar: arr[0]} = { foo: 'a', bar: 'b' });
// console.log(obj, arr); //=> {a: 'a'} ['b']

/* 6. 嵌套解构不成功的报错 */
// 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。
// let {foo: {bar}} = {baz: 'baz'};// 报错，原因在于 foo 此时等于 undefined，再取子属性就会报错

/* 7. 对象解构可以获取到对象原型中的属性 */
// const obj1 = {};
// const obj2 = { foo: 'bar' };
// Object.setPrototypeOf(obj1, obj2);

// const { foo } = obj1;
// console.log(obj1); //=> {}
// console.log(foo); //=> bar

/* 8. 默认值 */
// 同样必须严格等于 undefined，默认值才能生效
// var { x = 3 } = {};
// console.log(x); //=> 3
// var { x = 3 } = { x: undefined };
// console.log(x); //=> 3

// var { x = 3 } = { x: null };
// console.log(x); //=> null

/* 9. 已经声明变量的解构赋值 */
// 与前面赋值对象为某对象属性的形式一样，需要用括号包裹
// let x;
// {x} = {x: 1}; //=> SyntaxError: syntax error
// let x;
// ({x} = {x: 1}); //=> 成功

/* 10. 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。 */
// let {toString: s} = 123;
// s === Number.prototype.toString //=> true

// let {toString: s} = true;
// s === Boolean.prototype.toString //=> true

// 由于 undefined 和 null 无法转为对象，所以对它们进行解构赋值，都会报错。
// let { prop: x } = undefined; //=> TypeError
// let { prop: y } = null; //=> TypeError