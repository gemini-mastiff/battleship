import { experiments } from "webpack";
import Gameboard from "../gameboard.js";

test("Function exists", () => {
  expect(Gameboard()).toBeDefined();
});

test("Function returns object", () => {
  const board = Gameboard();
  expect(typeof board === "object").toBeTruthy();
});

test("Object returns array of current ships and co-ordinates", () => {
  const board = Gameboard();
  expect(Array.isArray(board.getShips())).toBeTruthy();
  expect(Array.isArray(board.getShipCoOrds())).toBeTruthy();
});

test("addShips takes two co-ordinates and adds coOrds and Ship", () => {
  const testCases = [
    {
      input: [
        [1, 1],
        [1, 3],
      ],
      output: [
        [1, 1],
        [1, 2],
        [1, 3],
      ],
    },
    {
      input: [
        [3, 7],
        [7, 7],
      ],
      output: [
        [3, 7],
        [4, 7],
        [5, 7],
        [6, 7],
        [7, 7],
      ],
    },
    {
      input: [
        [1, 1],
        [1, 5],
      ],
      output: [
        [1, 1],
        [1, 2],
        [1, 3],
        [1, 4],
        [1, 5],
      ],
    },
  ];
  testCases.forEach((test) => {
    const board = Gameboard();
    board.addShips(test.input[0], test.input[1]);
    expect(board.getShipCoOrds()[0]).toEqual(test.output);
  });
});

test("addShips throws appropriate Errors", () => {
  const mockValidate = jest.fn((a, b) => {
    if (
      a.length === b.length &&
      a.every((element, index) => element === b[index])
    )
      throw new Error("Co-Ordinates must be different");
    if (a[0] !== b[0] && a[1] !== b[1])
      throw new Error(
        "Co-Ordinates must be in either a horizontal or vertical line",
      );

    if (a[0] < 0 || a[0] > 9)
      throw new Error("Co-Ordinates must be between 0-9");
    if (a[1] < 0 || a[1] > 9)
      throw new Error("Co-Ordinates must be between 0-9");
    if (b[0] < 0 || b[0] > 9)
      throw new Error("Co-Ordinates must be between 0-9");
    if (b[1] < 0 || b[1] > 9)
      throw new Error("Co-Ordinates must be between 0-9");

    const yDiff = a[0] - b[0];
    const xDiff = a[1] - b[1];

    if (yDiff < -4 || yDiff > 4)
      throw new Error(
        "Difference between Co-Ordinates must be no greater than 4",
      );
    if (xDiff < -4 || xDiff > 4)
      throw new Error(
        "Difference between Co-Ordinates must be no greater than 4",
      );
  });
  const testCases = [
    {
      input: [
        [1, 1],
        [1, 1],
      ],
      error: "Co-Ordinates must be different",
    },
    {
      input: [
        [1, 1],
        [2, 2],
      ],
      error: "Co-Ordinates must be in either a horizontal or vertical line",
    },
    {
      input: [
        [1, 1],
        [1, 6],
      ],
      error: "Difference between Co-Ordinates must be no greater than 4",
    },
    {
      input: [
        [1, 1],
        [6, 1],
      ],
      error: "Difference between Co-Ordinates must be no greater than 4",
    },
    {
      input: [
        [-1, 0],
        [3, 0],
      ],
      error: "Co-Ordinates must be between 0-9",
    },
    {
      input: [
        [0, -1],
        [0, 3],
      ],
      error: "Co-Ordinates must be between 0-9",
    },
    {
      input: [
        [7, 0],
        [10, 0],
      ],
      error: "Co-Ordinates must be between 0-9",
    },
    {
      input: [
        [0, 7],
        [0, 10],
      ],
      error: "Co-Ordinates must be between 0-9",
    },
  ];
  testCases.forEach((test) => {
    expect(() => mockValidate(test.input[0], test.input[1])).toThrow(
      test.error,
    );
  });
});

test("gameboard can recieve attack", () => {
  const board = Gameboard();
  const ships = [
    [
      [0, 4],
      [0, 5],
    ],
    [
      [2, 0],
      [5, 0],
    ],
    [
      [7, 3],
      [7, 5],
    ],
    [
      [4, 8],
      [7, 8],
    ],
    [
      [8, 2],
      [8, 6],
    ],
  ];
  ships.forEach((ship) => {
    board.addShips(ship[0], ship[1]);
  });
  expect(board.recieveAttack([1, 1])).toBeDefined();
  expect(board.getPrevMisses().length).toBe(1);
  expect(board.recieveAttack([2, 0])).toBe(true);
  expect(board.getShips()[1].getHits()).toBe(1);
  expect(board.getPrevHits().length).toBe(1);
  expect(board.recieveAttack([6, 6])).toBe(false);
});

test("gameboard returns whether all ships are sunk", () => {
  const board = Gameboard();
  const ships = [
    [
      [0, 4],
      [0, 5],
    ],
    [
      [2, 0],
      [5, 0],
    ],
    [
      [7, 3],
      [7, 5],
    ],
    [
      [4, 8],
      [7, 8],
    ],
    [
      [8, 2],
      [8, 6],
    ],
  ];
  ships.forEach((ship) => {
    board.addShips(ship[0], ship[1]);
  });
  const shipCoOrds = board.getShipCoOrds();
  for (let i = 0, n = shipCoOrds.length - 1; i < n; i++) {
    for (let j = 0, n = shipCoOrds[i].length; j < n; j++) {
      board.recieveAttack(shipCoOrds[i][j]);
    }
  }
  expect(board.allShipsSunk()).toBe(false);
  for (let i = 0, n = shipCoOrds[4].length; i < n; i++) {
    board.recieveAttack(shipCoOrds[4][i]);
  }
  expect(board.allShipsSunk()).toBe(true);
});
