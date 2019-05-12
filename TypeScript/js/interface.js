"use strict";
var square = { color: 'red', width: 111 };
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    newSquare.color = config.color;
    return newSquare;
}
var mySquare = createSquare(square);
/**
 * 只读属性
 */
var read = [1, 2, 3, 4];
var ro = read;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// read = ro; // error!
// 或
read = ro;
// var ss: Square2 = { color: 'red', width: 11, area: 111 } // 报错
// 解决方案
// 类型断言
var ss = { color: 'red', width: 11, area: 111 };
// 变量存储
var tt = { color: 'red', width: 11, area: 111 };
var kk = tt;
var gg = { color: 'red', width: 11, asd: 'asd', dfg: 13 };
// 区别于对象方法
// 第一种写法
// interface functi {
//   aa: (name: string, age: number) => string
// }
// 第二种写法
// interface functi {
//   aa(name: string, age: number): string
// }
var tfunc = function (name, age) {
    return 'aa';
};
// 直接规定函数类型
var tfunc = function (name, age) {
    return 'aa';
};
