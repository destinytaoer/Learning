// exec 同步执行一个 shell 命令
let { exec } = require('child_process');
// 使用 shell 执行这个命令，完成之后执行回调
let p1 = exec(
  'node 10.test.js a b c',
  {
    cwd: __dirname
    // timeout: 10,
    // maxbuffer: 1024 * 1024
  },
  function(err, stdout, stdin) {
    console.log(err); // null
    console.log(stdout); // 'a b c' 所有输出的合并，包含空格、回车换行
    console.log(stdin); // ''
  }
);
