export default function Ship(length) {
  const shipLength = length;
  let currHits = 0;

  const getLength = () => shipLength;
  const getHits = () => currHits;

  const hit = () => currHits++;
  const isSunk = () => currHits >= shipLength;

  return { getLength, getHits, hit, isSunk };
}
