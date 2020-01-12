// 应用中间件, 利用了 compose 方法
// 使用新的 dispatch 覆盖以前的
let applyMiddleware = (...middlewares) => createStore => reducer => {
  let store = createStore(reducer);
  let middles = middlewares.map(middleware => {
    return middleware(store)
  });
  let dispatch = compose(...middles)(store.dispatch);
  return {...store, dispatch}
}