let fs = require('fs');
let path = require('path');
let buf = Buffer.alloc(1024 * 1024 * 256, 8); // 每个字节都是 8
fs.writeFileSync(path.join(__dirname, '1.test'), buf);
