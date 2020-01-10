import React from 'react'
export default function local(key) {
  return (Component) => {
    return class HighOrderComponent extends React.Component {
      constructor() {
        super();
        this.state = {[key]: null}
      }
      componentWillMount() {
        let val = localStorage.getItem(key);
        this.setState({
          [key]: val
        })
      }
      
      render() {
        return <Component {...this.state}></Component>
      }
    }
  }
}