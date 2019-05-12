/**
 * 基本用法
 */
interface SquareConfig {
  color: string;
  width: number;
}
var square: SquareConfig = { color: 'red', width: 111 }

/**
 * 可选属性
 */
interface Square {
  color: string;
  area?: number;
}

function createSquare(config: SquareConfig): Square {
  let newSquare = {color: "white", area: 100};
  newSquare.color = config.color
  return newSquare;
}

let mySquare = createSquare(square);

/**
 * 只读属性
 */
let read: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = read;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// read = ro; // error!
 // 或
read = <number[]>ro

/**
 * 额外的属性检查
 */

interface Square2 {
  color: string;
  width: number;
}
// var ss: Square2 = { color: 'red', width: 11, area: 111 } // 报错

// 解决方案

// 类型断言
var ss: Square2 = { color: 'red', width: 11, area: 111 } as Square2 

// 变量存储
var tt = {color: 'red', width: 11, area: 111}
var kk: Square2 = tt

// 字符串索引签名
interface Square3 {
  color: string;
  width: number;
  [propertyName: string]: any;
}

var gg:Square3 = {color: 'red', width: 11, asd: 'asd',dfg: 13}

/**
 * 函数类型
 */
interface func {
  (name: string, age: number):string;
}
// 区别于对象方法
// 第一种写法
// interface functi {
//   aa: (name: string, age: number) => string
// }
// 第二种写法
// interface functi {
//   aa(name: string, age: number): string
// }

var tfunc: func = function (name: string, age: number): string {
  return 'aa'
}

// 直接规定函数类型
var tfunc: {(name: string, age: number):string} = function (name: string, age: number): string {
  return 'aa'
}

/**
 * 可索引的类型
 */

interface StringArray {
  [index: number]: string;
}

interface dictionary {
  [index: string]: number;
  length: number;
  // name: string; // 报错  
}