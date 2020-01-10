import {INCREMENT, DECREMENT} from '../actionTypes'
export default function counter(state = {number: 0}, action) {
  switch (action.type) {
    case INCREMENT:
      return {number: state.number + action.count}
    case DECREMENT:
      return {number: state.number - action.count}
  }
  return state;
}