import React, { Component } from 'react';
import Table from './table';
import store, { reset } from '../store';
import { Link } from 'react-router-dom';

class ConnectFour extends Component {
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

  handleClick () {
    store.dispatch(reset());
  }

  render () {
    return (
      <div id="table">
        {this.state.winner === 'none' ?
          <div>
            Player {this.state.currentColor === 'red' ? 'Red' : 'Yellow'}'s turn
            <Table />
            <button id="resetButton" type="button" onClick={this.handleClick}>Reset</button>
            <div id="stats">
              <Link to="/stats" style={{ textDecoration: 'none', color: 'black' }}>Statistics</Link>
            </div>
          </div> :
          <div>
            <img id="winnerImg" src="https://pbs.twimg.com/profile_images/427475930/winner.jpg" /> <br />
            Player {this.state.currentColor === 'red' ? 'Yellow' : 'Red'} <br /> Congrats! <br />
            <button id="playAnotherButton" type="button" onClick={this.handleClick}>Play Another Game</button>
          </div>
        }
      </div>
    )
  }
}

export default ConnectFour;
