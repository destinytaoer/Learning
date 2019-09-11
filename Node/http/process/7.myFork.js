// fork exec execFile 都是基于 spawn 的语法糖
let { spawn } = require('child_process');

function fork(modulePath, args, options) {
  let { silent } = options;
  let opts = Object.assign({}, options);
  if (silent) {
    opts.stdio = ['ipc', 'ignore', 'ignore'];
  } else {
    opts.stdio = ['ipc', process.stdout, process.stderr];
  }
  return spawn('node', [modulePath, ...args], opts);
}

let child = fork('fork.js', ['aa'], {
  cwd: __dirname,
  silent: false // 让子进程不共享父进程的标准输入和输出，使得子进程的输出不打印到父进程中
});

child.on('message', function(data) {
  console.log(data);
});

child.send({ name: 'aa' });
