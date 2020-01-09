// 子传父
import React, { Component } from 'react';
import { render } from 'react-dom';

class Parent extends Component {
  constructor() {
    super();
    this.state = { count: 0 };
  }
  add = (n) => {
    this.setState({
      count: this.state.count + n
    })
  }
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <Child add={this.add}></Child>
      </div>
    )
  }
}
class Child extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    this.props.add(2);
  }
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>+2</button>
      </div>
    )
  }
}
render(<Parent name="aa"></Parent>, window.root);