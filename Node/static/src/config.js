let path = require('path');
let debug = require('debug')('static:config');
// 默认配置
let config = {
  host: 'localhost',
  port: '8080',
  root: path.resolve(__dirname, '..', 'public')
};
debug(config);
module.exports = config;
