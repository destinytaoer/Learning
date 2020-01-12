// redux-promise 中间件实现
let reduxPromise = store => dispatch => action => {
  if (action.then) { // 如果有 then 方法就是 promise
    action.then(dispatch); // 不处理失败
  } else if (action.payload && action.payload.then) {
    action.payload.then(function (data) {
      dispatch({...action, payload: data})
    }, function (err) {
      dispatch({...action, payload: err})
    })
  } else {
    dispatch(action)
  }
}