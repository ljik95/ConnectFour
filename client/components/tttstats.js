import React, { Component } from 'react';
import store from '../store';
import { Link } from 'react-router-dom';

class tttStats extends Component {
  constructor () {
    super();
    this.state = store.getState();
  }

  render () {
    return (
      <div>
        <div id="players">
          <div id="playerRed">
            Player Red has won <br />
            <div className="winCount">
              {this.state.tttRedWinCount} <br />
            </div>
            times.
          </div>
          <div id="playerYellow">
            Player Yellow has won <br />
            <div className="winCount">
              {this.state.tttYellowWinCount} <br />
            </div>
            times.
          </div>
        </div>
        <div id="backToGame">
          <Link to="/tictactoe">Back To Game</Link>
        </div>
      </div>
    )
  }
}

export default tttStats;
