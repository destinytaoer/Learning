// 集群 很多个
let cluster = require('cluster');
let http = require('http');
let path = require('path');
let cpus = require('os').cpus().length;
cluster.setupMaster({
  exec: path.join(__dirname, '6.subprocess.js')
});
// 在主分支中可以 创建子进程
for (let i = 0; i < cpus; i++) {
  cluster.fork();
}
