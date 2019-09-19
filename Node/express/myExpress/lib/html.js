let fs = require('fs');
function render(filepath, data, callback) {
  fs.readFile(filepath, 'utf8', function(err, str) {
    if (err) callback(err, undefined);
    let head = 'let tpl = "";\nwith (obj) {\ntpl+=`';
    str = str.replace(/<%=(.+?)%>/g, function() {
      return '${' + arguments[1] + '}';
    });
    str = str.replace(/<%(.+?)%>/g, function() {
      return '`;\n' + arguments[1] + '\n tpl+=`';
    });
    let tail = '`\n}\n return tpl;';
    let html = head + str + tail;
    let fn = new Function('obj', html);
    let result = fn(data);
    callback(null, result);
  });
}
module.exports = render;
