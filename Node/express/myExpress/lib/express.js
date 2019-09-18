const Router = require('./router');
const Application = require('./application');
function createApplicaton() {
  return new Application(); // 抽离 app 对象
}
createApplicaton.Router = Router;
module.exports = createApplicaton;
