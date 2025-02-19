function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

export default function getCompChoice(board) {
  const options = [];
  for (let i = 0, n = board.length; i < n; i++) {
    for (let j = 0, m = board[i].length; j < m; j++) {
      if (board[i][j] === 0) options.push([i, j]);
    }
  }
  const choice = options[getRandomIndex(options.length)];
  return choice;
}
