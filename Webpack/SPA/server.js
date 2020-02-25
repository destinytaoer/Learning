const express = require('express');
const webpack = require('webpack');
const webpackDevMiddle = require('webpack-dev-middleware');

const app = express();

const config = require('./webpack.config');
const compiler = webpack(config); // 传入配置生成一个编译器

app.use(webpackDevMiddle(compiler));

app.get('/user', (req, res) => {
  res.end('hello');
});

app.listen(3000);
