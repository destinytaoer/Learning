// 监视文件或目录的变化，当文件发生变化之后执行对应回调函数
let fs = require('fs');
// 运行时会先直接执行回调
fs.watchFile('a.txt', function(newStat, prevStat) {
  console.log('文件变化了');
  console.log(Date.parse(newStat.ctime));
  console.log(Date.parse(prevStat.ctime));
  if (Date.parse(prevStat.ctime) === 0 && Date.parse(newStat.ctime) !== 0) {
    // 修改前没有创建时间，修改后有时间
    console.log('新增文件');
  } else if (
    Date.parse(prevStat.ctime) !== 0 &&
    Date.parse(newStat.ctime) === 0
  ) {
    console.log('删除文件');
  } else if (Date.parse(prevStat.ctime) !== Date.parse(newStat.ctime)) {
    console.log('修改文件');
  }
});
