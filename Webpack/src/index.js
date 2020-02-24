import str from './a.js';
import './index.css';
import './index.less';
import '@babel/polyfill';

console.log(str);

let fn = () => {
  console.log('fn');
};

fn();

@log
class A {
  constructor() {
    this.a = 1;
  }
  b = 1;
}

function log(target) {
  console.log(target);
}

let a = new A();
console.log(a.a);

function* gen() {
  yield 1;
}
console.log(gen().next());

console.log(['a'].includes('a'));
