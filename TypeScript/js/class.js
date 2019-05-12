"use strict";
/**
 * 基本用法
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person1 = /** @class */ (function () {
    function Person1(name, sex) {
        this.name = name; // 前面定义的属性必须进行初始化，在构造函数内或者使用默认值，否则会报错
        this.sex = sex;
    }
    return Person1;
}());
/**
 * 继承
 */
var Man2 = /** @class */ (function (_super) {
    __extends(Man2, _super);
    function Man2(name, sex) {
        return _super.call(this, name, sex) || this; // 继承类中，必须调用 super()，相当于调用父类的构造函数，需要传递相应的参数
    }
    return Man2;
}(Person1));
/**
 * public 外部可以访问
 */
// 默认所有成员都是 public
var Person2 = /** @class */ (function () {
    function Person2(name, sex) {
        this.name = name;
        this.sex = sex;
    }
    Person2.prototype.eat = function () {
        console.log(this.name + 'is eating');
    };
    return Person2;
}());
/**
 * private 不能在声明它的类外部访问
 */
var Person3 = /** @class */ (function () {
    function Person3(name) {
        this.name = name;
    }
    return Person3;
}());
var person3 = new Person3('aa');
// person3.name // 报错
// 继承类中也不能访问
var Man5 = /** @class */ (function (_super) {
    __extends(Man5, _super);
    function Man5(name) {
        return _super.call(this, name) || this;
    }
    Man5.prototype.eating = function () {
        // console.log(this.name) // 报错
    };
    return Man5;
}(Person3));
var man5 = new Man5('bb');
// man5.name // 报错
/**
 * public 在外部不能访问，在其派生类中可以访问
 */
var Person4 = /** @class */ (function () {
    function Person4(name) {
        this.name = name;
    }
    return Person4;
}());
var person4 = new Person4('aa');
// person3.name // 报错
// 继承类中可以访问
var Man6 = /** @class */ (function (_super) {
    __extends(Man6, _super);
    function Man6(name) {
        return _super.call(this, name) || this;
    }
    Man6.prototype.eating = function () {
        console.log(this.name); // 成功
    };
    return Man6;
}(Person4));
var man6 = new Man6('bb');
// man6.name // 报错
// 构造函数标记为 protected，当前类不能创建实例，其派生类可以继承，也能够创建实例。可以应用于不实例化的基类
var Person5 = /** @class */ (function () {
    function Person5(name) {
        this.name = name;
    }
    return Person5;
}());
var Man7 = /** @class */ (function (_super) {
    __extends(Man7, _super);
    function Man7(name, sex) {
        var _this = _super.call(this, name) || this;
        _this.sex = sex;
        return _this;
    }
    return Man7;
}(Person5));
// var person5 = new Person5('bb') // 报错
var man7 = new Man7('bb', 'man');
/**
 * 只读属性，readonly 修饰符可以和 public 等一起使用
 */
var Person6 = /** @class */ (function () {
    function Person6(name) {
        this.name = name;
    }
    return Person6;
}());
var person6 = new Person6('xx');
// person6.name = 'asd' // 报错
/**
 * 属性默认值
 */
var Person7 = /** @class */ (function () {
    function Person7(name) {
        this.name = 'aa';
        // this.name = name // 设置默认值之后，可以不需要在这里初始化赋值
    }
    return Person7;
}());
/**
 *  参数属性
 */
var Person9 = /** @class */ (function () {
    function Person9(name) {
        if (name === void 0) { name = 'aa'; }
        this.name = name;
        // 直接合并声明和赋值的步骤到参数部分
    }
    return Person9;
}());
var person9 = new Person9();
console.log(person9.name); // 存在 name
//参数属性通过给构造函数参数前面添加一个访问限定符来声明，可以是 public、private、protected、readonly
var Person10 = /** @class */ (function () {
    function Person10(name) {
        this.name = name;
    }
    return Person10;
}());
var person10 = new Person10('aa');
console.log(person10.name); // 存在 name
// 如果没有修饰符，是不能合并的
var Person8 = /** @class */ (function () {
    function Person8(name) {
        if (name === void 0) { name = 'aa'; }
    }
    return Person8;
}());
var person8 = new Person8();
// console.log(person8.name) // 报错，不存在 name
/**
 * 存取器 getters/setters
 */
var Person11 = /** @class */ (function () {
    function Person11(name) {
        this.name = name;
    }
    return Person11;
}());
// 设置 get、set 来限制存取
var Person12 = /** @class */ (function () {
    function Person12(name) {
        this._name = name;
    }
    Object.defineProperty(Person12.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (newName) {
            // if (passcode && passcode == "secret passcode") {
            //     this._name = newName;
            // }
            // else {
            //     console.log("Error: Unauthorized update of employee!");
            // }
        },
        enumerable: true,
        configurable: true
    });
    return Person12;
}());
/**
 * 静态属性，指的是定义在类本身上面的属性或方法
 */
var Person13 = /** @class */ (function () {
    function Person13(name) {
        this.name = name;
    }
    Person13.prototype.saySomething = function () {
        console.log(Person13.aa); // 通过类名来访问这个静态属性
    };
    Person13.aa = 'woshishui';
    return Person13;
}());
/**
 * 抽象类
 */
var Person14 = /** @class */ (function () {
    function Person14(name) {
        this.name = name;
    }
    Person14.prototype.work = function () {
        console.log('working');
    };
    return Person14;
}());
// var person14 = new Person14('aa') // 报错，不能实例化抽象类
var Man8 = /** @class */ (function (_super) {
    __extends(Man8, _super);
    function Man8() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Man8.prototype.eat = function () {
        console.log('eating');
    };
    Man8.prototype.play = function () {
        console.log('play');
    };
    return Man8;
}(Person14));
// 对比
// var man8 = new Man8('bb') // 默认是 调用的构造函数 类型
// console.log(man8.name)
// man8.eat()
// man8.work()
// man8.play() // 正确
var man8 = new Man8('bb'); // 可以指定为抽象类的类型
console.log(man8.name);
man8.eat();
man8.work();
// man8.play() // 报错，如果指定了 man8 的类型为抽象类，play 没有在抽象类中定义，则不能使用
