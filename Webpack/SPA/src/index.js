import str from './a.js';
import './index.css';
import './index.less';
import './style';
import '@babel/polyfill';
// import 'jquery';
import logo from './logo.jpg';
console.log(str);
import './components/b';

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

console.log(window.$);
console.log($);

// webpack 打包图片
let image = new Image();
image.src = logo;

document.body.appendChild(image);

// fetch('/api/user')
//   .then(res => res.text())
//   .then(res => console.log('GET /user', res));

if (DEV) {
  console.log(DEV);
} else {
  console.log('prod');
}
