const http = require('http');
class Koa {
  constructor() {
    this.middleware = [];
  }
  use(fn) {
    this.middleware.push(fn);
  }
  listen(...args) {
    let self = this;
    let server = http.createServer((req, res) => {
      let ctx = { req, res };
      // koa2.0和3.0的原理
      // next(0);
      // function next(idx) {
      //   if (idx >= self.middleware.length) return;
      //   self.middleware[idx](ctx, () => next(idx + 1));
      // }
      // 另一种写法 koa1.0 的原理
      self.middleware.reduceRight(
        (val, item) => {
          return item.bind(null, ctx, val);
        },
        function() {}
      )();
    });
    server.listen(...args);
  }
}

module.exports = Koa;
