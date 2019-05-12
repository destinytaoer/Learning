/**
 * 基本用法
 */

class Person1 {
  name: string; // 校验
  sex: string;
  constructor(name: string, sex: string) { // 校验
    this.name = name; // 前面定义的属性必须进行初始化，在构造函数内或者使用默认值，否则会报错
    this.sex = sex
  }
}

/**
 * 继承
 */
class Man2 extends Person1 {
  constructor(name: string, sex: string) {
    super(name,sex) // 继承类中，必须调用 super()，相当于调用父类的构造函数，需要传递相应的参数
  }
}

/**
 * public 外部可以访问
 */
// 默认所有成员都是 public
class Person2 {
  public name: string;
  public sex: string;
  public constructor(name: string, sex: string) {
    this.name = name;
    this.sex = sex;
  }
  public eat() {
    console.log(this.name + 'is eating');
  }
}
/**
 * private 不能在声明它的类外部访问
 */
class Person3 {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
}
var person3 = new Person3('aa')
// person3.name // 报错

// 继承类中也不能访问
class Man5 extends Person3 {
  constructor(name: string) {
    super(name)
  }
  eating() {
    // console.log(this.name) // 报错
  }
}
var man5 = new Man5('bb')
// man5.name // 报错

/**
 * protected 在外部不能访问，在其派生类中可以访问
 */
class Person4 {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}
var person4 = new Person4('aa')
// person3.name // 报错

// 继承类中可以访问
class Man6 extends Person4 {
  constructor(name: string) {
    super(name)
  }
  eating() {
    console.log(this.name) // 成功
  }
}
var man6 = new Man6('bb')
// man6.name // 报错

// 构造函数标记为 protected，当前类不能创建实例，其派生类可以继承，也能够创建实例。可以应用于不实例化的基类
class Person5 {
  name: string;
  protected constructor(name: string) {
    this.name = name;
  }
}

class Man7 extends Person5 {
  sex: string;
  constructor(name:string, sex:string) {
    super(name);
    this.sex = sex;
  }
}

// var person5 = new Person5('bb') // 报错
var man7 = new Man7('bb', 'man')

/**
 * 只读属性，readonly 修饰符可以和 public 等一起使用
 */
class Person6 {
  readonly name: string;
  constructor(name: string) {
    this.name = name
  }
}

var person6 = new Person6('xx')
// person6.name = 'asd' // 报错

/**
 * 属性默认值
 */
class Person7 {
  name: string = 'aa';
  constructor(name: string) {
    // this.name = name // 设置默认值之后，可以不需要在这里初始化赋值
  }
}

/**
 *  参数属性
 */
class Person9 {
  constructor(readonly name: string='aa') {
    // 直接合并声明和赋值的步骤到参数部分
  }
}
var person9 = new Person9()
console.log(person9.name) // 存在 name

//参数属性通过给构造函数参数前面添加一个访问限定符来声明，可以是 public、private、protected、readonly
class Person10 {
  constructor(public name: string) {
    
  }
}
var person10 = new Person10('aa')
console.log(person10.name) // 存在 name

// 如果没有修饰符，是不能合并的
class Person8 {
  constructor(name: string='aa') {
  }
}
var person8 = new Person8()
// console.log(person8.name) // 报错，不存在 name

/**
 * 存取器 getters/setters
 */

class Person11 {
  name: string;
  constructor(name:string) {
    this.name = name;
  }
}
// 设置 get、set 来限制存取
class Person12 {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
      return this._name;
  }

  set name(newName: string) {
      // if (passcode && passcode == "secret passcode") {
      //     this._name = newName;
      // }
      // else {
      //     console.log("Error: Unauthorized update of employee!");
      // }
  }
}

/**
 * 静态属性，指的是定义在类本身上面的属性或方法
 */
class Person13 {
  static aa = 'woshishui';
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  saySomething() {
    console.log(Person13.aa) // 通过类名来访问这个静态属性
  }
}

/**
 * 抽象类
 */

abstract class Person14 {
  constructor(public name:string) {
    
  }
  work() {
    console.log('working');
  }
  abstract eat(): void
}

// var person14 = new Person14('aa') // 报错，不能实例化抽象类

class Man8 extends Person14 {
  eat() {
    console.log('eating')
  }
  play() {
    console.log('play')
  }
}
// 对比
// var man8 = new Man8('bb') // 默认是 调用的构造函数 类型
// console.log(man8.name)
// man8.eat()
// man8.work()
// man8.play() // 正确

var man8:Person14 = new Man8('bb') // 可以指定为抽象类的类型
console.log(man8.name)
man8.eat()
man8.work()
// man8.play() // 报错，如果指定了 man8 的类型为抽象类，play 没有在抽象类中定义，则不能使用