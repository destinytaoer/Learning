const Koa = require('koa');
const querystring = require('querystring');
const app = new Koa();

app.listen(8080);

// GET /user 返回空白表单
// POST /user 表示提交表单数据
app.use(async function(ctx, next) {
  if (ctx.url === '/user' && ctx.method === 'GET') {
    // ctx.set('Content-Type', 'text/html;chartset=utf8');
    ctx.type = 'html';
    ctx.body = `
        <form method="POST">
          <input type="text" name="username"/>
          <input type="submit"/>
        </form>
      `;
  } else if (ctx.url === '/user' && ctx.method === 'POST') {
    let result = await parse(ctx.req);
    ctx.type = 'json';
    ctx.body = result;
  } else {
    await next();
  }
});

function parse(req) {
  return new Promise(function(resolve, reject) {
    let buffer = [];
    req.on('data', function(data) {
      buffer.push(data);
    });
    req.on('end', function() {
      let result = Buffer.concat(buffer);
      resolve(querystring.parse(result.toString()));
    });
  });
}
