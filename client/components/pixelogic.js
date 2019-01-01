import React, { Component } from 'react';
import store from '../store';
import Grid5 from './grid5';
import Grid8 from './grid8';

class Pixelogic extends Component {
  constructor () {
    super();
    this.state = store.getState();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount () {
    this.unsubscribe()
  }

  handleClick () {}

  render () {
    return (
      <div>
        <Grid5 />
      </div>
    )
  }
}

export default Pixelogic;
