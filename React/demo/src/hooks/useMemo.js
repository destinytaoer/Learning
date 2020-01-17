import React, { memo, useState, useMemo, useCallback } from "react";

const Foo = memo(function Foo(props) {
  console.log('render')
  return (
    <div onClick={props.onClick}>{props.count}</div>
  )
})

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('a');

  const double = useMemo(() => {
    console.log('count');
    return count * 2
  }, [count]);

  // 使用 useMemo 让其只执行一次, 不会生成新的函数,避免了子组件不必要的刷新
  // const onClick = useMemo(() => {
  //   return () => {
  //     console.log('on click');
  //   }
  // }, []);

  //=> useMemo(()=>fn) === useCallback(fn)
  const onClick = useCallback(
    () => {
      console.log('on click');
    },
    [],
  )

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click count {double}</button>
      <button onClick={() => setName(name + 1)}>Click name {name}</button>
      <Foo count={count} onClick={onClick}/>
    </div>
  )
}