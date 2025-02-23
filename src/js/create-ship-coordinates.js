export default function createShipCoOrdinates(coOrd1, coOrd2) {
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
