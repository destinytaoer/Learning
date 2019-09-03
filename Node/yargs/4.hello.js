let yargs = require('yargs');
// yargs 可以帮助我们解析命令行参数，把参数数组转换为对象形式

let argv = yargs
  .options('n', {
    alias: 'name', // 别名
    demand: true, // 必填
    default: 'aa', // 默认值
    description: '请输入你的别名' // 描述
  })
  .usage('hello [options]') // 用法，help 展示的
  .alias('h', 'help') // 别名
  .help() // 帮助信息
  .example('hello --name aa', '执行 hello 命令，然后传入 name 参数为 aa').argv; // 例子
console.log(argv);
