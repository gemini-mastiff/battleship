function compareArrays(a, b) {
  return (
    a.length === b.length && a.every((element, index) => element === b[index])
  );
}

function clearElement(element) {
  element.textContent = "";
}

function generatePlayerDOM(DOMboard, playerBoard) {
  clearElement(DOMboard);
  const shipCoOrds = playerBoard.getShipCoOrds();
  const prevShots = playerBoard.getPrevShots();

  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-y", i);
      cell.setAttribute("data-x", j);

      for (let x = 0, n = shipCoOrds.length; x < n; x++) {
        for (let y = 0, m = shipCoOrds[x].length; y < m; y++) {
          if (compareArrays(shipCoOrds[x][y], [i, j])) {
            cell.classList.add(`ship${x}`);
            break;
          }
        }
      }

      if (prevShots[i][j] === "h") cell.classList.add("hit");
      else if (prevShots[i][j] === "m") cell.classList.add("miss");

      row.append(cell);
    }
    DOMboard.append(row);
  }
}

function generateCompDOM(DOMboard, compBoard) {
  clearElement(DOMboard);
  const prevShots = compBoard.getPrevShots();

  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-y", i);
      cell.setAttribute("data-x", j);

      if (prevShots[i][j] === "h") cell.classList.add("hit");
      else if (prevShots[i][j] === "m") cell.classList.add("miss");
      else cell.classList.add("active");

      row.append(cell);
    }
    DOMboard.append(row);
  }
}

export { generatePlayerDOM, generateCompDOM };
