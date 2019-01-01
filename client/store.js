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
  grid5: Array(5).fill(Array(5).fill('')),
  grid8: Array(8).fill(Array(8).fill('')),
  grid10: Array(10).fill(Array(10).fill('')),
  grid16: Array(16).fill(Array(16).fill('')),
  grid20: Array(20).fill(Array(20).fill('')),
  completed: false
};

// ConnectFour
const DROP = 'DROP';
const RESET = 'RESET';
const CHECK = 'CHECK';

// Pixelogic
const PAINT = 'PAINT';
const CHECK5 = 'CHECK5';
const CHECK8 = 'CHECK8';
const CHECK10 = 'CHECK10';

// ConnectFour
export const drop = (cellIdx) => ({ type: DROP, cellIdx })
export const reset = () => ({ type: RESET })
export const check = () => ({ type: CHECK })

// Pixelogic
export const paint = (pixelGrid, rowIdx, cellIdx) => ({ type: PAINT, pixelGrid, rowIdx, cellIdx})
export const check5 = () => ({ type: CHECK5 })
export const check8 = () => ({ type: CHECK8 })
export const check10 = () => ({ type: CHECK10 })

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

    if (!state.completed) {
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
    }

      if (newPixGrid.length === 5) {
        return {...state, grid5: newPixGrid};
      } else if (newPixGrid.length === 8) {
        return {...state, grid8: newPixGrid};
      } else if (newPixGrid.length === 10) {
        return {...state, grid10: newPixGrid};
      } else if (newPixGrid.length === 16) {
        return {...state, grid16: newPixGrid};
      } else if (newPixGrid.length === 20) {
        return {...state, grid20: newPixGrid};
      }

    case CHECK5:
      const grid5 = state.grid5;
      const answer5 = [grid5[1][1], grid5[1][3], grid5[3][0], grid5[3][4], grid5[4][0], grid5[4][1], grid5[4][2], grid5[4][3], grid5[4][4]]
      if (answer5.every((cell) => {
        return cell === 'painted';
      })) {
        return {...state, completed: true};
      } else {
        return {...state, completed: false};
      }

    case CHECK8:
      const grid8 = state.grid8;
      const answer8 = [grid8[0][1], grid8[0][2], grid8[0][5], grid8[0][6], grid8[1][0], grid8[1][1], grid8[1][2], grid8[1][3], grid8[1][4], grid8[1][5], grid8[1][6], grid8[1][7], grid8[2][0], grid8[2][1], grid8[2][2], grid8[2][3], grid8[2][4], grid8[2][5], grid8[2][6], grid8[2][7], grid8[3][0], grid8[3][1], grid8[3][2], grid8[3][3], grid8[3][4], grid8[3][5], grid8[3][6], grid8[3][7], grid8[4][0], grid8[4][1], grid8[4][2], grid8[4][3], grid8[4][4], grid8[4][5], grid8[4][6], grid8[4][7], grid8[5][1], grid8[5][2], grid8[5][3], grid8[5][4], grid8[5][5], grid8[5][6], grid8[6][2], grid8[6][3], grid8[6][4], grid8[6][5], grid8[7][3], grid8[7][4]]
      if (answer8.every((cell) => {
        return cell === 'painted';
      })) {
        return {...state, completed: true};
      } else {
        return {...state, completed: false};
      }

    case CHECK10:
      const grid10 = state.grid10;
      const answer10 = [grid10[0][3], grid10[0][4], grid10[0][5], grid10[0][6], grid10[0][7], grid10[1][2], grid10[1][3], grid10[1][4], grid10[1][5], grid10[1][6], grid10[1][7], grid10[1][8], grid10[2][1], grid10[2][2], grid10[2][3], grid10[2][4], grid10[2][5], grid10[2][6], grid10[2][7], grid10[2][8], grid10[3][0], grid10[3][1], grid10[3][2], grid10[3][3], grid10[3][4], grid10[3][5], grid10[3][7], grid10[3][8], grid10[3][9], grid10[4][4], grid10[4][5], grid10[4][6], grid10[4][7], grid10[4][8], grid10[4][9], grid10[5][6], grid10[5][7], grid10[5][8], grid10[5][9], grid10[6][4], grid10[6][5], grid10[6][6], grid10[6][7], grid10[6][8], grid10[6][9], grid10[7][2], grid10[7][3], grid10[7][4], grid10[7][5], grid10[7][6], grid10[7][7], grid10[7][8], grid10[8][0], grid10[8][1], grid10[8][2], grid10[8][3], grid10[8][4], grid10[8][5], grid10[8][6], grid10[8][7], grid10[8][8], grid10[9][1], grid10[9][2], grid10[9][3], grid10[9][4], grid10[9][5], grid10[9][6], grid10[9][7]]
      if (answer10.every((cell) => {
        return cell === 'painted';
      })) {
        return {...state, completed: true};
      } else {
        return {...state, completed: false};
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

