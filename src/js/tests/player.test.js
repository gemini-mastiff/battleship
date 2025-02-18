import Player from "../player.js";

test("Function exists and returns object", () => {
  const player = Player();
  expect(Player()).toBeDefined();
  expect(typeof player === "object").toBeTruthy();
});

test("Object contains gameboard", () => {
  const player = Player();
  expect(typeof player.gameboard === "object").toBeTruthy();
});
