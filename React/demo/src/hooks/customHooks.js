import React, { PureComponent, useState, useEffect, useRef } from "react";

function Foo(props) {
  return <h1>{props.count}</h1>
}

function useCount(defaultCount) {
  const [count, setCount] = useState(0);

  const it = useRef();

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

  return [count, setCount]
}

export default function App() {
  const [count, setCount] = useCount(0)

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Click count {count}</button>
      <Foo count={count}/>
    </div>
  )
}