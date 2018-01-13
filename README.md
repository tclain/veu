# Veu

> A Simple Vue-like state manager for react

[Alpha Release]

Why ? Why not ! I love react and I love vue simplicity that can help newcomers to build elegant applications. But the truth is, React is so much more popular and there are awesome react libraries out there (airbnb dates, shopify drag and drop ...). 

So what if we could reuse all theses libs but with the simplicity and elegance inspired from vue to manage our state ? Entre Veu (pronounce Vee-u).


## Install

```bash
npm install --save veu
```

## Usage

```jsx
import React, { Component } from 'react'
import {Veu} from 'veu';

const Counter = Veu({
  data : {
    count: 1
  },
  methods : {
    increment(){
      this.count = this.count + 1
    }
  },
  computed: {
    readableCount(){
      return this.count + " times";
    }
  }
})( ({increment, count, readableCount, ...props}) => (
  <div className="example-counter">
    {count}, computed: {readableCount}
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

```

## License

MIT © [Timothée Clain](https://github.com/tclain)
