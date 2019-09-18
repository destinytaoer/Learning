const Layer = require('./layer');
const slice = Array.prototype.slice;
function Route(path) {
  this.path = path;
  this.stack = [];
}

Route.prototype.get = function() {
  let handlers = slice.call(arguments);
  for (let i = 0; i < handlers.length; i++) {
    let layer = new Layer('/', handlers[i]);
    layer.method = 'get';
    this.stack.push(layer);
  }
  return this;
};

Route.prototype.dispatch = function(req, res, out) {};
module.exports = Route;
