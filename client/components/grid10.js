import React, { Component } from 'react';
import store, { paint, check10 } from '../store'

class Grid10 extends Component {

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
    let grid = this.state.grid10;
    return (
      <React.Fragment>
        <table>
          <tbody>
            <tr id="white10">
              <td className="white"></td>
              <td className="white">1 1</td>
              <td className="white">2 2</td>
              <td className="white">3 3</td>
              <td className="white">4 3</td>
              <td className="white">5 4</td>
              <td className="white">5 4</td>
              <td className="white">3 6</td>
              <td className="white">10</td>
              <td className="white">8</td>
              <td className="white">4</td>
            </tr>
            {
              grid.map((row, rowIdx) => {
                return (
                  <tr key={rowIdx}>
                    <td id={`grid10-${rowIdx}`} className="white"></td>
                    {row.map((cell, cellIdx) => {
                      return (
                        <td key={cellIdx} id="grid10" className={grid[rowIdx][cellIdx]} onClick={() => {
                          store.dispatch(paint(grid, rowIdx, cellIdx));
                          store.dispatch(check10());
                        }}></td>
                      )
                    })}
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div>
        {this.state.completed ?
        <div>
          Congratulation! You cleared all stages.
        </div>
        : <div />
        }
        </div>
      </React.Fragment>
    )
  }
}

export default Grid10;
