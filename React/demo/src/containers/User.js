import React, { Component } from 'react'
import Add from './Add'
import List from './List'
import {Link, Route} from 'react-router-dom'
export default class User extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/user/add">添加</Link></li>
          <li><Link to="/user/list">列表</Link></li>
        </ul>
        <Route path="/user" exact={true} component={Add}></Route>
        <Route path="/user/add" component={Add}></Route>
        <Route path="/user/list" component={List}></Route>
      </div>
    )
  }
}
