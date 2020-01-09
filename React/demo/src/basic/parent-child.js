// 父传子
import React, { Component } from 'react'
import { render } from 'react-dom'

class Parent extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { name } = this.props;
    return (
      <div>
        <Child name={name}></Child>
      </div>
    )
  }
}
class Child extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { name } = this.props;
    return (
      <div>
        <p>from parent: {name}</p>
      </div>
    )
  }
}
render(<Parent name="aa"></Parent>, window.root);