// 集群 很多个
let cluster = require('cluster');
let http = require('http');
let cpus = require('os').cpus().length;
// 根据 cpu 的核数 创建多个进程
// 可以通过 ipc 的方式进行进程之间的通信，默认不支持管道的方式
if (cluster.isMaster) {
  // 是否是主进程
  cluster.setupMaster({
    stdio: 'pipe'
  });
  // 在主分支中可以 创建子进程
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  http
    .createServer(function(req, res) {
      res.end('ok' + process.pid);
    })
    .listen(3000);
}
// cluster.on('disconnect',function(){
//     console.log('断开连接')
// })
// cluster.on('fork',function(worker){

// });
// cluster.on('exit',function(){
//     console.log('exit')
// })
