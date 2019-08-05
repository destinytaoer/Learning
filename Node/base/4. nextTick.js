/**
 * nextTick 和 setImmediate
 * nextTick 将回调函数放到当前执行栈的底部
 * setImmediate 将回调函数放到事件队列的尾部
 */
// 当前执行栈执行完毕之后，才会去取事件队列中的消息到执行栈中执行，所以 nextTick 必定先于 setImmediate 执行

function read() {
  setImmediate(function() {
    console.log(1);
    process.nextTick(function() {
      console.log(2);
      process.nextTick(function() {
        console.log(3);
      });
    });
    setImmediate(function() {
      console.log(5);
    });
    // 5,6 两个执行顺序是不固定的
    setTimeout(function() {
      console.log(6);
    });
  });
  process.nextTick(function() {
    console.log(4);
  });
}
read(); // 4 1 2 3 5
