let http = require('http');
let fs = require('fs');
let path = require('path');
let url = require('url');
// 配置一个白名单
const whiteList = ['tieba.baidu.com'];
http
  .createServer(function(req, res) {
    // refer 是引用，直接访问时没有带，在其他资源中引用了才会有
    let refer = req.headers['referer'] || req.headers['refer'];
    // 如果有 refer，则表示是从 HTML 页面中引用过来的
    if (refer) {
      let { hostname: curHostName } = url.parse(req.url, true);
      let { hostname: referHostName } = url.parse(refer, true);

      if (
        referHostName !== curHostName &&
        whiteList.indexOf(referHostName) < -1
      ) {
        // 如果域名不一致，那么就返回 forbidden 图片替换原来图片
        res.setHeader('Content-Type', 'image/png');
        fs.createReadStream(path.join(__dirname, 'forbidden.png')).pipe(res);
      }
    }
    res.setHeader('Content-Type', 'image/png');
    fs.createReadStream(path.join(__dirname, 'mm.png')).pipe(res);
  })
  .listen(8080);
