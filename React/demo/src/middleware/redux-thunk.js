let thunk = store => dispatch => action => {
  if (typeof action === 'function') {
    // 如果是函数就让其执行
    return action(dispatch, store.getState) 
  }
  dispatch(action)
}