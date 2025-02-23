import compareArrays from "./compare-arrays.js";
import createShipCoOrdinates from "./create-ship-coordinates.js";

function clearElement(element) {
  element.textContent = "";
}

function generateBoard(DOMboard, ships = undefined) {
  clearElement(DOMboard);

  let shipCoOrds = [];
  if (ships) {
    for (let i = 0, n = ships.length; i < n; i++) {
      shipCoOrds.push(createShipCoOrdinates(ships[i][0], ships[i][1]));
    }
  }

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

      row.append(cell);
    }
    DOMboard.append(row);
  }
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
  const ships = compBoard.getShips();
  const shipCoOrds = compBoard.getShipCoOrds();
  const prevShots = compBoard.getPrevShots();

  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-y", i);
      cell.setAttribute("data-x", j);

      for (let x = 0, n = shipCoOrds.length; x < n; x++) {
        for (let y = 0, m = shipCoOrds[x].length; y < m; y++) {
          if (compareArrays(shipCoOrds[x][y], [i, j]) && ships[x].isSunk()) {
            cell.classList.add(`ship${x}`);
            break;
          }
        }
      }

      if (prevShots[i][j] === "h") cell.classList.add("hit");
      else if (prevShots[i][j] === "m") cell.classList.add("miss");
      else cell.classList.add("active");

      row.append(cell);
    }
    DOMboard.append(row);
  }
}

export { generateBoard, generatePlayerDOM, generateCompDOM };
