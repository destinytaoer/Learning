/* 1. 重复声明 */
// var a = 1;
// var a;
// console.log(a); //=> 1

/* 2. 变量提升 */
// console.log(b); //=> 不会报错，而是 undefined。提升声明，但是不赋值
// var b = 1;
// xx(); //=> 可执行，对于函数提升且赋值
// function xx() {
//   console.log('可执行');
// }

/* 3. 全局声明为 window 的属性 */
// var c = 123;
// console.log(window.c); //=> 123，注意不能使用 node 执行，要在浏览器中执行

/* 4. 不存在块级作用域 */
if (true) {
  var d = 1;
}
console.log(d); //=> 1

function f() {
  console.log('I am outside!');
}

// 会在函数作用域中进行提升
(function () {
  if (false) {
    // 重复声明一次函数f
    function f() {
      console.log('I am inside!');
    }
  }

  f(); //=> I am inside!
}());

//=> 相当于
(function () {
  function f() {
    console.log('I am inside!');
  }
  if (false) {
  }

  f(); //=> I am inside!
}());