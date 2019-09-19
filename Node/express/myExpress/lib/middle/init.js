const url = require('url');
function enhanceReq(req) {
  let { pathname, query } = url.parse(req.url, true);
  req.path = pathname;
  req.query = query;
  req.hostname = req.headers['host'].split(':')[0];
}
function enhanceRes(res) {
  res.render = function(filepath, options, callback) {
    function done(err, html) {
      res.setHeader('Content-Type', 'text/html;charset=utf8');
      res.end(html);
    }
    res.app.render(filepath, options, callback || done);
  };
  res.json = function(obj) {
    res.setHeader('Content-Type', 'application/json');
    const str = JSON.stringify(obj);
    res.end(str);
  };
  res.send = function(msg) {
    let type = typeof msg;
    if (type == 'object') {
      res.json(msg);
    } else if (type == 'number') {
      res.setHeader('Content-Type', 'application/plain');
      res.status(msg);
      res.end(http.STATUS_CODES[msg]);
    } else {
      res.setHeader('Content-Type', 'application/html');
      res.end(msg);
    }
  };
}
function init(req, res, next) {
  enhanceReq(req);
  enhanceRes(res);
  next();
}
module.exports = init;
