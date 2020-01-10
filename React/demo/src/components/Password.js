import React, { Component } from 'react'
import local from './Local';

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = { password: props.password };
  }
  handleChange = (e) => {
    this.setState({
      val: e.target.value
    })
  }
  
  render() {
    return (
      <div>
        <input type="text" val={this.state.password} onChange={this.handleChange}/>
      </div>
    )
  }
}
export default local('password')(Password)