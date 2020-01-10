import React, { Component } from 'react'
import store from '../store'
import {addTodo} from '../store/actions/todo'
export default class Todo extends Component {
  constructor() {
    super();
    this.state = {todos: store.getState().todo}
  }
  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      this.setState({
        todos: store.getState().todo
      })
    })
  }
  render() {
    return (
      <div>
        <input type="text" onKeyUp={(e) => {
          if (e.keyCode === 13) {
            store.dispatch(addTodo(e.target.value));e.target.value = ''
          }
          
        }}/>
        <ul>
          {this.state.todos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        </ul>
      </div>
    )
  }
}
