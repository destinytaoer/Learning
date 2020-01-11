import React, { Component } from 'react'
import { HashRouter as Router, Route } from "react-router-dom";
/**
 * react-router-dom 中包含:
 * HashRouter 和 BrowserRouter 分别为 hash 路由和 history 路由,是路由容器
 * Route 是一条条的路由
 */
import Nav from '../components/Nav'
export default class App extends Component {
  render() {
    return (
      <div>
        <Nav></Nav>
        {this.props.children}
      </div>
    )
  }
}
