const { smart } = require('webpack-merge');
const base = require('./webpack.base');

module.exports = smart(base, {
  mode: 'development',
  devServer: {
    // 1. 使用 proxy 代理
    // 2. 使用 before 钩子,只适用于 mock 服务
    // 3. 在 express 中启动 webpack 服务
    // before(app) {
    //   app.get('/user', (req, res) => {
    //     res.end('hello');
    //   });
    // },
    port: 5000,
    // open: true,
    contentBase: './dist',
    progress: true
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000', // 代理至 3000 端口
    //     pathRewrite: {
    //       '/api': '' // 将 /api 替换掉
    //     }
    //   }
    // }
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('dev')
    })
  ]
});
