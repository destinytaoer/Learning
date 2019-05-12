/**
 * 什么是泛型
 */

function log1(arg: any) :any {
  return arg;
}
// 虽然按照函数代码，传入什么就是什么，但是没有明确的类型规定，因此丢失了一些信息，无法判断是否传入和返回的是相同的类型

//=> 转换成泛型，T 为类型变量
function log2<T>(arg: T): T {
  return arg
}
/**
 * 泛型函数的使用
 */
// T 可以在使用时规定，也可以通过自动的类型推断，传入什么类型的值，T 就会自动成为什么类型

log2<string>('long') // T 为 string
log2(12) // T 为 number

/**
 * 泛型变量
 */
// 使用时特别注意的是，泛型变量可能是任意类型，只有当指定的所有类型都满足时，才能使用
function log3<T>(arg: T): T {
  // console.log(arg.length) // 报错，原因在于不是所有类型都拥有 length 属性
  return arg
}

// 解决方案：将泛型当作泛型变量类型的一部分，而不是完全是泛型。将其转换为泛型数组

function log4<T>(arg: T[]): T[] {
  console.log(arg.length); // 正确，所有数组都拥有 length 属性
  return arg
}

/**
 * 泛型的类型
 */

// 箭头表示法
let myLog: <T>(arg: T) => T = log1

// T 可以替换成其他
let myLog2: <U>(arg: U) => U = log1

// 对象字面量表示法
let myLog3: { <T>(arg: T): T } = log1

/**
 * 泛型接口，由对象字面量表示法引出
 */
// 普通泛型接口
interface logFn {
  <T>(arg: T): T
}

let myLog4: logFn = log1

// 另一种方式：将泛型参数当作泛型接口的一部分

interface logFn2<T> {
  (arg:T): T
}

let myLog5: logFn2<string> = log1
// 此时我们就能够知道具体使用的是哪一个泛型类型。传入类型之后，就会锁定了该泛型函数内部的类型

/**
 * 泛型类
 */
class NumberSet<T>{
  arr:T[]=[];
  add(ele:T){
     this.arr.push(ele);
  }
  min():T{
    var min=this.arr[0];
    this.arr.forEach(function (value) {
      if(value < min){
        min = value;
      }
    });
    return min;
  }
}
let number = new NumberSet<number>()
number.min()

/**
 * 泛型约束，利用接口和 extends 实现对泛型参数的一种约束，必须满足接口定义的必要条件
 */
// 它是前面提过的泛型变量使用的另一种解决方案
interface Lengthwise {
  length: number;
}

function log5<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // 正确
  return arg;
}

// 类型参数之间的约束
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // 正确
// getProperty(x, "m"); // 报错: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

// 泛型约束中使用类类型
function create<T>(c: {new(): T; }): T {
  return new c();
}

// 高级使用类类型的例子
class BeeKeeper {
  constructor(public hasMask:boolean) {
  }
}

class ZooKeeper {
  constructor(public nameTag:string) {
  }
}

class Animal {
  constructor(public numLegs: number) {
  }
}

class Bee extends Animal {
  constructor(numLegs: number, public keeper: BeeKeeper = new BeeKeeper(true)) {
    super(numLegs)
  }
}

class Lion extends Animal {
  constructor(numLegs: number, public keeper: ZooKeeper = new ZooKeeper('a')) {
    super(numLegs)
  }
}

function createInstance<A extends Animal>(c: new (numLegs: number) => A, num: number): A {
  return new c(num);
}

createInstance(Lion, 4).keeper.nameTag;
createInstance(Bee, 10).keeper.hasMask;
