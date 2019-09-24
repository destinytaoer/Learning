/**
 * 文件上传的请求体类型
 * Content-Type: multipart/form-data;  boundary=----WebKitFormBoundaryxEGkexSyRjAwb95C
 *
 * '--' + boundary 是分割符，前面多两个杠
 * ------WebKitFormBoundaryxEGkexSyRjAwb95C
 * Content-Disposition: form-data; name="username"
 *
 * aaa
 * ------WebKitFormBoundaryxEGkexSyRjAwb95C
 * Content-Disposition: form-data; name="username"; filename="xxx.txt"
 * Content-Type: application/octet-stream
 *
 * 123
 * ------WebKitFormBoundaryxEGkexSyRjAwb95C--
 * 以 -- 结束
 */
const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const uuid = require('uuid');
const querystring = require('querystring');
const app = new Koa();
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
app.listen(8080);

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
    let contentType = ctx.headers['content-type'];

    if (contentType.includes('multipart/form-data')) {
      // 说明包含有文件
      let matches = contentType.match(/\bboundary=(.+)/);
      let sep = '--' + matches[1]; // 获取到分割符
      ctx.body = await getBody(ctx.req, sep);
    } else {
      await next();
    }
  } else {
    await next();
  }
});

function getBody(req, sep) {
  return new Promise(function(resolve, reject) {
    let buffers = [];
    req.on('data', function(data) {
      buffers.push(data);
    });
    req.on('end', function() {
      let result = Buffer.concat(buffers);
      let fields = {};
      // 由于 result 中包含有文件二进制内容，所以不能直接转换为字符串
      // 但是 buffer 没有 split 方法，所以需要自行实现一个
      let lines = result.split(sep);
      lines = lines.slice(1, -1); // 去掉首尾 '' 和 '--'
      lines.forEach(line => {
        let [desc, val] = line.split('\r\n\r\n'); // 空行分隔
        // desc 都是字符，所以可以直接转换
        // 里面存在多余的 " 需要删掉
        desc = desc.toString().replace(/"/g, '');
        // 将 desc 里面的 name，filename 解析出来
        val = val.slice(0, -2); // 去掉后面多余的 \r\n
        if (desc.includes('filename')) {
          // 如果是文件
          /*
              {
                "size": 82093,
                "path": "e:\\命运\\web\\learn\\learning\\Node\\koa\\uploads\\upload_799ad19382d6e9704161402dc6d3aaf9",
                "name": "正式01.pdf",
                "type": "application/pdf",
                "mtime": "2019-09-24T07:42:55.090Z"
              }
           */
          // 保存文件、得到路径、大小、类型、mtime
          // 文件的描述有两行
          let [, line1, line2] = desc.split('\r\n');
          let line1obj = querystring.parse(line1, '; ');
          let line2obj = {};
          line2.split('; ').forEach(item => {
            let [key, val] = item.split(': ');
            line2obj[key.toLowerCase()] = val;
          });

          let filepath = path.join(__dirname, 'uploads', uuid.v4());
          fs.writeFileSync(filepath, val);
          let stat = fs.statSync(filepath);
          console.log(stat);
          fields[line1obj.name] = [
            {
              name: line1obj.filename,
              type: line2obj['content-type'],
              path: filepath,
              size: stat.size,
              mtime: stat.mtime
            }
          ];
        } else {
          // 不是文件
          let name = querystring.parse(desc, '; ').name;
          fields[name] = val.toString();
        }
      });
      resolve(fields);
    });
  });
}
