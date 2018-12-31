import React, { Component } from 'react';
import store, { paint } from '../store'

class Grid4 extends Component {

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
    let grid = this.state.grid4;
    return (
      <table>
        <tbody>
          {
            grid.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((cell, cellIdx) => {
                    return (
                      <td key={cellIdx} className={grid[rowIdx][cellIdx]} onClick={() => {
                        store.dispatch(paint(grid, rowIdx, cellIdx));
                      }}></td>
                    )
                  })}
                </tr>
              )
            })
          }
        </tbody>
      </table>
    )
  }
}

export default Grid4;
