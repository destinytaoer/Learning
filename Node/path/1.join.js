const path = require('path');

// 连接两个目录
console.log(path.join('a\\', '\\b'));
// 使用 \ 或 / 连接两个目录
// 由于操作系统可能不同，目录的连接符可能不一样，所以不能直接使用字符串拼接的方式，而是使用 join 方法
