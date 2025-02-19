import "./styles.css";
import Player from "./js/player.js";
import { generatePlayerDOM, generateCompDOM } from "./js/DOM-manipulation.js";
import getCompChoice from "./js/comp-choice.js";

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

function newTurn() {
  const playerDOM = document.querySelector("#player-board");
  const compDOM = document.querySelector("#computer-board");

  const choices = document.querySelectorAll(".active");
  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      const coOrdinates = [
        parseInt(choice.dataset.y),
        parseInt(choice.dataset.x),
      ];
      console.log(coOrdinates);
      computer.gameboard.recieveAttack(coOrdinates);
      generateCompDOM(compDOM, computer.gameboard);
      const compChoice = getCompChoice(player.gameboard.getPrevShots());
      player.gameboard.recieveAttack(compChoice);
      generatePlayerDOM(playerDOM, player.gameboard);
      newTurn();
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const playerDOM = document.querySelector("#player-board");
  const compDOM = document.querySelector("#computer-board");
  generatePlayerDOM(playerDOM, player.gameboard);
  generateCompDOM(compDOM, computer.gameboard);
  newTurn();
});
