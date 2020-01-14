const state = { filter: 'completed', todos: ['learn react'] };
// 原生写法
const newState = {
  ...state, todos: [
    ...state.todos,
    'learn redux'
  ]
}
const newState2 = Object.assign({}, state, {
  todos: [
    ...state.todos,
    'learn redux'
  ]
})
// 借助 immutability-helper
import update from 'immutability-helper';
const newState3 = update(
  state,
  {
    todos: { $push: ['learn redux'] }
  }
);

// 借助 immer
import produce from 'immer'
const newState4 = produce(
  state,
  draftState => {
    draftState.todos.push('learn redux');
  }
)