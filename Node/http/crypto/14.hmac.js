let crypto = require('crypto');
let path = require('path');
let fs = require('fs');
let key = fs.readFileSync(path.join(__dirname, 'rsa_private.key'));

let hmac = crypto.createHmac('sha1', key);
hmac.update('123');
let result = hmac.digest('hex');
console.log(result);
