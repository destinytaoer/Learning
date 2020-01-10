import React, { Component } from 'react'
import local from './Local'
class Username extends Component {
  constructor(props) {
    super(props);
    this.state = { username: props.username };
  }
  handleChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  
  render() {
    return (
      <div>
        <input type="text" value={this.state.username} onChange={this.handleChange}/>
      </div>
    )
  }
}

export default local('username')(Username)