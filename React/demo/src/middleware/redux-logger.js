// logger 就是改写 dispatch 方法, 在每次派发时进行打印
// 改写后的 dispatch 方法就是 action => {}
let logger = store => dispatch => action => {
  // 派发前打印
  console.log(store.getState());
  dispatch(action); // 派发
  // 派发后打印
  console.log(store.getState())
}