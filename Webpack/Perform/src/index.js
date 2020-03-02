import React from 'react';
import { render } from 'react-dom';

function handleClick(e) {
  return import('./source').then(data => {
    console.log(data);
  });
}

render(
  <div>
    <button onClick={handleClick}>hello</button>
  </div>,
  window.root
);
