import React, { useState, useContext, createContext } from 'react';

const countContext = createContext();

function Foo() {
  const count = useContext(countContext);

  return (
    <div>{count}</div>
  )
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <countContext.Provider value={count}>
      <button onClick={()=>setCount(count + 1)}>Click</button>
      <Foo></Foo>
    </countContext.Provider>
  )
}