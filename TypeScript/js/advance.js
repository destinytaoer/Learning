"use strict";
/*
 * 交叉类型, 将多个类型合并为一个类型
 */
function extend(first, second) {
    var result = {};
    for (var key in first) {
        result[key] = first[key];
    }
    for (var key in second) {
        // strict 模式下调用 hasOwnProperty 会报错
        // if (!result.hasOwnProperty(key)) {
        result[key] = second[key];
        // }
    }
    return result;
}
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function () { };
    return ConsoleLogger;
}());
// 使用 extend 来让 jim 成为交叉类型
var jim = extend(new Person("jim"), new ConsoleLogger());
jim.name;
jim.log();
/*
 * 联合类型, 指定一个值的类型是联合类型中的任意一个, 联合类型使用 | 分隔
 */
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error("expected string or number got " + typeof padding);
}
padLeft("hello world", 4);
function getSmallPet() {
    //...
    var result = {
        swim: function () { },
        layEggs: function () { }
    };
    return result;
}
var pet = getSmallPet();
pet.layEggs(); // 是共有的, 可以调用
// pet.swim(); // 类型 Fish | Bird 上不存在这个类型, 因为不是共有的
// pet.fly(); // 类型 Fish | Bird 上不存在这个类型, 因为不是共有的
// 解决方案
// 类型断言
if (pet.swim) {
    pet.swim();
}
else if (pet.fly) {
    pet.fly();
} // 这种方式过于繁琐
/* 类型保护 */
// 1. 类型谓词
function isFish(pet) {
    return pet.swim !== undefined;
}
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
// 2. typeof 只能提供一些基础类型的校验
// 3. instanceof 将类作为接口时, 可以使用其作为类型校验
/* 具有 null undefined 的联合类型 */
var s = "sss";
// 在非严格模式情况下,是可以把 null undefined 赋值给任意类型的
// s = undefined;
var sn = "sss";
sn = null;
// sn = undefined;
// 但是一般都需要开启严格模式
// 在可选参数中, 实际上就是认为是一个联合类型 type | undefined
function fun(x, y) {
    return x + (y || 0);
}
fun(1, undefined);
// fun(1, null); // error
// 在类中也是如此
var Css = /** @class */ (function () {
    function Css() {
    }
    return Css;
}());
var css = new Css();
css.b = undefined;
// css.b = null; // error
// 因此我们有时需要编写具有 null 的联合类型, 需要去除 null 和 undefined 的值的判断
function fun1(sn) {
    // 在这里不会报错
    return sn || "default";
}
// 使用 ! 类型断言
function fun2(name) {
    function fun3(name2) {
        // 这里 name 会报错, 可能为 null, 但是调用的时候,实际上与上面一样, 已经把 name 认为是 String. 但是在嵌套的函数中, ts 编译器就不能进行推断.
        // 可以使用 ! 断言其不是一个 null 或 undefined
        return name.charAt(0) + name2;
    }
    name = name || "default";
    return fun3(name);
}
var UIElement = /** @class */ (function () {
    function UIElement() {
    }
    UIElement.prototype.animte = function (dx, dy, ease) {
        if (ease === 1) {
            //...
        }
        else if (ease === 2) {
        }
        else if (ease === 3) {
        }
        else {
        }
    };
    return UIElement;
}());
var button = new UIElement();
button.animte(0, 0, 1);
// button.animte(0, 0, 4); // error
