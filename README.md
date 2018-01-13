# react-modern-library-boilerplate

> TODO: Component Description

[![NPM](https://img.shields.io/npm/v/react-modern-library-boilerplate.svg)](https://www.npmjs.com/package/react-modern-library-boilerplate) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save veu
```

## Usage

```jsx
import React, { Component } from 'react'

import {Veu} from 'veu';


const Counter = Veu({

})(({data, methods, computed, ...props) => (
  <div>
    {data.counter}
    <button>Increment</button>
  </div>   
))

class Example extends Component {
  render () {
    return (
      <Counter />
    )
  }
}
```

## License

MIT © [Timothée Clain](https://github.com/tclain)
