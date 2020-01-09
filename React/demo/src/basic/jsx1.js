function build(str) {
	return (
  	<div>
		  {/* 这是注释 */}
		  <h1>{str}</h1>
	  </div>
  )
}
let el = <div>{build('hello')}</div>
ReactDOM.render(el, document.getElementById('root'));