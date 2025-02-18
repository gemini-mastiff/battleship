function clearElement(element) {
  element.textContent = "";
}

function generateGameBoard(board, player) {
  clearElement(board);
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-coordinates", `[${i}, ${j}]`);
      row.append(cell);
    }
    board.append(row);
  }
}

export { generateGameBoard };
