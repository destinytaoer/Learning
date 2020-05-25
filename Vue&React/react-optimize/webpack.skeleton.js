const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const base = require('./webpack.base');
const { smart } = require('webpack-merge');

module.exports = smart(base, {
  target: 'node',
  entry: './src/skeleton.js',
  output: {
    filename: 'skeleton.js',
    // 导出库的方式
    libraryTarget: 'commonjs2',
  },
});
