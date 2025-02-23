import compareArrays from "./compare-arrays.js";
import createShipCoOrdinates from "./create-ship-coordinates.js";

function validateCoOrdinates(coOrds, prev) {
  for (let i = 0, n = coOrds.length; i < n; i++) {
    for (let j = 0, n2 = prev.length; j < n2; j++) {
      if (compareArrays(coOrds[i], prev[j])) return false;
    }
  }
  return true;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomCoOrd1() {
  const y = getRandomInt(10);
  const x = getRandomInt(10);
  return [y, x];
}

function getRandomCoOrd2(firstCoOrd, length) {
  // randomly generates true or false
  const vertical = Math.random() < 0.5;
  const [y, x] = firstCoOrd;
  if (vertical) {
    if (y + length > 9) return [y - length, x];
    else return [y + length, x];
  } else {
    if (x + length > 9) return [y, x - length];
    else return [y, x + length];
  }
}

export default function randomShips() {
  const lengths = [2, 3, 3, 4, 5];
  const prevCoOrds = [];
  const newCoOrds = [];
  for (let i = 0, n = lengths.length; i < n; i++) {
    let coOrd1;
    let coOrd2;
    let shipCoOrds;
    let valid = false;
    while (!valid) {
      coOrd1 = getRandomCoOrd1();
      coOrd2 = getRandomCoOrd2(coOrd1, lengths[i] - 1);
      shipCoOrds = createShipCoOrdinates(coOrd1, coOrd2);

      if (validateCoOrdinates(shipCoOrds, prevCoOrds)) {
        valid = true;
      }
    }
    newCoOrds.push([coOrd1, coOrd2]);
    prevCoOrds.push(...shipCoOrds);
  }
  return newCoOrds;
}
