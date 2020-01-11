import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class List extends Component {
  render() {
    return (
      <div>
        <li><Link to="/detail/1">1</Link></li>
        <li><Link to="/detail/2">2</Link></li>
      </div>
    )
  }
}
