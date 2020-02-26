const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '_dll_[name].js', // 产生的文件名
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]' // 库名
    // libraryTarget: 'umd' // 库的形式, 默认 var
  },
  plugins: [
    new webpack.DllPlugin({
      // 生成清单,可以找到对应模块文件
      name: '_dll_[name]', // name === library
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    })
  ]
};
