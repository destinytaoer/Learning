const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
let readFile = promisify(fs.readFile);
const app = new Koa();

app.use(async function(ctx, next) {
  ctx.body = await readFile(path.join(__dirname, '4.txt'), 'utf8');
  // 回调的形式不会生效
  // fs.readFile(path.join(__dirname, '4.txt'), 'utf8', function (data) {
  //   ctx.body = data;
  // });
});

app.listen(8080);
