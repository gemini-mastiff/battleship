import "./styles.css";
import Player from "./js/player.js";
import {
  generateBoard,
  generatePlayerDOM,
  generateCompDOM,
} from "./js/DOM-manipulation.js";
import getCompChoice from "./js/comp-choice.js";
import randomShips from "./js/random-ships.js";

const announcement = document.querySelector("#announcement");
const randBtn = document.querySelector("#randomise-btn");
const startBtn = document.querySelector("#start-btn");
const playerDOM = document.querySelector("#player-board");
const compDOM = document.querySelector("#computer-board");

let activeGame = false;
let playerShips = [];
let compShips = [];
let player;
let computer;

function winState(winner) {
  announcement.textContent = `${winner} wins!`;
  const choices = document.querySelectorAll(".active");
  choices.forEach((choice) => {
    choice.classList.remove("active");
  });
  startBtn.textContent = "RESTART?";
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
      computer.gameboard.recieveAttack(coOrdinates);
      generateCompDOM(compDOM, computer.gameboard);
      if (computer.gameboard.allShipsSunk()) {
        winState("Player");
      } else {
        announcement.textContent = "Computer's turn";
        const compChoice = getCompChoice(player.gameboard.getPrevShots());
        player.gameboard.recieveAttack(compChoice);
        announcement.textContent = `Computer attacked ${compChoice}`;
        generatePlayerDOM(playerDOM, player.gameboard);
        if (player.gameboard.allShipsSunk()) {
          winState("Computer");
        } else {
          newTurn();
        }
      }
    });
  });
}

randBtn.addEventListener("click", () => {
  if (!activeGame) {
    playerShips = randomShips();
    generateBoard(playerDOM, playerShips);
  }
});

startBtn.addEventListener("click", () => {
  if (!activeGame) {
    if (playerShips.length === 0) playerShips = randomShips();
    player = Player();
    computer = Player();
    compShips = randomShips();
    for (let i = 0; i < 5; i++) {
      player.gameboard.addShips(playerShips[i][0], playerShips[i][1]);
      computer.gameboard.addShips(compShips[i][0], compShips[i][1]);
    }
    activeGame = true;
    generatePlayerDOM(playerDOM, player.gameboard);
    generateCompDOM(compDOM, computer.gameboard);
    announcement.textContent = "Choose a cell!";
    startBtn.textContent = "STOP GAME";
    newTurn();
  } else {
    activeGame = false;
    generateBoard(playerDOM);
    generateBoard(compDOM);
    announcement.textContent = "Set your ships & start a new game!";
    startBtn.textContent = "START GAME";
  }
});

window.addEventListener("DOMContentLoaded", () => {
  announcement.textContent = "Set your ships & start a new game!";
});
