const { smart } = require('webpack-merge');
const base = require('./webpack.base');

module.exports = smart(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        cache: true, // 缓存
        parallel: true, // 是否并发打包
        sourceMap: true // ES5 - ES6 的代码映射, 方便调试, 因为代码都打包成 ES5 了
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('prod')
    })
  ]
});
