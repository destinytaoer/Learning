// 实现原生的 path-to-regexp 模块
function pathToRegexp(path, keys) {
  path = path + '/';
  path = path.replace(/:([^\/]+)/g, function() {
    keys.push({
      name: arguments[1],
      optional: false,
      offset: arguments[2]
    });
    return '(?:([^/]+?))';
  });
  path = '^' + path + '?$';
  return new RegExp(path, 'i');
}
// let pathToRegexp = require('path-to-regexp');
let path = '/user/:uid/:name';

let keys = [];
let result = pathToRegexp(path, keys);
console.log(result);
// /^\/user\/(?:([^\/]+?))\/(?:([^\/]+?))\/?$/i;
// /^\/user\/(?:([^\/]+?))\/(?:([^\/]+?))\/?$/i;
console.log(keys);
// [
//   { name: 'uid', optional: false, offset: 7 },
//   { name: 'name', optional: false, offset: 22 }
// ];
