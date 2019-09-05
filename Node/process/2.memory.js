// 内存占用情况
let s = process.memoryUsage();
console.log(s);
// {
//   rss: 19419136,
//   heapTotal: 6537216,
//   heapUsed: 3812024,
//   external: 8272
// }

let buf = Buffer.alloc(1024 * 1024 * 1024);
s = process.memoryUsage();
console.log(s);
// {
//   rss: 19914752,
//   heapTotal: 6012928,
//   heapUsed: 3668640,
//   external: 1073750096
// }
/**
 * Node 中 v8 引擎内存使用量是有上限的，32 位里最多 0.7G，64 位最多是 1.7G
 * buffer 的内存是单独分配的，属于 external
 */
