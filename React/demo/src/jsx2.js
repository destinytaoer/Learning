import React from "react";
import ReactDOM from 'react-dom'

let fruit = ['apple', 'bannaner', 'orange'];
// 循环遍历和条件渲染
let el = (
  <ul>
    {fruit.map((item, index) => (
      item === 'apple' ? <li key={index}>{item}</li> : null
    ))}
  </ul>
)
ReactDOM.render(el, document.getElementById('root'))