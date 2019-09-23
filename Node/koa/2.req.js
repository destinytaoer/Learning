const Koa = require('koa');
const app = new Koa();

app.use(async function(ctx, next) {
  console.log(ctx.method); // 获取请求方法
  console.log(ctx.url); // 获取请求URL
  console.log(ctx.querystring); // 获取原始查询字符串
  console.log(ctx.query); // 获取解析的查询字符串对象
  console.log(ctx.headers); // 获取请求头对象
  await next();
});

app.listen(8080);
