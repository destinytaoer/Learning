const Koa = require('koa');
const app = new Koa();

app.use(async function(ctx, next) {
  /**
   * 1. 字符串
   * 2. buffer
   * 3. 对象
   * 4. 流
   */
  // ctx.body = 'response';
  ctx.res.write('response'); // ？？为什么还是起作用了
  ctx.response.body = 'response';
  // ctx.res.end('response');
});
app.listen(8080);
