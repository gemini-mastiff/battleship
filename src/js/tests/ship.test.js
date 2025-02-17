import Ship from "../ship-factory.js";

test("Function exists", () => {
  expect(Ship()).toBeDefined();
});

test("Function returns object", () => {
  const ship = Ship(3);
  expect(typeof ship === "object").toBeTruthy();
});

test("Object returns hits", () => {
  const ship = Ship(3);
  expect(ship.getHits()).toBe(0);
});

test("Object returns length", () => {
  const ship = Ship(3);
  expect(ship.getLength()).toBe(3);
});

test("Object returns true/false if sunk", () => {
  const ship = Ship(3);
  expect(ship.isSunk()).toBe(false);
});

test("Hit function increases hits", () => {
  const ship = Ship(3);
  ship.hit();
  expect(ship.getHits()).toBe(1);
});

test("Ship sinks if currHits === length", () => {
  const ship = Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBeTruthy();
});
