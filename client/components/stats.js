import React, { Component } from 'react';
import store from '../store';

class Stats extends Component {
  constructor () {
    super();
    this.state = store.getState();
  }

  render () {
    return (
      <div id="stats">
        <div id="playerRed">
          Player Red has won <br />
          <div className="winCount">
            {this.state.redWinCount} <br />
          </div>
          times.
        </div>
        <div id="playerYellow">
          Player Yellow has won <br />
          <div className="winCount">
            {this.state.yellowWinCount} <br />
          </div>
          times.
        </div>
      </div>
    )
  }
}

export default Stats;
