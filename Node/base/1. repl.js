let repl = require('repl');
let context = repl.start().context;
context.msg = 'hello';
context.hello = function() {
  console.log(context.msg);
};
// node 执行这个文件，会进入一个具有 msg 和 hello 的 repl 上下文环境
