import * as Types from '../actionTypes'

function addTodo(content) {
  return {type: Types.ADD_TODO, content}
}

export { addTodo }