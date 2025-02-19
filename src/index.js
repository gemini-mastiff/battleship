import "./styles.css";
import Player from "./js/player.js";
import {
  generatePlayerBoard,
  generateCompBoard,
} from "./js/DOM-manipulation.js";

window.addEventListener("DOMContentLoaded", () => {
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
  const player = Player();
  const computer = Player();

  for (let i = 0, n = ships.length; i < n; i++) {
    player.gameboard.addShips(ships[i][0], ships[i][1]);
    computer.gameboard.addShips(ships[i][0], ships[i][1]);
  }

  const playerBoard = document.querySelector("#player-board");
  const compBoard = document.querySelector("#computer-board");
  generatePlayerBoard(playerBoard, player.gameboard);
  generateCompBoard(compBoard, computer.gameboard);
});
