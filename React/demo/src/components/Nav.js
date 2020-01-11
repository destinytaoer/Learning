import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class Nav extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/profile">个人中心</Link></li>
          <li><Link to="/user">用户</Link></li>
        </ul>
      </div>
    )
  }
}
