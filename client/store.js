import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { checkWinner, checkLine } from './helperFuncs';

const initialState = {
  grid:
    Array(6).fill(Array(7).fill(''))
  ,
  currentColor: 'red',
  winner: 'none',
  redWinCount: 0,
  yellowWinCount: 0,
  grid4: Array(4).fill(Array(4).fill('')),
  grid8: Array(8).fill(Array(8).fill('')),
  grid12: Array(12).fill(Array(12).fill('')),
  grid16: Array(16).fill(Array(16).fill('')),
  grid20: Array(20).fill(Array(20).fill(''))
};

// ConnectFour
const DROP = 'DROP';
const RESET = 'RESET';
const CHECK = 'CHECK';

// Pixelogic
const PAINT = 'PAINT';


// ConnectFour
export const drop = (cellIdx) => ({ type: DROP, cellIdx })
export const reset = () => ({ type: RESET })
export const check = () => ({ type: CHECK })

// Pixelogic
export const paint = (pixelGrid, rowIdx, cellIdx) => ({ type: PAINT, pixelGrid, rowIdx, cellIdx})

function reducer (state = initialState, action) {
  switch (action.type) {
    case DROP:
      const newGrid = [...state.grid]
      let i = 5;
      while (i >= 0) {
        if (newGrid[i][action.cellIdx] === '') {
          newGrid[i] = [...newGrid[i]];
          newGrid[i][action.cellIdx] = state.currentColor;
          if (state.currentColor === 'red') {
            state.currentColor = 'yellow';
          } else {
            state.currentColor = 'red';
          }
          break;
        }
        i--;
      }
      return {...state, grid: newGrid};

    case RESET:
      return {...state, grid: Array(6).fill(Array(7).fill('')), currentColor: 'red', winner: 'none'};

    case CHECK:
      if (checkWinner(state.grid) === 'red') {
        state.redWinCount++;
      } else if (checkWinner(state.grid) === 'yellow') {
        state.yellowWinCount++;
      }
      return {...state, winner: checkWinner(state.grid)};

    case PAINT:
    const grid = action.pixelGrid;
    const rowIdx = action.rowIdx;
    const cellIdx = action.cellIdx;
    const newPixGrid = [...grid];

      if (newPixGrid[rowIdx][cellIdx] === '') {
        newPixGrid[rowIdx] = [...newPixGrid[rowIdx]];
        newPixGrid[rowIdx][cellIdx] = 'painted';
      } else if (newPixGrid[rowIdx][cellIdx] === 'painted') {
        newPixGrid[rowIdx] = [...newPixGrid[rowIdx]];
        newPixGrid[rowIdx][cellIdx] = 'X';
      } else if (newPixGrid[rowIdx][cellIdx] === 'X') {
        newPixGrid[rowIdx] = [...newPixGrid[rowIdx]];
        newPixGrid[rowIdx][cellIdx] = '';
      }

      if (newPixGrid.length === 4) {
        return {...state, grid4: newPixGrid};
      } else if (newPixGrid.length === 8) {
        return {...state, grid8: newPixGrid};
      } else if (newPixGrid.length === 12) {
        return {...state, grid12: newPixGrid};
      } else if (newPixGrid.length === 16) {
        return {...state, grid16: newPixGrid};
      } else if (newPixGrid.length === 20) {
        return {...state, grid20: newPixGrid};
      }

    default:
      return state;
  }
}

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;

