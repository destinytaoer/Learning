import React, { Component, useState, memo, useMemo, useCallback, useReducer } from 'react'
class Counter extends Component {
  state = { number: 0 }
  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
  }
  componentDidMount() {
    setTimeout(() => {
      alert(this.state.number);
    }, 3000);
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}
function Counter2() {
  let [number, setNumber] = useState(0);
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </div>
  )
}
//每一次渲染都是独立的闭包
function Counter3() {
  let [number, setNumber] = useState(0);
  function alertNumber() {
    setTimeout(function () {
      alert(number); // 获取的值是点击时的值，而不是当前值
    }, 3000);
  }
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>直接加1</button>
      <button onClick={alertNumber}>+</button>
    </div>
  )
}
function Counter4() {
  let [number, setNumber] = useState(0);
  // 实现延迟改变状态
  function lazy() {
    setTimeout(function () {
      setNumber(oldVal => oldVal + 1); // 设置状态的方法可以接受一个返回状态的函数，此时获取的 oldVal 就是当前值
    }, 3000);
  }
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>直接加1</button>
      <button onClick={lazy}>lazy+1</button>
    </div>
  )
}

// 设置默认状态
function Counter5({ initialVal = 0 }) {
  // useState 也可以接受一个返回状态初始值的函数
  let [data, setData] = useState(function () {
    return { number: initialVal }//{number:0}
  });
  return (
    <div>
      <p>{data.number}</p>
      <button onClick={() => setData({ number: data.number + 1 })}>直接加1</button>
    </div>
  )
}
function Counter6({ initialVal = 0 }) {
  const [counter, setCounter] = useState({ name: '计数器', number: 0 });
  console.log('Counter6 render');
  // setState 会合并状态对象 但是 useState 不会，它会用传入的值整个替换原来的值
  // 本身的优化，当传入的对象还是原来的对象时，即地址没有改变，那么就永远不会重新渲染，这也会出现一个问题，不要使用 counter 变量来设置 counter，即使 counter 变量中的值变化了
  return (
    <div>
      <p>{counter.name}: {counter.number}</p>
      <button onClick={() => setCounter({ number: counter.number + 1 })}>直接加1</button>
      <button onClick={() => {
        counter.name = 'asdf'; // counter 的值变化了
        setCounter(counter); // 设置 counter 仍然不会重新渲染页面
      }}>传入老状态</button>
    </div>
  )
}
//引入两个hooks useCallback useMemo
// 父组件重新渲染时，子组件状态没有变化的情况下，阻止子组件的重新渲染，可以提升性能
//1.保证如果number没有变化，则addClick和data也不要变化
//2.子Child组件要加一个判断，如果说属性没有变则不需要刷新
function Child({ data, addClick }) {
  console.log('Child render');
  return (
    <button onClick={addClick}>{data.number}</button>
  )
}
Child = memo(Child); // 这层包装是为了实现子组件只要属性没有就不重新渲染
let add1, data1;
function App() {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState('计数器');
  // 函数的包装，传入两个参数，函数和限制条件，如果限制条件没有变化，那么 useCallback 返回的还是原来的函数，保证了其不变化，如果限制条件数组为空，那么其永远不会改变
  const addClick = useCallback(() => setNumber(number + 1), [number]);//函数
  console.log('add1===addClick', add1 === addClick);
  add1 = addClick;
  // 状态的包装，传入两个参数，返回状态的函数和限制条件，如果限制条件没有变化，那么 useMemo 返回的还是原来的数据，保证了其不变化，如果限制条件数组为空，那么其永远不会改变
  const data = useMemo(() => ({ number }), [number]);//对象
  console.log('data1===data', data1 === data);
  data1 = data;
  console.log('App render');
  return (
    <div>
      <input value={name} onChange={event => setName(event.target.value)} />
      父:{number}
      <Child data={data} addClick={addClick} />
    </div>
  )

}

// 取代 Redux
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
function reducer(state, action) {
  switch (action.type) {
    case INCREMENT:
      return { number: state.number + 1 };
    case DECREMENT:
      return { number: state.number - 1 };
    default:
      return state;
  }
}
function Counter8() {
  // useReducer 传入 reducer、状态默认值、设置初始状态的函数，返回状态 state 和派发行为的方法 dispatch
  let [state1, dispatch1] = useReducer(reducer, 5, function (initialVal) {
    return { number: initialVal }
  });
  // 在 React Hooks 中，不再需要合并 reducer，因为 Redux 的状态是存储到同一个仓库中，才需要合并，而 React Hooks 每一个状态都是独立存在的
  let [state2, dispatch2] = useReducer(reducer, 10, function (initialVal) {
    return { number: initialVal }
  });
  return (
    <>
      <p>{state1.number}</p>
      <button onClick={() => dispatch1({ type: INCREMENT })}>+</button>
      <button onClick={() => dispatch1({ type: DECREMENT })}>-</button>
      <hr />
      <p>{state2.number}</p>
      <button onClick={() => dispatch2({ type: INCREMENT })}>+</button>
      <button onClick={() => dispatch2({ type: DECREMENT })}>-</button>
    </>
  )
}

export default Counter8;