const querystring = require('querystring');
const qs = require('qs');
let bodyParser = {
  text: function() {
    return function(req, res, next) {
      let contentType = req.headers['content-type'];
      if (contentType === 'text/plain') {
        let buffer = [];
        req.on('data', function(data) {
          buffer.push(data);
        });
        req.on('end', function() {
          buffer = Buffer.concat(buffer);
          req.body = buffer.toString();
          next();
        });
      } else {
        next();
      }
    };
  },
  json: function() {
    return function(req, res, next) {
      let contentType = req.headers['content-type'];
      if (contentType === 'application/json') {
        var buffer = [];
        req.on('data', function(data) {
          buffer.push(data);
        });
        req.on('end', function() {
          buffer = Buffer.concat(buffer);
          let result = buffer.toString();
          try {
            req.body = JSON.parse(result);
          } catch (e) {
            req.body = require('querystring').parse(result);
          }
          next();
        });
      } else {
        next();
      }
    };
  },
  urlencoded: function(options) {
    let { extended } = options;
    return function(req, res, next) {
      let contentType = req.headers['content-type'];
      if (contentType === 'application/x-www-form-urlencoded') {
        let buffer = [];
        req.on('data', function(data) {
          buffer.push(data);
        });
        req.on('end', function() {
          buffer = Buffer.concat(buffer);
          let result = buffer.toString();
          if (extended) {
            // qs 可以支持嵌套对象，而 querystring 不行
            // {name: 'aa', home: {name:'shenzhen'}}
            req.body = qs.parse(result);
          } else {
            req.body = querystring.parse(result);
          }
          next();
        });
      } else {
        next();
      }
    };
  }
};
module.exports = bodyParser;
