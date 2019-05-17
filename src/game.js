// game.js file
// exports Game class

import { Util } from "./utils/globals";
import { Board } from "./gameBoard";
import { Cannon } from "./cannon";
import Bullet from "./ammunition";

export default class Game {
  constructor(props) {
    this.canvas = props.canvas;
  }
  init() {
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
    // add objects to the canvas
    this.canvas.objects.push(this.cannon);
    this.canvas.objects.push(this.board);
    this.canvas.objects.push(this.bullet);
  }

  // save the mouse position on the canvas
  watchMouseEvents() {
    this.canvas.watchMouseDown();
    this.canvas.watchMouseUp();
    this.canvas.watchMouseMove();
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
      color: "blue",
      x: this.canvas.width / 2,
      y: this.canvas.height - 80
    });
  }

  render() {
    this.canvas.render();
  }
}
