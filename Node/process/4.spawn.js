let { spawn } = require('child_process');
let path = require('path');

let p1 = spawn('node', ['test3.js', 'aa'], {
  cwd: path.join(__dirname, 'test1'),
  stdio: ['ipc', process.stdout, 'ignore']
});
// ipc 表示父子进程之间通过消息进行通信
p1.on('message', function(msg) {
  console.log(msg);
});
p1.send('hello');
