// 标准输出
console.log(1);
console.info(1);
console.dir(1);
// node console.js > a.log 只会把标准的输出流输出到文件

// 错误输出
console.warn(3);
console.error(3);
// node console.js > a.log 2>&1 把错误输出重定向到标准输出中，2 代表错误输出，1 代表标准输出

// 用来统计代码的执行时间，参数为标记，标记必须成对
console.time('cost');
console.timeEnd('cost');

// 高手进阶的非常重要的标志就是写代码会有完善的测试，包括单元测试、集成测试、持续集成、TDD 测试驱动开发、BDD 行为驱动开发
// 断言
// 如果表达式为真，就什么都不发生
// 如果表达式为假，就会报错，打印出第二个参数
console.assert(1 == 0, 1); // Assertion failed: 1

console.trace(); // 跟踪当前代码的调用栈，就是报错中后面打印出来的调用过程，可以用来跟踪代码具体哪一行报错了
