// webpack 是基于 Node 的
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
let webpack = require('webpack');

module.exports = {
  devServer: {
    port: 5000,
    // open: true,
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
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-withimg-loader'
      },
      // {
      //   test: /\.(png|gif|jpg)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       esModule: false,
      //       outputPath: 'assets' // 打包后放置的目录
      //     }
      //   }
      // },
      {
        test: /\.(png|gif|jpg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1,
            esModule: false,
            outputPath: 'assets'
          }
        }
      },
      // {
      //   test: require.resolve('jquery'),
      //   use: { loader: 'expose-loader', options: '$' }
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-transform-runtime'
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyjsWebpackPlugin({
        cache: true, // 缓存
        parallel: true, // 是否并发打包
        sourceMap: true // ES5 - ES6 的代码映射, 方便调试, 因为代码都打包成 ES5 了
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  }
};
