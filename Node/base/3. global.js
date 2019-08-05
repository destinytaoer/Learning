/**
 * global 全局对象
 * 浏览器环境中，也有全局对象，但是不能直接访问，而是通过 window 来进行访问的
 *
 * 1. global 中的属性都是全局变量
 * 2. 所有全局变量都是 global 的属性
 * console
 * process 当前进程，平台信息、进程 PID 等
 * stdout stderr stdin
 * Buffer
 * clearInterval clearTimeout clearImmediate
 * setInterval setTimeout setImmediate
 */

// console.log(global);
// console.log(process);

// chdir change directory 改变当前工作目录
// cwd current working directory 当前工作目录
console.log(process.cwd());
process.chdir('..'); // 切换到上一级目录
console.log(process.cwd());

// memoryUsage 关于内存的泄漏和优化相关，用于检测当前内存的使用量
console.log(process.memoryUsage());
// {
//   rss: 19447808, 常驻内存
//   heapTotal: 6537216, 堆内存的总申请量
//   heapUsed: 3856744, 已经使用的量
//   external: 8272 外部内存的使用量
// }
