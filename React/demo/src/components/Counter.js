import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actions from '../store/actions/counter'
class Counter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button onClick={() => {
          this.props.add(1)
        }}>+</button>
        <span>{this.props.number}</span>
        <button onClick={() => {
          this.props.minus(1)
        }}>-</button>
      </div>
    )
  }
}
// connect 执行时接收两个函数
// 1. mapStateToProps 将 store 中的状态映射为组件的 props
// 2. mapDispatchToProps 将 store 中的 dispatch 映射到组件的 props, 第二个函数可以使用 ActionCreators 代替, 内部使用 bindActionCreators 实现
// 3. 这两个函数的返回值都会作为组件的 props

// let mapStateToProps = (state) => {
//   return {num: state.counter.number }
// }
// let mapDispatchToProps = (dispatch) => {
//   return {
//     add: (count) => {
//       dispatch(add(count))
//     },
//     minus: (count) => {
//       dispatch(minus(count))
//     }
//   }
// }
let bindActionCreators = (actions) => {
  return (dispatch) => {
    let obj = {};
    for (let key in actions) {
      obj[key] = (...args) => {
        dispatch(actions[key](...args));
      }
    }
    return obj;
  }
}
export default connect((state) => ({...state.counter}), actions)(Counter)