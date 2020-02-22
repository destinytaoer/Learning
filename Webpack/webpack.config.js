// webpack 是基于 Node 的
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, // 去除属性中的引号
        collapseWhitespace: true // 折叠空格, 会将代码变成一行
      },
      hash: true // 给引入的打包文件一个 hash 戳,防止缓存生效
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css' // 抽离出来的文件名
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      }
    ]
  }
};
