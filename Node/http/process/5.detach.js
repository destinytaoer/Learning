/**
 * 默认父进程会等待所有的子进程全部完成之后才能退出，但是如果为子进程设置 detached = true，则此子进程将脱离父进程独立存在
 */
let { spawn } = require('child_process');
let fs = require('fs');
let path = require('path');

let fd = fs.openSync(path.join(__dirname, 'msg.txt'), 'w');
let p1 = spawn('node', ['test4.js'], {
  cwd: path.join(__dirname, 'test1'),
  stdio: ['ignore', fd, 'ignore'],
  detached: true
});

// 让父进程先退出，子进程继续执行
p1.unref();
