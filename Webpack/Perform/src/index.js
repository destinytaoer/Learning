import { str } from './source';

if (module.hot) {
  module.hot.accept('./source', () => {
    console.log('文件更新');
  });
}

console.log(str);
