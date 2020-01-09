import React from 'react'
import ReactDOM, { render } from 'react-dom'

class Counter extends React.Component {
  constructor() {
    super();
    this.state = {count: 0}
  }
  handleClick = () => {
    this.setState({
      count: this.state.count+1
    })
  }
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.handleClick}>+1</button>
      </div>
    )
  }
}

render(<Counter></Counter>, window.root);