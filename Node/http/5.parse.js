/**
 * 解析请求
 */
let fs = require('fs');
let path = require('path');
let { StringDecoder } = require('string_decoder');
let sd = new StringDecoder();
let rs = fs.createReadStream(path.join(__dirname, '5.req.txt'));
function parse(socket, requestListener) {
  // 监听 readable 事件切换到暂停模式
  socket.on('readable', onReadable);
  // 为了后面移除监听，所以创建一个函数代替匿名函数
  function onReadable() {
    // 每次读取缓存区的全部内容，直到读完
    let buf = socket.read();
    let buffers = [];
    buffers.push(buf);
    let str = sd.write(Buffer.concat(buffers)); // 为了防止出现 \r\n 被分开以及请求头被分开的情况，所以要把前面的拼接在一起再进行匹配
    // 判断是否匹配到空行，即两个回车
    if (str.match(/\r\n\r\n/)) {
      // 匹配到，说明请求行和请求头都已经读取到了
      let requests = str.split('\r\n\r\n');
      // 第一个值就是请求行和请求头
      let header = requests.shift();
      // 由于请求体中可能也有空行，所以后面的要重新拼接在一起
      let body = Buffer.from(requests.join(''));
      // 由于流会读一点少一点，所以要把已经读出来的 body 再放回去
      // 但是这样做之后，可读流中还有数据，必将再次触发 readable 事件，重新解析一次，所以要移除 readable 监听
      socket.removeListener('readable', onReadable);
      socket.unshift(body);
      // 把解析出来的请求头数据都放入到 socket 中
      let values = parseHeader(header);

      socket[key] = values[key];
      return requestListener(socket);
    }
  }
}

// 解析请求行和请求头
function parseHeader(header) {
  // 使用回车分割成一行行
  let lines = header.split('\r\n');

  // 解析请求行
  let first = lines.shift();
  // 请求行中的值以空格分隔
  let values = first.split(' ');
  let method = values[0];
  let url = values[1];
  let protocol = values[2].split('/');
  let httpVersion = protocol[1];

  // 解析请求头
  let headers = {};
  lines.forEach(line => {
    let keyValue = line.split(': ');
    headers[keyValue[0]] = keyValue[1];
  });

  return { headers, method, url, httpVersion };
}
parse(rs, function(req) {
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers);
  console.log(req.httpVersion);
  req.on('data', function(data) {
    console.log(data.toString());
  });
});
