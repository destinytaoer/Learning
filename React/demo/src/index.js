import React from 'react'
import { render } from 'react-dom'
import { Provider } from "react-redux";
/**
 * react 主要有两个部分
 * react
 * react-dom
 * import 必须放置在页面的顶部
 * ReactDOM 中常用的就是 render 函数
 */
import Counter from "./components/Counter";
import Todo from "./components/Todo";
import Username from './components/Username'
import Password from './components/Password'
import App from './containers/App'
import Home from './containers/Home'
import Profile from './containers/Profile'
import User from './containers/User'
import Detail from './containers/Detail'
import store from './store'
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute'
render(<Provider store={store}>
  <Router>
    <App>
      <Switch>
        <Route path="/" exact={true} component={Home}/>
        <Route path="/profile" component={Profile}/>
        <ProtectedRoute path="/user" component={User} />
        <Route path="/detail/:id" component={Detail} />
        {/* 最后匹配不到,就使用这个组件,路径不会变, 一般用于 404*/}
        <Route component={Home}></Route>
        {/* <Redirect to="/"></Redirect> */}
        {/* 重定向, 路径会改变 */}
      </Switch>
    </App>
  </Router>
</Provider>, window.root)