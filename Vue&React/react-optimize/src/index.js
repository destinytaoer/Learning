import React from 'react';
import ReactDOM from 'react-dom';
import { Map, is } from 'immutable';
/* Fragment */
// let data = [
//   { id: 1, name: 'destiny', age: 26 },
//   { id: 2, name: 'hello', age: 10 },
// ];

// class Column extends React.Component {
//   render() {
//     let { data } = this.props;

//     // <React.Fragment></React.Fragment>
//     // 语法糖, 直接写 <></>
//     return (
//       <>
//         <td>{data.id}</td>
//         <td>{data.name}</td>
//         <td>{data.age}</td>
//       </>
//     );
//   }
// }

// class Table extends React.Component {
//   render() {
//     let { data } = this.props;

//     return (
//       <table>
//         <thead>
//           <tr>
//             <td>ID</td>
//             <td>名称</td>
//             <td>年龄</td>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => {
//             return (
//               <tr key={index}>
//                 <Column data={item} />
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     );
//   }
// }

/* React.PureComponent */
class PureComponent extends React.Component {
  shouldComponentUpdate(newProps) {
    // 判断组件是否需要更新
    return !shallowEqual(this.props, newProps);
  }
}
// 浅比较, 只比较一层
// 相等则返回 true, 否则返回 false
function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (typeof obj1 != 'object' || obj1 == null || typeof obj2 != 'object' || obj2 == null) {
    return false;
  }

  // 都是对象,且不是同一个对象
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key) || !is(obj1[key], obj2[key])) return false;
  }

  return true;
}
class App extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }
  state = {
    counter: Map({ number: 0 }),
  };
  add = (e) => {
    // let oldState = this.state;
    // let amount = parseInt(this.inputRef.current.value);
    // let newState = {
    //   ...oldState,
    //   counter: amount === 0 ? oldState.counter : { number: oldState.counter.number + amount },
    // };
    // this.setState(newState);

    // 上面的情况设置了如果 amount 为 0, 那么就还是设置原来的对象, 此时 PureComponent 才会起作用
    // 如果是每次都返回一个新对象,那么 PureComponent 就不会起作用了
    // let oldState = this.state;
    // let amount = parseInt(this.inputRef.current.value);
    // let newState = {
    //   ...oldState,
    //   counter: { number: oldState.counter.number + amount },
    // };
    // this.setState(newState);

    // 此时可以使用不可变数据 immutable 库来改造
    let oldState = this.state;
    let amount = parseInt(this.inputRef.current.value);
    oldState.counter = oldState.counter.set('number', oldState.counter.get('number') + amount);
    this.setState(oldState);
  };
  render() {
    return (
      <div>
        <Counter counter={this.state.counter} />
        <input type='text' ref={this.inputRef} />
        <button onClick={this.add}>+</button>
      </div>
    );
  }
}
class Counter extends PureComponent {
  render() {
    console.log('render');
    return <div>{this.props.counter.get('number')}</div>;
  }
}
ReactDOM.render(<App />, document.getElementById('root'));
