import React, { useReducer, useContext, useState, useEffect, createContext } from 'react'
import reducer from './reducer';
import * as types from './action-types';
import { resolveNaptr } from 'dns';

// 通过 createContext 来创建上下文，其返回一个对象 {Provider,Consumer}，Provider 就是状态提供者，Consumer 是状态的消费者
const CounterContext1 = createContext();
const CounterContext2 = createContext();

const Counter1 = () => {
  // 通过 useContext 使用上下文，获取到传入 Provider 的 value 属性的值
  let { state, dispatch } = useContext(CounterContext1);
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={() => dispatch({ type: types.INCREMENT })}>+</button>
      <button onClick={() => dispatch({ type: types.DECREMENT })}>-</button>
    </div>
  )
}
const Counter2 = () => {
  let { state, dispatch } = useContext(CounterContext2);
  return (
    <div>
      <p>{state.number}</p>
      <button onClick={() => dispatch({ type: types.INCREMENT })}>+</button>
      <button onClick={() => dispatch({ type: types.DECREMENT })}>-</button>
    </div>
  )
}
const Counter3 = () => {
  // 通过 context 的 Consumer 来使用状态
  return (
    <CounterContext2.Consumer>
      {
        value => (
          <>
            <p>{value.state.number}</p>
            <button onClick={() => value.dispatch({ type: types.INCREMENT })}>+</button>
            <button onClick={() => value.dispatch({ type: types.DECREMENT })}>-</button>
          </>
        )
      }
    </CounterContext2.Consumer>
  )
}

function App() {
  let [state, dispatch] = useReducer(reducer, { number: 0 });
  return (
    <div>
      {/* 传入的是同一个状态，实现了状态的共享 */}
      <CounterContext1.Provider value={{ state, dispatch }}>
        <Counter1 />
      </CounterContext1.Provider>
      <CounterContext2.Provider value={{ state, dispatch }}>
        <Counter2 />
        <Counter3 />
      </CounterContext2.Provider>
    </div>
  )

}
/**
 * 1.原生react componentDidMount fetch setState
 * 2.redux 中间件派发一个函数 redux-thunk 
 * 3.React Hooks effect
 */
function Counter() {
  let [number, setNumber] = useState(0);
  //会在每次渲染完成执行副使用
  useEffect(() => {
    fetch('/user.json').then(res => res.json()).then(res => setNumber(number + res.number));
  })
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </div>
  )
}
export default App;