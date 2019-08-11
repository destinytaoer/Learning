let fs = require('fs');

// 截断文件
fs.truncate('./1.txt', 6, function(err) {});
