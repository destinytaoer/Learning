function createStore(reducer) {
  let state; // 此时还是 undefined
  let listeners = []; // 存放所有的监听函数

  function dispatch(action) { // 派发行为来修改状态
    state = reducer(state, action);
    // 每次 dispatch 之后调用所有监听函数
    listeners.forEach(fn => fn());
  }
  dispatch({}); // 目的是初始化 state

  let subscribe = (fn) => {
    listeners.push(fn); // 订阅函数
    // 返回一个取消订阅的函数
    return () => {
      listeners = listeners.filter(item => item !== fn);
    }
  }

  let getState = () => JSON.parse(JSON.stringify(state)); // 深拷贝 state,防止外部直接修改 

  return {
    getState,
    dispatch,
    subscribe
  }
}
const CHANGE_TITLE = 'change_title'
function reducer(state = { title: '标题' }, action) {
  switch (action.type) {
    case CHANGE_TITLE:
      return {...state, title: action.content}
  }
  return state;
}

let store = createStore(reducer);
function render() {
  document.querySelector('.title').innerHTML = store.getState().title;
}
render();

store.subscribe(render);
let unSubscribe = store.subscribe(render);

setTimeout(() => {
  store.dispatch({
    type: CHANGE_TITLE,
    content: '长标题'
  })
  unSubscribe()
}, 2000);