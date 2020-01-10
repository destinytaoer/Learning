import React from 'react'
import ReactDOM, { render } from 'react-dom'
/**
 * react 主要有两个部分
 * react
 * react-dom
 * import 必须放置在页面的顶部
 * ReactDOM 中常用的就是 render 函数
 */
import Counter from "./components/Counter";
import Todo from "./components/Todo";

render(<div>
  <Counter/>
  <Todo/>
</div>, window.root)