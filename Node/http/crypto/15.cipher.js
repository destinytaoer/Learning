// 对称加密
let crypto = require('crypto');
let path = require('path');
let fs = require('fs');

let pk = fs.readFileSync(path.join(__dirname, 'rsa_private.key'));
let cipher = crypto.createCipher('blowfish', pk);

let str = '1234';
cipher.update(str, 'utf8');
let result = cipher.final('hex');
console.log(result);

// 解密
let decipher = crypto.createDecipher('blowfish', pk);
decipher.update(result, 'hex');
let r = decipher.final('utf8');
console.log(r);
