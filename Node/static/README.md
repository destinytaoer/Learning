## 实现静态文件服务器

可以在任意目录下启动一个静态文件服务器，并且把当前目录作为静态文件根目录。

用法：

```bash
server -d 指定静态文件根目录 -p 指定端口号 -o 指定监听的主机
```

### chalk 插件

chalk(粉笔)模块，使得命令行打印出来有颜色的输出，使用：

```js
let chalk = require('chalk');console.log(chalk.green('hello world'))
```

### debug 插件

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