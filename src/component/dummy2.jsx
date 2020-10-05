import React, { Component } from 'react'
import * as db from '../database/db'
export default class dummy2 extends Component {
  state = {}

  componentDidMount(){
    db.discoverMovie().then(res => this.setState({...res}))
  }

  componentDidUpdate(){
    console.log("step1 get discover data",this.state)
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
