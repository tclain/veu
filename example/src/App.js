import React, { Component } from 'react'
import {Veu} from 'veu';

const Counter = Veu({
  data : {
    count: 1
  },
  methods : {
    increment(){
      console.log('incremented !')
      this.count = this.count + 1
    }
  },
  computed: {
    readableCount(){
      return this.count + " times";
    }
  }
})( ({increment, ...props}) => (
  <div className="example-counter">
    {JSON.stringify(props)}
    <button onClick={increment}>Increment counter</button>
  </div>
))


export default class App extends Component {
  render () {
    return (
      <div>
        <Counter />
      </div>
    )
  }
}
