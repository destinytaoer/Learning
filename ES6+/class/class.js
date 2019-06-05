// ES6 中的类是语法糖，其实际实现仍然是 ES5 的函数，但 ES6 的类，只能作为构造函数使用
/* 1. 基本用法 */
class Parent {
  constructor(name) {
    // 实例的私有属性
    this.name = name;
  }
  static hello() {
    console.log('hello');
  }
  // 实例的公有属性，即原型上的属性
  getName() {
    console.log(this.name);
  }
}
let p = new Parent('destiny');
p.getName(); //=> destiny

// 原理解析
// 类的调用检查，参数为实例和构造函数
var _classCallCheck = function (instance, Contructor) {
  // 如果这个实例不是构造函数的实例，就直接报错了，不能把类当作普通函数调用
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// 给构造函数的原型和自身上添加属性，是一个高阶函数
var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = prop[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) {
        descriptor.writable = true;
      }
      Object.definePropertiy(target, descriptor.key, descriptor);
    }
  }
  // 参数为：构造函数、原型上的属性、静态属性（构造函数上的）
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) {
      defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
      defineProperties(Constructor, staticProps);
    }
    return Constructor;
  }
}

var Parent = function () {
  function Parent(name) {
    // 检查类是否当作构造函数来使用
    _classCallCheck(this, Parent);

    this.name = name;
  }

  // 给类创建公有的原型方法和属性
  _createClass(Parent, [{
    key: "getName",
    value: function getName() {
      console.log(this.name);
    }
  }], [{
    key: 'hello',
    value: function hello() {
      console.log('hello');
    }
  }]);
  return Parent;
}

/* 2. 继承 */
class Child extends Parent {
  constructor(name, age) {
    // super 指父类构造函数
    super(name);
    this.age = age;
  }
  getAge() {
    console.log(this.age);
  }
}
// 原理分析
function _inherits(subClass, superClass) {
  // 父类必须是函数或者 null
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  // 将子类的原型等于 具有父类原型的空对象，这个空对象具有 constructor 属性指向子类
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  // 让子类继承父类中的静态属性
  // 注意 __proto__ 和 prototype 的区别
  if (superClass) {
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
}
var Child = function (_Parent) {
  _inherits(Child, _Parent);

  function Child(name, age) {
    // 进行类调用检测
    _classCallCheck(this, Child);

    var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name));

    _this.age = age;
    return _this;
  }
  return Child;
}(Parent);