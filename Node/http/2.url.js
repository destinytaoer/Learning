let url = require('url');

let str = 'http://user:pwd@localhost:8080/user?id=5#top';

let urlObj = url.parse(str);
console.log(urlObj); // query: 'id=5'
// protocol: 'http:',
// slashes: true,
// auth: 'user:pwd',
// host: 'localhost:8080',
// port: '8080',
// hostname: 'localhost',
// hash: '#top',
// search: '?id=5',
// query: 'id=5',
// pathname: '/user',
// path: '/user?id=5',
// href: 'http://user:pwd@localhost:8080/user?id=5#top'

// 接受第二个参数，默认解析的对象中的 query 是字符串，设置为 true 之后，query 是对象
let urlObj2 = url.parse(str, true);
console.log(urlObj2); // query: { id: '5' }

// url 对象转换为字符串
console.log(url.format(urlObj));
