import React from 'react'
import store from './store'
export default class Compute extends React.Component {
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
  render() {
    return (
      <div>
        {this.state.n % 2 ? '奇数': '偶数'}
      </div>
    )
  }
}