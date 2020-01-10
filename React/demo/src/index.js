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
import store from './store'
render(<Provider store={store}>
  <div>
    <Counter/>
    <Todo/>
  </div>
</Provider>, window.root)