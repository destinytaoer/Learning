import React from 'react';
import ReactDOM from 'react-dom';
import ContentLoader from 'react-content-loader';
let style = {
  width: '100%',
  height: '300px',
  background: 'orange',
};

setTimeout(() => {
  ReactDOM.render(<div style={style}></div>, document.getElementById('root'));
}, 3000);
