const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: {
    port: 3000,
    contentBase: './dist'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    // 配置不需要 webpack 解析依赖关系的模块, 因为 jquery 是独立的包, 不存在其它依赖
    noParse: /jquery/,
    rules: [
      {
        test: /\.(js|jsx)$/,
        // 排除或者限制查找范围, 只使用一个即可
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 引用 DLL 插件
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    }),
    // 忽略掉 moment 引入 locale 语言包
    new webpack.IgnorePlugin({ resourceRegExp: /\.\/locale/, contextRegExp: /moment/ }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ]
};
