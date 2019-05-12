/**
 * boolean
 */ 
var bool: boolean = true

/**
 * string
 */ 
var str: string = 'string'

/**
 * number
 */ 
var num: number = 1

// num = 'str' // 报错

/**
 * array
 */ 
var arr: number[] = [11, 22, 33]

var arr: Array<number> = [11, 22, 33]

var ary = [11, '22'] // Array<string|number>

/**
 * tuple 元组
 */ 
var tuple: [number, string] = [123, 'this is ts'];

/**
 * enum 枚举
 */ 
enum Flag {
  success=1,
  error=0
};
var f:Flag = Flag.error //=> 0
var a: string = Flag[1] //=> success，注意要类型是 string 而不是 Flag，否则会报错

/**
 * any
 */

let notSure: any = 4;
notSure.ifItExists();
notSure.toFixed();

let prettySure: Object = 4;
// prettySure.toFixed(); // 报错

// var oBox = document.getElementById('box')
// oBox.style.color = 'red' // 报错，奇怪的错误

// 只能把 oBox 定义为 any 类型
var oBox:any = document.getElementById('box')
oBox.style.color = 'red'

/**
 * null & undefined
 */ 
var aa; // num 为 any 类型
console.log(aa) // undefined

// 如果指定了类型
var bb:any
console.log(bb) // undefined

var cc:undefined
console.log(cc) // undefined

var dd:number
// console.log(dd) // 严格模式下报错，使用未赋值的变量

/**
 * void 空值
 */

function nothing(): void {
   console.log('nothing return')
}
 
/**
 * never
 */
// 返回 never 的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
  return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {
  }
}

/**
 * object
 */

declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error

/**
 * 类型断言，跳过某些校验两种写法
 */
// let someValue: any = "this is a string";
// let strLength: number = (<string>someValue).length;

let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

// strLength = someValue.length // 也不会报错