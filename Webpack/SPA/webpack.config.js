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
  // 1. 源码映射, 会单独生成一个 sourcemap 文件
  // 如果报错了, 会标识出源码中报错的行和列
  // devtool: ' source-map', // 增加映射文件, 帮助我们调试源代码
  // 2. 也是源码映射, 但是不会生成单独的文件, 而是一起打包到 JS 文件中, 报错时仍然会显示源码中的行和列
  // devtool: 'eval-source-map',
  // 3. 报错只显示行, 不会显示列, 但是是一个单独的映射文件
  // devtool: 'cheap-module-source-map', // 产生后,可以保留起来,后面用于调试
  // 4. 报错只显示行, 不会显示列, 也不会产生单独文件,集成在打包后的文件中
  devtool: 'cheap-module-eval-source-map',
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
