// 受控组件
import React, { Component } from 'react'
import { render } from 'react-dom'

class Input extends Component {
  constructor() {
    super();
    this.state = {a: '', b: ''}
  }
  handleChange = (key, e) => {
    this.setState({
      [key]: e.target.value
    })
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.a} onChange={e => this.handleChange('a', e)} />
        <input type="text" value={this.state.b} onChange={e => this.handleChange('b', e)}/>
        {this.state.a + this.state.b}
      </div>
    )
  }
}
render(<Input></Input>, window.root);