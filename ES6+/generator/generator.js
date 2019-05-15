function* demo() {
  // console.log('Hello' + yield); // SyntaxError
  // console.log('Hello' + yield 123); // SyntaxError

  console.log('Hello' + (yield)); // OK
  console.log('Hello' + (yield 123)); // OK
}
let a = demo();

console.log(a.next());
console.log(a.next());
console.log(a.next());