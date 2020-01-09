// 类组件
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
// 属性校验包
import PropTypes from 'prop-types';

class School extends Component {
  // 一般使用静态属性进行属性校验
  static propTypes = {
    name: PropTypes.string
  }
  // 默认属性值
  static defaultProps = {
    name: 'aa'
  }
  constructor(props) {
    super(props); // 这里可传递,也可不传,内部会处理
    console.log(props)
  }
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
      </div>
    )
  }
}
// 进行属性校验
// School.propTypes = {name: PropTypes.string}
render(<School name='hello'></School>, window.root)