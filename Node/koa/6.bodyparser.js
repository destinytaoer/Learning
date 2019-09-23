const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();

app.listen(8080);
app.use(bodyParser());
// GET /user 返回空白表单
// POST /user 表示提交表单数据
app.use(async function(ctx, next) {
  if (ctx.url === '/user' && ctx.method === 'GET') {
    // ctx.set('Content-Type', 'text/html;chartset=utf8');
    ctx.type = 'html';
    ctx.body = `
        <form method="POST" enctype="multipart/form-data">
          <input type="text" name="username"/>
          <input type="file" name="avatar"/>
          <input type="submit"/>
        </form>
      `;
  } else if (ctx.url === '/user' && ctx.method === 'POST') {
    // 当使用 bodyParser 中间件之后，会解析请求体赋给 ctx.request.body
    ctx.type = 'json';
    ctx.body = ctx.request.body;
  } else {
    await next();
  }
});
