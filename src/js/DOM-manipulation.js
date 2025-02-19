function compareArrays(a, b) {
  return (
    a.length === b.length && a.every((element, index) => element === b[index])
  );
}

function clearElement(element) {
  element.textContent = "";
}

function generatePlayerBoard(board, playerBoard) {
  clearElement(board);
  const prevHits = playerBoard.getPrevHits();
  const prevMisses = playerBoard.getPrevMisses();
  const shipCoOrds = playerBoard.getShipCoOrds();

  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-coordinates", [i, j]);

      for (let x = 0, n = shipCoOrds.length; x < n; x++) {
        for (let y = 0, m = shipCoOrds[x].length; y < m; y++) {
          if (compareArrays(shipCoOrds[x][y], [i, j])) {
            cell.classList.add(`ship${x}`);
            break;
          }
        }
      }

      for (let x = 0, n = prevHits.length; x < n; x++) {
        if (compareArrays(prevHits[x], [i, j])) {
          cell.classList.add("hit");
          break;
        }
      }

      for (let x = 0, n = prevMisses.length; x < n; x++) {
        if (compareArrays(prevMisses[x], [i, j])) {
          cell.classList.add("miss");
          break;
        }
      }

      row.append(cell);
    }
    board.append(row);
  }
}

function generateCompBoard(board, compBoard) {
  clearElement(board);
  const prevHits = compBoard.getPrevHits();
  const prevMisses = compBoard.getPrevMisses();

  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell", "active");
      cell.setAttribute("data-coordinates", [i, j]);

      for (let x = 0, n = prevHits.length; x < n; x++) {
        if (compareArrays(prevHits[x], [i, j])) {
          cell.classList.add("hit", "inactive");
          break;
        }
      }

      for (let x = 0, n = prevMisses.length; x < n; x++) {
        if (compareArrays(prevMisses[x], [i, j])) {
          cell.classList.add("miss", "inactive");
          break;
        }
      }

      row.append(cell);
    }
    board.append(row);
  }
}

export { generatePlayerBoard, generateCompBoard };
