import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
class ProtectedRoute extends Component {
  
  componentWillMount() {
    let flag = localStorage.getItem('logined')
    if (!flag) {
      this.props.history.push('/')
    }
  }
  
  render() {
    let { path, component: Component } = this.props;
    return <Component />
  }
}
export default withRouter(ProtectedRoute)