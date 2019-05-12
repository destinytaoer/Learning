"use strict";
/**
 * 布尔类型
 */
var bool = true;
/**
 * 数字类型
 */
var num = 1;
/**
 * 字符串类型
 */
var str = '11';
/**
 * 数组类型
 */
// var arr:number[] = [11, 22]
// var arr:any[] = [11, '22']
// var arr: Array<number> = [11, 22]
// var arr: Array<any> = [11, '22']
var arr = [11, '22'];
/**
 * 元组类型
 */
var tuple = [123, 'this is ts'];
/**
 * 枚举类型
 */
var Flag;
(function (Flag) {
    Flag[Flag["error"] = 1] = "error";
    Flag[Flag["success"] = 2] = "success";
})(Flag || (Flag = {}));
var Color;
(function (Color) {
    Color[Color["blue"] = 0] = "blue";
    Color[Color["red"] = 3] = "red";
    Color[Color["orange"] = 4] = "orange";
})(Color || (Color = {}));
;
var c = Color[0];
console.log(c); //3
var c = Color.orange;
console.log(c); //4
console.log(Color.blue);
