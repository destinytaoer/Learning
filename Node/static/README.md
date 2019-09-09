## 实现静态文件服务器

可以在任意目录下启动一个静态文件服务器，并且把当前目录作为静态文件根目录。

用法：

```bash
server -d 指定静态文件根目录 -p 指定端口号 -o 指定监听的主机
```

### chalk 模块

chalk(粉笔)模块，使得命令行打印出来有颜色的输出，使用：

```js
let chalk = require('chalk');console.log(chalk.green('hello world'))
```

### debug 模块

控制 console.log 是否进行输出，用于代替 console.log 使用。

每个 debug 实例都有一个名字，名称最好由两个部分组成：第一部分一般是项目名，第二部分是模块名

```js
let debug = require('debug')('projectName:moduleName');
```

是否输出取决于环境变量中 DEBUG 的值是否等于其名字。

通过命令行 set DEBUG=xxx 设置环境变量名

```bash
# Windows
set DEBUG=xxx
set DEBUG=projectName:* # 使得项目下所有模块的 debug 都打印出来
# Mac
export DEBUG=xxx
```

使用：直接替换 console.log 即可

```js
debug(`server started at ${chalk.green(url)}`);
```

> 最重要的用途是：可以通过改变环境变量，来控制是否输出某个模块的 log

环境变量只在当前窗口生效，可以设置在全局中，系统设置 -> 高级设置 -> 环境变量 -> 增加一个值

在代码中修改环境变量：

```js
// 获取环境变量值
console.log(process.env);
process.env.DEBUG = 'static:*';
```

### supervisor 全局插件

需要全局安装。会监听 js 文件的变化，然后自动重新启动

使用：

```bash
supervisor xxx.js
```

### yargs 模块

拓展命令行工具。

在 bin 目录下，编写一个 www 文件，名字是自定义的，不是固定的，并且文件不带任何后缀名
```js
// 前面的这一串是为了兼容 mac
#! /usr/bin/env node

let yargs = require('yargs')
let Server = require('../src/app.js')
// yargs 配置命令行，获取到参数
let argv = yargs.option('d', {
  alias: 'root',
  demand: 'false',
  type: 'string',
  default: process.cwd(),
  description: '静态文件根目录'
}).option('o', {
  alias: 'host',
  demand: 'false',
  type: 'string',
  default: 'localhost',
  description: '配置监听的主机'
}).option('p', {
  alias: 'port',
  demand: 'false',
  type: 'number',
  default: '8080',
  description: '配置监听的端口号'
})
.usage('server [options]')
.example('server -d / -p 9090 -o localhost', '在本地的 9090 端口上监听客户端的请求')
.help('h').argv;

// 根据参数启动静态服务器
let server = new Server(argv);
server.start(); // 启动服务
```

在 package.json 中添加命令：

```json
{
  //...
  "bin": {
    "server": "bin/www"
  },
  //...
}
```

在命令行中执行 server 就会执行 bin/www 文件

然后测试，使用 npm link，会在 bin 文件放到本地的全局 npm 中，就可以在任意文件夹使用 server 命令开启静态服务器