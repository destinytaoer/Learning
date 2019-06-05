/* Generator 生成器是生成迭代器的函数 */
function read(books) {
  let index = 0;
  return {
    next: function () {
      let done = books[index] ? false: true;
      let value = books[index++];
      return {
        value,
        done
      }
    }
  }
}
// 迭代器
let it = read(['js', 'node']);
// 迭代器具有 next 方法，每次调用 next 方法返回一个结果

/* 实际上生成器是 带星号的函数 */
function *read1(books) {
  console.log('start');
  for (let i = 0; i < books.length; i++) {
    yield books[i];
  }
  console.log('end');
}
// 迭代器
let it1 = read1(['js', 'node']);
console.log(it1.next()); // start { value: 'js', done: false }
console.log(it1.next()); // { value: 'node', done: false } end
console.log(it1.next()); // { value: undefined, done: true }
console.log(it1.next()); // { value: undefined, done: true }

/* 生成器内部通过 yield 来定义断点，自动生成 next 方法，而不需要手动写 next 方法，每次执行 next 都会到 yield 暂停，然后输入 yield 后的结果，调用下一个 next 才会继续往下执行 */

// function* demo() {
//   // console.log('Hello' + yield); // SyntaxError
//   // console.log('Hello' + yield 123); // SyntaxError

//   console.log('Hello' + (yield)); // OK
//   console.log('Hello' + (yield 123)); // OK
// }
// let a = demo();

// console.log(a.next());
// console.log(a.next());
// console.log(a.next());