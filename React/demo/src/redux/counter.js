// redux 流程
// 1. 定义当前模块的状态修改有哪些
const INCREMENT = 'increment';
const DECREMENT = 'decrement';

// 2. 定义当前项目的默认状态, 状态放到 reducer 中
function reducer(state = {number: 0}, action) {
  
  return state;
}

// 3. 创建容器
let store = createStore(reducer);

// 4. 进行派发
store.dispatch({
  type: INCREMENT,
  number: 1
})