import React, { Component } from 'react';
import store, { tttpaint, tttcheck, tttreset } from '../store';
import { Link } from 'react-router-dom';

class Tictactoe extends Component {
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
    store.dispatch(tttreset());
  }

  render () {
    return (
      <div id="table">
        {this.state.tttWinner === 'none' ?
        <div>
          Player {this.state.tttColor === 'red' ? 'Red' : 'Yellow'}'s turn
        </div> :
        this.state.tttWinner !== 'draw' ?
        <div>
          Congrats! <br />
          Player {this.state.tttColor === 'red' ? 'Yellow' : 'Red'} has won.
        </div> :
        <div>
          DRAW! <br />
        </div>
        }
        <table>
          <tbody>
            {
              this.state.tttGrid.map((row, rowIdx) => {
                return (
                  <tr key={rowIdx}>
                    {row.map((cell, cellIdx) => {
                      return (
                        <td key={cellIdx} id="connectFour" className={this.state.tttGrid[rowIdx][cellIdx]} onClick={() => {
                          store.dispatch(tttpaint(this.state.tttGrid, rowIdx, cellIdx));
                          store.dispatch(tttcheck());
                        }}></td>
                      )
                    })}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        {this.state.tttWinner !== 'none' ?
          <button id="playAnotherButton" type="button" onClick={this.handleClick}>Play Another Game</button> :
          <div>
            <button id="resetButton" type="button" onClick={this.handleClick}>Reset</button>
            <div id="stats">
            <Link to="/tttstats" style={{ textDecoration: 'none', color: 'black' }}>Statistics</Link>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default Tictactoe;
