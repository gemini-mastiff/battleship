import randomShips from "../random-ships.js";

test("Function exists", () => {
  const result = randomShips();
  expect(result).toBeDefined();
});

test("Function returns array", () => {
  const arr = randomShips();
  expect(Array.isArray(arr)).toBeTruthy();
});

test("Array contains five arrays", () => {
  const arr = randomShips();
  expect(arr.length).toBe(5);
  arr.forEach((array) => {
    expect(Array.isArray(array)).toBeTruthy();
  });
});
