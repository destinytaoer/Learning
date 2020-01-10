import { createStore, combineReducers } from 'redux';

function counter(state = { number: 0 }, action) {
  switch (action.type) {
    case 'ADD':
      return { number: state.number + action.count };
    case 'MINUS':
      return { number: state.number - action.count };
  }
  return state;
}
// 合并 reducer
function todo(state=[], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.content]
  }
  return state
}
// combineReducers {counter: {number: 0}, todo: []}
// 实现简单的 combineReducers
// function combineReducers(reducers) {
//   return (state={}, action) => {
//     let obj = {}
//     for (let key in reducers) {
//       obj[key] = reducers[key](state[key], action);
//     }
//     return obj;
//   }
// }
let reducer = combineReducers({
  counter,
  todo
})
export default createStore(reducer);