import * as Types from '../actionTypes'

function add(count) {
  return {type: Types.INCREMENT, count}
}
function minus(count) {
  return {type: Types.DECREMENT, count}
}

export {add, minus}