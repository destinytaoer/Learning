import React, { Component } from 'react'
import { connect } from "react-redux";
import * as actions from '../store/actions/todo'
class Todo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <input type="text" onKeyUp={(e) => {
          if (e.keyCode === 13) {
            this.props.addTodo(e.target.value);e.target.value = ''
          }
          
        }}/>
        <ul>
          {this.props.todos.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
        </ul>
      </div>
    )
  }
}

export default connect((state) => ({todos: state.todo}), actions)(Todo);