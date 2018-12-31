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
  yellowWinCount: 0
};

const DROP = 'DROP';
const RESET = 'RESET';
const CHECK = 'CHECK';

export const drop = (cellIndex) => ({ type: DROP, cellIndex })
export const reset = () => ({ type: RESET })
export const check = () => ({ type: CHECK })

function reducer (state = initialState, action) {
  switch (action.type) {
    case DROP:
      const newGrid = [...state.grid]
      let i = 5;
      while (i >= 0) {
        if (newGrid[i][action.cellIndex] === '') {
          newGrid[i] = [...newGrid[i]];
          newGrid[i][action.cellIndex] = state.currentColor;
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

