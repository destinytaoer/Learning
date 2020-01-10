import React, { Component } from 'react'
import store from '../store'
import {add, minus} from '../store/actions/counter'
export default class Counter extends Component {
  constructor() {
    super();
    this.state = {n: store.getState().counter.number}
  }
  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      this.setState({
        n: store.getState().counter.number
      })
    })
  }
  render() {
    return (
      <div>
        <button onClick={() => {
          store.dispatch(add(1))
        }}>+</button>
        <span>{this.state.n}</span>
        <button onClick={() => {
          store.dispatch(minus(1))
        }}>-</button>
      </div>
    )
  }
}
