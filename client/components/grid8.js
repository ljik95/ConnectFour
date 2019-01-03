import React, { Component } from 'react';
import store, { paint, check8 } from '../store'
import { Link } from 'react-router-dom';

class Grid8 extends Component {

  constructor () {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    this.setState({...this.state, completed: false})
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render () {
    let grid = this.state.grid8;
    return (
      <div style={{fontSize: '30px', textAlign: 'center'}}>
        Stage 2
        <table>
          <tbody>
            <tr id="white8">
              <td className="white"></td>
              <td className="white">4</td>
              <td className="white">6</td>
              <td className="white">7</td>
              <td className="white">7</td>
              <td className="white">7</td>
              <td className="white">7</td>
              <td className="white">6</td>
              <td className="white">4</td>
            </tr>
            {
              grid.map((row, rowIdx) => {
                return (
                  <tr key={rowIdx}>
                    <td id={`grid8-${rowIdx}`} className="white"></td>
                    {row.map((cell, cellIdx) => {
                      return (
                        <td key={cellIdx} id="grid8" className={grid[rowIdx][cellIdx]} onClick={() => {
                          store.dispatch(paint(grid, rowIdx, cellIdx));
                          store.dispatch(check8());
                        }}></td>
                      )
                    })}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div className="stageComplete">
        {this.state.completed ?
        <div>
          Congratulation! <br />
          Press the "Next Stage" button below to move on to the next stage. <br />
          <Link to="/pixelogic/stage3">Next Stage</Link>
        </div>
        : <div />
        }
        </div>
      </div>
    )
  }
}

export default Grid8;
