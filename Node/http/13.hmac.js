let crypto = require('crypto');
let path = require('path');
let hamc = crypto.createHmac('sha1', 'abc');
hamc.update('123');
console.log(hmac.digest('hex'));
