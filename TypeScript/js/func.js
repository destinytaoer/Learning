"use strict";
/**
 * 1. 返回值
 */
function none() {
    console.log(1);
    // return 1; // 报错
}
function something() {
    return 'string';
}
/**
 * 2. 参数校验
 */
function setInfo(name, age) {
    console.log("name: " + name + ", age: " + age);
}
setInfo('sd', 12);
function setInfo2(options) {
    console.log("name: " + options.name + ", age: " + options.age);
}
/**
 * 3. 可选参数和默认值
 */
function setInfo3(name, age) {
    if (age === void 0) { age = 11; }
    console.log("name: " + name + ", age: " + age);
}
setInfo3('aa'); // name: aa, age: 11
function setInfo4(name, age) {
    console.log("name: " + name + ", age: " + age);
}
setInfo4('aa'); // name: aa, age: 11
function setInfo5(name, age) {
    if (age === void 0) { age = 11; }
    console.log("name: " + name + ", age: " + age);
}
// setInfo5('aa','bb') // name: aa, age: 11
/**
 * 4. 剩余参数
 */
function sum() {
    var num = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        num[_i] = arguments[_i];
    }
    return num.reduce(function (a, b) {
        return a + b;
    });
}
function getInfo(str) {
    if (typeof str === 'string') {
        return 'name: ' + str;
    }
    else {
        return 'age:' + str;
    }
}
// getInfo(true)
/**
 * 6. 箭头函数 和匿名函数
 */
var anonymous = function (aa) {
};
var arrow = function (aa) {
};
function func(myAdd) {
    return myAdd(1, 2);
}
var result = func(function (x, y) {
    return x + y;
});
console.log(result);
/**
 * 7. this 参数
 */
var man1 = {
    name: 'aa',
    sayName: function () {
        var _this = this;
        return function () {
            console.log(_this.name); // this 指向 man
        };
    }
};
man1.sayName()(); //=> aa 
var man2 = {
    name: 'aa',
    sayName: function () {
        var _this = this;
        return function () {
            console.log(_this.name); // this 指向 man
        };
    }
};
man2.sayName()(); //=> aa
var man3 = {
    name: 'aa',
    sayName: function () {
        return function () {
            // console.log(this.name) // 报错
        };
    }
};
man3.sayName()(); //=> aa
