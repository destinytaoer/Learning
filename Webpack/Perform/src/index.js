console.log('a');

import $ from 'jquery';
import moment from 'moment';

// moment 会默认加载所有的语言包, 导致 bundle 比较大,
// 此时需要忽略掉所有语言包的引入, 然后手动引入所需的语言包
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

let r = moment()
  .endOf('day')
  .fromNow();
console.log(r);
