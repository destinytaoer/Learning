import React, { Component } from 'react'

export default class Detail extends Component {
  componentDidMount() {
    console.log(this.props.match)
    console.log(this.props)
  }
  
  render() {
    return (
      <div>
        Detail {this.props.match.params.id}
      </div>
    )
  }
}
