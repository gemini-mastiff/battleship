import getCompChoice from "../comp-choice.js";

const exampleBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, "m", 0, 0],
  ["h", "m", 0, 0, 0, 0, 0, 0, 0, 0],
  ["h", 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ["h", 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ["h", 0, 0, 0, "m", 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, "h", "h", 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, "m", 0],
];

test("Function exists", () => {
  expect(getCompChoice(exampleBoard)).toBeDefined();
});

test("Function returns array", () => {
  const result = getCompChoice(exampleBoard);
  expect(Array.isArray(result)).toBe(true);
});

test("Array has two values", () => {
  const result = getCompChoice(exampleBoard);
  expect(result.length == 2).toBe(true);
});
