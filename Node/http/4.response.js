let http = require('http');
/**
 * 如何向客户端写入响应信息
 * - 设置响应行
 *    - 设置响应码
 * - 设置响应头
 * - 设置响应体
 */

let server = http.createServer(function(req, res) {
  // res.statusCode = 200; // 设置响应码
  // 默认响应头会设置 Date，如果不需要就设置为 false
  // res.sendDate = false;

  // res.setHeader('Content-Type', 'text/html;chartset=utf8'); // 设置响应头
  // res.setHeader('Content-Type', 'text/html;chartset=utf8'); // 设置响应头
  // console.log(res.getHeader('Content-Type')); // 获取响应头
  // res.removeHeader('Content-Type'); // 删除响应头
  // console.log(res.getHeader('Content-Type')); // 获取响应头

  // 设置状态码，原因短语，响应头
  // writeHead 一旦调用，会立刻向客户端发送
  res.writeHead(200, {
    'Content-Type': 'text/html;chartset=utf8'
  });

  // 当调用 writeHead 或者调用 write 后，就会把响应头发送给客户端

  // res 是可写流，响应体通过流写入
  res.write('hello');
  res.end();
});

server.listen(8080);
