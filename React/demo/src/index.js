import React, { useState } from 'react'
import { render } from 'react-dom'
// function App() {
//   let [count, setCount] = useState(0)
//   console.log('render')
//   return (
//     <button type="button" onClick={() => {
//       setCount(oldCount => oldCount + 1)
//     }}>Click {count}</button>
//   )
// }
let id = 0;
function App() {
  let count, setCount;
  let name, setName;
  console.log('render')
  id++;
  if (id % 2 === 0) {
    [count, setCount] = useState(0)
    [name, setName] = useState('a')
  } else {
    [name, setName] = useState('a')
    [count, setCount] = useState(0)
  }
  return (
    <button type="button" onClick={() => {
      setCount(oldCount => oldCount + 1)
    }}>Click {count} -- {name}</button>
  )
}
render(<App />, window.root);