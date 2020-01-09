// 非受控组件
import React, { Component } from 'react'
import { render } from 'react-dom'

class Input extends Component {
  constructor() {
    super();
    this.state = {result: ''}
  }
  // 设置了 ref 属性, 就可以通过 this.refs 获取到对应元素
  handleChange = (key, e) => {
    let result = this.refs.a.value + this.refs.b.value;
    this.setState({
      result
    })
  }
  render() {
    return (
      <div onChange={this.handleChange}>
        <input type="text" ref="a"/>
        <input type="text" ref="b"/>
        {this.state.result}
      </div>
    )
  }
}
render(<Input></Input>, window.root);