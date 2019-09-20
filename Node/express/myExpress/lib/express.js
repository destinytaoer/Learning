const Router = require('./router');
const Application = require('./application');
const static = require('./middle/static');
function createApplicaton() {
  return new Application(); // 抽离 app 对象
}
createApplicaton.Router = Router;
createApplicaton.static = static;
module.exports = createApplicaton;
