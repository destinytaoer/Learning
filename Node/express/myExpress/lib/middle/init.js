function enhanceReq(req) {}
function enhanceRes(res) {
  res.render = function(filepath, options, callback) {
    function done(err, html) {
      res.setHeader('Content-Type', 'text/html;charset=utf8');
      res.end(html);
    }
    res.app.render(filepath, options, callback || done);
  };
}
function init(req, res, next) {
  enhanceReq(req);
  enhanceRes(res);
  next();
}
module.exports = init;
