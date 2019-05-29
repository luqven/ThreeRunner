// game.js file
// exports Game class

import { Util } from "./utils/globals";
import { Board } from "./gameBoard";
import { Cannon } from "./cannon";
import Bullet from "./ammunition";

export default class Game {
  constructor(props) {
    this.canvas = props.canvas;
    this.start = false;
    this.over = false;
  }
  init() {
    // display the welcome message
    this.welcomeMessage();
    // save the mouse position on the canvas
    this.watchMouseEvents();
    // save the current key pressed
    this.watchKeyPress();
    // create and save the game board
    this.createGameBoard();
    // create and save the bubble cannon
    this.createCannon();
    // create and save ammunition
    this.createAmmo();
    // save the cannon and ammo to the board
    this.board.bullet = this.bullet;
    this.board.cannon = this.cannon;
    // add objects to the canvas
    this.canvas.objects.push(this.cannon);
    this.canvas.objects.push(this.board);
    this.canvas.objects.push(this.bullet);
  }

  welcomeMessage() {
    let startBtn = document.querySelector(".start-btn");
    startBtn.addEventListener("click", e => {
      startBtn.classList.add("hidden");
      this.startGame();
    });
  }

  startGame() {
    let controls = document.querySelector(".controlsModal");
    controls.classList.toggle("transparent");
    this.start = true;
  }

  restartGame() {
    let button = document.querySelector(".start-btn");
    button.innerHTML = "RESTART";
    button.classList.remove("hidden");
    this.start = false;
    this.over = false;
    this.init();
  }
  // save the mouse position on the canvas
  watchMouseEvents() {
    this.canvas.watchMouseDown();
    this.canvas.watchMouseUp();
    this.canvas.watchMouseMove();
    this.canvas.watchDoubleClick();
    this.canvas.watchTouchMove();
  }

  watchKeyPress() {
    this.canvas.watchKeyPress();
  }

  createGameBoard() {
    this.board = new Board({ canvas: this.canvas });
    this.board.init();
  }

  createCannon() {
    this.cannon = new Cannon({
      canvas: this.canvas,
      board: this.board
    });
    this.cannon.init();
  }

  createAmmo() {
    this.bullet = new Bullet({
      canvas: this.canvas,
      color: Util.getRandomColor(),
      board: this.board,
      x: this.canvas.width / 2,
      y: this.canvas.height - 80
    });
  }

  gameOver() {
    let over = true;
    this.board.pieces.forEach(row => {
      row.forEach(bubble => {
        if (bubble !== null && bubble.eliminated === false) {
          over = false;
          return;
        }
      });
    });
    return over;
  }

  render() {
    if (this.gameOver() === false) {
      if (this.canvas.pressedKey === " ") {
        this.board.fire();
        this.canvas.pressedKey = null;
        this.createAmmo();
        this.canvas.objects.push(this.bullet);
        this.board.bullet = this.bullet;
      }
      this.canvas.render();
    } else {
      this.restartGame();
    }
  }
}
