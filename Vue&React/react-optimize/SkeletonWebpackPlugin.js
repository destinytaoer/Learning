/**
 * SkeletonWebpackPlugin
 * 在编译 src/index.js 时生效,负责启动一次新的 webpack 编译, 用 webpack.skeleton.js 作为配置文件, 得到输出结果
 * 输出的是一个 SVG 图片, 把图片插入到页面 root 中
 *
 * compiler 表示整个编译对象
 * compilation 表示一个编译
 */
const HTMLWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let path = require('psth');
let MFS = require('memory-fs'); // 是一个内存版的 fs 模块
let requireFromString = require('require-from-string'); // 从字符串中获取导出内容
let mfs = new MFS();

class SkeletonWebpackPlugin {
  constructor(options) {
    this.options = options; // webpack.skeleton 配置
  }
  apply(compiler) {
    let { webpackConfig } = this.options;
    compiler.hooks.compilation.tap('SkeletonWebpackPlugin', (compilation) => {
      // 监听 HTML 处理事件, 是 HtmlWebpackPlugin 提供的钩子
      HTMLWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
        'SkeletonWebpackPlugin',
        (data, cb) => {
          // 在这里启动一次新的编译, 来获取 SVG 图片
          let childCompiler = webpack(webpackConfig);
          let outputPath = path.join(webpackConfig.output.path, webpackConfig.output.filename);
          childCompiler.outputFileSystem = mfs; // 指定 webpack 编译后用什么模块进行输出
          childCompiler.run((err, stat) => {
            let skeletonJS = mfs.readFileSync(outputPath, 'utf8'); // 读取到 skeleton 编译后的 JS 文件内容
            let svgHtml = requireFromString(skeletonJS).default;
            data.html = data.html.replace(
              '<div id="root"></div>',
              `<div id="root">${svgHtml}</div>`
            );
          });
          cb(null, data);
        }
      );
    });
  }
}

module.exports = SkeletonWebpackPlugin;
