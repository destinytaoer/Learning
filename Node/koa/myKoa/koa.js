const http = require('http');
class Koa {
  constructor() {
    this.middleware = [];
  }
  use(fn) {
    this.middleware.push(fn);
    return this;
  }
  compose(middleware, ctx) {
    return function fnMiddleware() {
      function dispatch(i) {
        let fn = middleware[i];
        if (!fn) return Promise.resolve(); // 终止条件
        return Promise.resolve(
          // 返回一个 Promise
          fn(ctx, function next() {
            dispatch(i + 1);
          })
        );
      }
      return dispatch(0);
    };
  }
  handleResponse(ctx) {
    let body = ctx.body;
    let res = ctx.res;
    if (!body) {
      res.statusCode = 404;
      res.end('Not Found');
    }
    if (typeof body === 'string') {
      ctx.type = 'text';
      res.end(body);
    }
    //...
  }
  callback(req, res) {
    let ctx = { req, res };
    let fnMiddleware = this.compose(
      this.middleware,
      ctx
    );
    fnMiddleware()
      .then(() => {
        // 走完所有中间件之后
        this.handleResponse(ctx);
      })
      .catch(err => {
        console.log(err);
      });
  }
  listen(...args) {
    let self = this;
    let server = http.createServer(this.callback);
    server.listen(...args);
  }
}

module.exports = Koa;
