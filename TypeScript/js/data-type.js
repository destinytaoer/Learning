"use strict";
/**
 * boolean
 */
var bool = true;
/**
 * string
 */
var str = 'string';
/**
 * number
 */
var num = 1;
// num = 'str' // 报错
/**
 * array
 */
var arr = [11, 22, 33];
var arr = [11, 22, 33];
var ary = [11, '22']; // Array<string|number>
/**
 * tuple 元组
 */
var tuple = [123, 'this is ts'];
/**
 * enum 枚举
 */
var Flag;
(function (Flag) {
    Flag[Flag["success"] = 1] = "success";
    Flag[Flag["error"] = 0] = "error";
})(Flag || (Flag = {}));
;
var f = Flag.error; //=> 0
var a = Flag[1]; //=> success，注意要类型是 string 而不是 Flag，否则会报错
/**
 * any
 */
var notSure = 4;
notSure.ifItExists();
notSure.toFixed();
var prettySure = 4;
// prettySure.toFixed(); // 报错
// var oBox = document.getElementById('box')
// oBox.style.color = 'red' // 报错，奇怪的错误
// 只能把 oBox 定义为 any 类型
var oBox = document.getElementById('box');
oBox.style.color = 'red';
/**
 * null & undefined
 */
var aa; // num 为 any 类型
console.log(aa); // undefined
// 如果指定了类型
var bb;
console.log(bb); // undefined
var cc;
console.log(cc); // undefined
var dd;
// console.log(dd) // 严格模式下报错，使用未赋值的变量
/**
 * void 空值
 */
function nothing() {
    console.log('nothing return');
}
/**
 * never
 */
// 返回 never 的函数必须存在无法达到的终点
function error(message) {
    throw new Error(message);
}
// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}
// 返回never的函数必须存在无法达到的终点
function infiniteLoop() {
    while (true) {
    }
}
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
var someValue = "this is a string";
var strLength = someValue.length;
// strLength = someValue.length // 也不会报错
