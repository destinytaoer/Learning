import React, { useState, useEffect } from 'react'

export default function App() {
  const [number, setNumber] = useState(0);
  const [size, setSize] = useState(() => {
  	return {
    	width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    }
  })
  
  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `你点击了${number}次`;
  });

  const onResize = () => {
    setSize({
    	width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }

  // 相当于 componentDidMount 和 componentWillUnmount
  useEffect(() => {
    window.addEventListener('resize', onResize, false);
    return () => {
      window.removeEventListener('resize', onResize, false);
    };
  }, [])

  return (
    <div>
      <button type="button" onClick={()=>setNumber(number+1)}>click</button>
      <p>{number}</p>
      <p>size: {size.width} - {size.height}</p>
    </div>
  );
}