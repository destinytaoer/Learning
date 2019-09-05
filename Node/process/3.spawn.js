let { spawn } = require('child_process');
let path = require('path');
// 相当于 node test1.js aa
let p1 = spawn('node', ['test1.js', 'aa'], {
  // cwd 设置当前的工作目录
  cwd: path.join(__dirname, 'test1'),
  //pipe 在父进程 和子进程之间建立一个管道
  //如果放的是一个流，则意味着父进程和子进程共享一个流
  stdio: [process.stdin, process.stdout, 'pipe']
});

//每个进程 都会有标准输入流 标准输出流 错误输出流 当这些流关闭的时候会触发 close 事件
// 先退出，再关闭
p1.on('exit', function() {
  console.log('p1 exit');
});
p1.on('close', function() {
  console.log('p1 close');
});
p1.on('err', function(err) {
  console.log('p1 start error', err);
});

let p2 = spawn('node', ['test2.js'], {
  cwd: path.join(__dirname, 'test1'),
  // 三个值对应 stdout stdin stderr
  stdio: ['pipe', 'pipe', 'pipe']
});

//一旦指定了 pipe，则意味着可以在父进程里得到子进程的对应的标准输入、标准输出和标准错误输出，即得到的 p2.stdout p2.stdin p2.stderr

// p2.stdout.on('data', function(data) {
//   console.log(data.toString());
//   p2.stdin.write(data);
// });

p2.stdin.write('aa'); //=>
