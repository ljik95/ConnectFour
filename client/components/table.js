import React, { Component } from 'react';
import store, { drop, check } from '../store'

class Table extends Component {

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
    let grid = this.state.grid;
    return (
      <table>
        <tbody>
          {
            grid.map((row, rowIdx) => {
              return (
                <tr key={rowIdx}>
                  {row.map((cell, cellIdx) => {
                    return (
                      <td key={cellIdx} id="connectFour" className={grid[rowIdx][cellIdx]} value={cellIdx} onClick={() => {
                        store.dispatch(drop(cellIdx));
                        store.dispatch(check(grid));
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

export default Table;
