import React from 'react'
import ReactDOM from 'react-dom'
// 函数组件
// 没有生命周期
// 没有状态
// 没有 this
let school1 = {
  name: 'szu',
  age: 13
}
let school2 = {
  name: 'hf',
  age: 100
}
function Build(props) {
  return <p>{props.name} {props.age}</p>
}
ReactDOM.render(<div>
  <Build {...school1}  />
  <Build {...school2}/>
</div>, window.root)