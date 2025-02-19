import Ship from "./ship.js";

function compareArrays(a, b) {
  return (
    a.length === b.length && a.every((element, index) => element === b[index])
  );
}

function validateAttack(coOrds) {
  if (coOrds[0] < 0 || coOrds[0] > 9)
    throw new Error("Co-Ordinates must be between 0-9");
  if (coOrds[1] < 0 || coOrds[1] > 9)
    throw new Error("Co-Ordinates must be between 0-9");
}

function validateCoOrdinates(a, b) {
  if (compareArrays(a, b)) throw new Error("Co-Ordinates must be different");
  if (a[0] !== b[0] && a[1] !== b[1])
    throw new Error(
      "Co-Ordinates must be in either a horizontal or vertical line",
    );

  const yDiff = a[0] - b[0];
  const xDiff = a[1] - b[1];

  if (a[0] < 0 || a[0] > 9) throw new Error("Co-Ordinates must be between 0-9");
  if (a[1] < 0 || a[1] > 9) throw new Error("Co-Ordinates must be between 0-9");
  if (b[0] < 0 || b[0] > 9) throw new Error("Co-Ordinates must be between 0-9");
  if (b[1] < 0 || b[1] > 9) throw new Error("Co-Ordinates must be between 0-9");

  if (yDiff < -4 || yDiff > 4)
    throw new Error(
      "Difference between Co-Ordinates must be no greater than 4",
    );
  if (xDiff < -4 || xDiff > 4)
    throw new Error(
      "Difference between Co-Ordinates must be no greater than 4",
    );
}

function createShipCoOrdinates(coOrd1, coOrd2) {
  const y = coOrd1[0];
  const x = coOrd1[1];
  const y2 = coOrd2[0];
  const x2 = coOrd2[1];

  let constant;
  let min;
  let max;
  const coOrds = [];

  if (x === x2 && y !== y2) {
    constant = x;
    min = y < y2 ? y : y2;
    max = y > y2 ? y : y2;
    for (let i = min; i <= max; i++) {
      coOrds.push([i, constant]);
    }
  } else if (x !== x2 && y === y2) {
    constant = y;
    min = x < x2 ? x : x2;
    max = x > x2 ? x : x2;
    for (let i = min; i <= max; i++) {
      coOrds.push([constant, i]);
    }
  }
  return coOrds;
}

export default function Gameboard() {
  const ships = [];
  const shipCoOrds = [];
  const prevShots = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const getShips = () => ships;
  const getShipCoOrds = () => shipCoOrds;
  const getPrevShots = () => prevShots;

  const addShips = (coOrd1, coOrd2) => {
    validateCoOrdinates(coOrd1, coOrd2);
    const coOrdinates = createShipCoOrdinates(coOrd1, coOrd2);
    const shipLength = coOrdinates.length;
    shipCoOrds.push(coOrdinates);
    ships.push(Ship(shipLength));
  };
  const recieveAttack = (coOrds) => {
    validateAttack(coOrds);
    const [y, x] = coOrds;
    for (let i = 0, n = shipCoOrds.length; i < n; i++) {
      const currArr = shipCoOrds[i];
      for (let j = 0, m = currArr.length; j < m; j++) {
        if (compareArrays(currArr[j], coOrds)) {
          ships[i].hit();
          prevShots[y][x] = "h";
          return true;
        }
      }
    }
    prevShots[y][x] = "m";
    return false;
  };
  const allShipsSunk = () => {
    for (let i = 0, n = ships.length; i < n; i++) {
      if (!ships[i].isSunk()) return false;
    }
    return true;
  };

  return {
    getShips,
    getShipCoOrds,
    getPrevShots,
    addShips,
    recieveAttack,
    allShipsSunk,
  };
}

// prevShots = [
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ]
