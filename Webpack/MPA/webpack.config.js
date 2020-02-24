const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    // 多入口
    home: './src/index.js',
    other: './src/other.js'
  },
  output: {
    // 通过 name 标识来设置多个出口
    // name 为 entry 中的属性: home other
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // new 两个 HTML 插件, 解析两个文件到 dist 目录下
    // 这样做会使得两个 JS 模块都会放到这个两个 HTML 中, 不符合预想
    // 预想中: index.html 引入 index.js, other.html 引入 other.js
    // 利用 chunks 来标识需要引入的入口模块, 没有 chunks 标识则全部都引入
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template: './other.html',
      filename: 'other.html',
      chunks: ['other']
    })
  ]
};
