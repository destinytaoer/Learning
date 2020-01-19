import React, { PureComponent, useEffect, useState, useRef, useMemo, useCallback } from "react";

class Foo extends PureComponent {
  render() {
    const { props } = this;
    return (
      <div onClick={props.onClick}>{props.count}</div>
    )
  }
}

export default function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('a');

  const countRef = useRef();
  const it = useRef();

  const double = useMemo(() => {
    console.log('count');
    return count * 2
  }, [count]);

  const onClick = useCallback(
    () => {
      console.log('on click');
      console.log(countRef.current)
    },
    [countRef],
  )

  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1);
    }, 1000);
  }, []);
  useEffect(() => {
    if (count >= 5) {
      clearInterval(it.current);
    }
  })

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click count {double}</button>
      <button onClick={() => setName(name + 1)}>Click name {name}</button>
      <Foo ref={countRef} count={count} onClick={onClick}/>
    </div>
  )
}