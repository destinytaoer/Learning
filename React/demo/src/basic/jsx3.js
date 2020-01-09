import React from 'react'
import ReactDOM from 'react-dom'

let styl = { backgroundColor: 'red' }
let str = '<h1>HTML</h1>'
ReactDOM.render((
  <div>
    <p className="aa"></p>
    <p htmlFor="aa"></p>
    <p style={styl}></p>
    <p dangerouslySetInnerHTML={{__html: str}}></p>
  </div>
))