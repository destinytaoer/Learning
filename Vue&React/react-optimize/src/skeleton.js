import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server'; // 服务端渲染
import ContentLoader from 'react-content-loader';

// let html = ReactDOMServer.renderToStaticMarkup(<ContentLoader />);

// export default html;
ReactDOM.render(<ContentLoader />, document.getElementById('root'));
