/* 1. 箭头函数 */
let a = () => {

}
// 箭头函数中没有 this，在其内部使用的 this 指向其上一级作用域的 this
// 其解决了实例方法中的匿名函数中 this 丢失的状况

function Person() {
  this.a = 'a';

  // 通常在外面定义一个 _this/that/self 等
  var that = this;
  someFn(function () {
    console.log(this.a) //=> undefined this => window
    console.log(that.a) //=> a
  })
  // 此时使用箭头函数
  someFn(() => {
    console.log(this.a) //=> a;
  })
}

/* 2. 参数默认值，ES5 需要在函数体内定义进行一大堆赋值来定义默认值 */
function person(name = 'destiny') {
  console.log(name);
}
person(); //=> destiny
/* 3. 剩余参数 */
// ES5 中只能使用 arguments 属性来定义不定参函数，而 ES6 中增加了剩余运算符
function person(...args) {
  console.log(args)
  //...
}

/* 4. 解构参数 */
// ES5
function person(options) {
  var a = options.a;
  var b = options.b;
  //...
}
// ES6
function person({ a, b }) {
  //...
}

/* 5. name 属性, 这个属性早就被浏览器广泛支持，但是直到 ES6，才将其写入了标准。*/
function a() {}
console.log(a.name) //=> a

// 匿名函数的函数表达式，以变量名为其 name 属性值
let b = function () {}
console.log(b.name) //=> b

// 具名函数的函数表达式，以函数名为其 name 属性值
let b = function c() {}
console.log(b.name) //=> c