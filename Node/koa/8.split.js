Buffer.prototype.split = function(sep) {
  let pos = 0; // 当前位置
  let sepLen = sep.length; // 分割符的长度
  let parts = []; // 分割出的部分
  let index = -1; // 找到的索引位置
  while (-1 !== (index = this.indexOf(sep, pos))) {
    // 如果找到了
    parts.push(this.slice(pos, index));
    pos = index + sepLen;
  }
  // 最后的部分
  parts.push(this.slice(pos));
  return parts;
};

let buf = Buffer.from('12**34**56');
console.log(buf);
console.log(buf.split('**'));
