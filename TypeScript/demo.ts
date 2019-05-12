/**
 * 布尔类型 
 */
var bool:boolean = true

/**
 * 数字类型 
 */

var num:number = 1

/**
 * 字符串类型 
 */
var str:string = '11'

/**
 * 数组类型 
 */
// var arr:number[] = [11, 22]
// var arr:any[] = [11, '22']

// var arr: Array<number> = [11, 22]
// var arr: Array<any> = [11, '22']

var arr = [11, '22']

/**
 * 元组类型 
 */
let tuple: [number, string] = [123, 'this is ts'];

/**
 * 枚举类型
 */

enum Flag {
  error = 1,
  success = 2
}

enum Color {blue,red=3,'orange'};
var c:Color=Color[0];
console.log(c);   //3
var c:Color=Color.orange;
console.log(c);   //4

console.log(Color.blue)