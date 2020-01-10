import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import createStore from './redux2'
const INCREMENT = 'increment'
const DECREMENT = 'desrement'

function reducer(state={number:0}, action) {
  switch (action.type) {
    case INCREMENT:
      return { number: action.amount + state.number }
    case DECREMENT:
      return { number: state.number - action.amount }
  }
  return state;
}

let store = createStore(reducer)

class Counter extends Component {
  constructor() {
    super();
    this.state = {number: store.getState().number}
  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        number: store.getState().number
      })
    })
  }
  
  render() {
    return (
      <div>
        <button onClick={() => {
          store.dispatch({type: INCREMENT, amount: 3})
        }}>+</button>
        <p>{this.state.number}</p>
        <button onClick={() => {
          store.dispatch({ type: DECREMENT, amount: 3 })
        }}>-</button>
      </div>
    )
  }
}

render(<Counter></Counter>, window.root)