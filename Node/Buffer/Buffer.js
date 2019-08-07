/* Buffer.alloc */
// 分配一个长度为 6 个字节的 Buffer
// 会把原有数据全部抹掉，然后重置为某个值，默认 0
// 可以提供第二个参数为默认值
let buf1 = Buffer.alloc(6);
console.log(buf1); // <Buffer 00 00 00 00 00 00>
let buf2 = Buffer.alloc(6, 2);
console.log(buf2); // <Buffer 02 02 02 02 02 02>

/* Buffer.allocUnsafe */
// 分配一块没有初始化的内存，没有抹除数据
let buf3 = Buffer.allocUnsafe(6);
console.log(buf3);

/* Buffer.from */
// 给一个字符串分配内存
let buf4 = Buffer.from('aa');
console.log(buf4); //<Buffer 61 61> 一个英文字母分配一个字节
let buf5 = Buffer.from('中国');
console.log(buf5); //<Buffer e4 b8 ad e5 9b bd> 一个汉字分配三个字节

/* fill */
let buf6 = Buffer.alloc(4);
console.log(buf6); // <Buffer 00 00 00 00>
// 1. 填充的值，2. 开始索引，3. 结束索引
buf6.fill(3, 1, 3);
console.log(buf6); // <Buffer 00 03 03 00>

/* write */
// 1. 写入的字符 2. 写入开始索引 3. 写入长度 4. 编码
buf6.write('中国', 0, 3, 'utf8');
console.log(buf6); // <Buffer e4 b8 ad 00> 中

/* writeInt8 */
let buf7 = Buffer.alloc(6);
// 向指定的索引写入一个 8 位的整数，-128 - 127 之间的整数
buf7.writeInt8(0, 0);
buf7.writeInt8(16, 1);
buf7.writeInt8(32, 2);
// buf7.writeInt8(256, 3); // 超过范围则报错
console.log(buf7); // <Buffer 00 10 20 00 00 00>

/* writeInt16BE writeInt16LE */
let buf8 = Buffer.alloc(4);
// 16 位有两个字节组成，分为高和低字节
// Big Endian BE 高字节在前
// Little Endian LE 低字节在前
buf8.writeInt16BE(256, 0);
console.log(buf8); // <Buffer 01 00 00 00>
buf8.writeInt16LE(256, 2);
console.log(buf8); // <Buffer 01 00 00 01>

/* toString */
console.log(buf8.toString());

/* slice */
let buf9 = Buffer.alloc(6);
let buf10 = buf9.slice(0, 3);
console.log(buf10); // <Buffer 00 00 00>
// 实际上是浅拷贝，存储的是指针
buf10.fill(3, 0, 1);
console.log(buf9);

/* string_decoder 为了解决乱码问题 */
let buf11 = Buffer.from('长江黄河');
let buf12 = buf11.slice(0, 5); // 5 个字节
let buf13 = buf11.slice(5); // 7 个字节
console.log(buf12.toString()); // 长� 截取不完整导致乱码问题
let { StringDecoder } = require('string_decoder');
console.log(StringDecoder);
let sd = new StringDecoder();
// write 读取 buffer 内容，返回一个字符串
// 把是字符的字节转换成字符串输出，会把不是字符的字节进行缓存，下一次先把缓存的字节放在开头，然后再进行转换
//  同一个实例应该处理连续的字符
console.log(sd.write(buf12));
console.log(sd.write(buf13));

/* concat */
let buf14 = Buffer.from('中');
let buf15 = Buffer.from('国');
Buffer.concat = function(
  list,
  total = list.reduce((len, item) => len + item.length, 0)
) {
  if (list.length === 1) {
    return list[0];
  }
  let result = Buffer.alloc(total);
  let index = 0;
  for (let buf of list) {
    for (let b of buf) {
      if (index >= total) return result;
      result[index++] = b;
    }
  }
  return result;
};
let result = Buffer.concat([buf14, buf15]);
console.log(result.toString());

/* copy */
let buf16 = Buffer.from('中国');
let buf17 = Buffer.alloc(3);
buf16.copy(buf17, 0, 0, 4);
console.log(buf17.toString()); // 中

/* base64 转换 */
const CHARTS =
  'QWERTYUIOPSADFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890+/';
function transfer(str) {
  let buf = Buffer.from(str);
  let result = '';
  for (let b of buf) {
    result += b.toString(2);
  }
  return result
    .match(/(\d{6})/g)
    .map(val => parseInt(val, 2))
    .map(val => CHARTS[val])
    .join('');
}
let r = transfer('中'); //6Aoz
console.log(r);
