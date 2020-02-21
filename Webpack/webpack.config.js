// webpack 是基于 Node 的
let path = require('path');
module.exports = {
  devServer: {
    port: 5000,
    open: true,
    contentBase: './dist',
    progress: true
  },
  // 模式, 默认有两种: production/development
  mode: 'development',
  entry: './src/index.js', // 入口
  output: {
    // 打包后的文件名
    filename: 'bundle.js',
    // 路径必须是绝对路径
    path: path.resolve(__dirname, 'dist')
  }
};
