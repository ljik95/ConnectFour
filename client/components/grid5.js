import React, { Component } from 'react';
import store, { paint, check5 } from '../store';
import { Link } from 'react-router-dom';

class Grid5 extends Component {

  constructor () {
    super();
    this.state = store.getState();
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render () {
    let grid = this.state.grid5;
    return (
      <React.Fragment>
        <table>
          <tbody>
            <tr id="white5">
              <td className="white"></td>
              <td className="white">2</td>
              <td className="white">1 1</td>
              <td className="white">1</td>
              <td className="white">1 1</td>
              <td className="white">2</td>
            </tr>
            {
              grid.map((row, rowIdx) => {
                return (
                  <tr key={rowIdx}>
                    <td id={`grid5-${rowIdx}`} className="white"></td>
                    {row.map((cell, cellIdx) => {
                      return (
                        <td key={cellIdx} id="grid5" className={grid[rowIdx][cellIdx]} onClick={() => {
                          store.dispatch(paint(grid, rowIdx, cellIdx));
                          store.dispatch(check5());
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
            <Link to="/pixelogic/stage2">Next Stage</Link>
          </div>
          : <div />
          }
        </div>
      </React.Fragment>
    )
  }
}

export default Grid5;
