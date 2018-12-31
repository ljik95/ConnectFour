
export function checkLine(a,b,c,d) {
  // Check first cell non-zero and all cells match
  return ((a !== '') && (a === b) && (a === c) && (a === d));
}

export function checkWinner(grid) {
  // Check down
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 7; c++) {
      if (checkLine(grid[r][c], grid[r+1][c], grid[r+2][c], grid[r+3][c])){
        return grid[r][c];
      }
    }
  }

  // Check right
  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      if (checkLine(grid[r][c], grid[r][c+1], grid[r][c+2], grid[r][c+3])){
        return grid[r][c];
      }
    }
  }

  // Check down-right
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 4; c++) {
      if (checkLine(grid[r][c], grid[r+1][c+1], grid[r+2][c+2], grid[r+3][c+3])){
        return grid[r][c];
      }
    }
  }

  // Check down-left
  for (let r = 3; r < 6; r++) {
    for (let c = 0; c < 4; c++) {
      if (checkLine(grid[r][c], grid[r-1][c+1], grid[r-2][c+2], grid[r-3][c+3])){
        return grid[r][c];
      }
    }
  }

  return 'none';
}
