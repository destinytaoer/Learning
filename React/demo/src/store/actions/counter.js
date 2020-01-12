import * as Types from '../actionTypes'

function add(count) {
  return function (dispatch, getState) {
    setTimeout(() => {
      dispatch({type: Types.INCREMENT, count})
    }, 1000);
  }
  // return {type: Types.INCREMENT, count}
}
function minus(count) {
  // return {type: Types.DECREMENT, count}
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({type: Types.DECREMENT, count})
  //   }, 1000);
  // })
  return {
    type: Types.DECREMENT,
    payload: new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(100)
      }, 1000);
    })
  }
}

export {add, minus}