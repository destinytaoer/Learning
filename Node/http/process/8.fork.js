// send 方法其实可以有两个参数，第一个参数是任意类型的消息，第二个参数只能是 http server、net server、socket
let { fork } = require('child_process');
let http = require('http');
let path = require('path');
let os = require('os');

let server = http.createServer(function(req, res) {
  res.setHeader('Content-Type', 'text/html;charset=utf8');
  res.end('请求被父进程处理');
});
server.listen(8080);
// 根据 cpu 数量来设置启动的服务数

for (let i = 0; i < os.cpus.length; i++) {
  let p1 = fork('8.server.js', [], {
    cwd: __dirname
  });
  p1.send('server', server);
}
