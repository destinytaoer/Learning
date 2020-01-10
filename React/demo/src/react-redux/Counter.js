import React from 'react'
import store from './store'
export default class Counter extends React.Component {
  constructor() {
    super();
    this.state = {n: store.getState().number}
  }
  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      this.setState({
        n: store.getState().number
      })
    })
  }
  componentWillUnmount() {
    this.unSubscribe()
  }
  
  handleClick = (type, payload) => {
    store.dispatch({
      type,
      count: payload
    })
  }
  render() {
    return (
      <div>
        <button onClick={() => this.handleClick('ADD', 1)}>+</button>
        <p>{this.state.n}</p>
        <button onClick={() => this.handleClick('MINUS', 1)}>-</button>
      </div>
    )
  }
}