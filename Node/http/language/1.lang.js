let http = require('http');
let server = http.createServer(request);
server.listen(8080);

// 多语言时，一般都会有语言包
const lanPack = {
  en: {
    title: 'welcome'
  },
  zh: {
    title: '欢迎光临'
  }
};

function request(req, res) {
  // 实现服务器和客户端的协商，选择客户端最想要，而且服务器端有的
  // Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,jp;q=0.7
  let acceptLanguage = req.headers['accept-language'];
  console.log(acceptLanguage);
  if (acceptLanguage) {
    let lanArr = acceptLanguage
      .split(',')
      .map(function(item) {
        let values = item.split(';');
        let lan = values[0];
        let q = values[1] ? parseFloat(values[1].split('=')[1]) : 1;
        return { lan, q };
      })
      .sort((a, b) => b.q - a.q);
    let lan = lanArr.shift().lan;
    const defaultLan = 'en';
    while (lan && !lanPack[lan]) {
      lan = lanArr.shift().lan;
    }
    if (!lanArr.length && !lanPack[lan]) {
      lan = defaultLan;
    }
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    res.end(lanPack[lan].title);
    // res.end(getLan('title')) 封装一个 getLan 方法进行内部处理
  }
}
