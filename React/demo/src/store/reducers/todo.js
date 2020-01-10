import {ADD_TODO} from '../actionTypes'
export default function todo(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.content]
  }
  return state;
}