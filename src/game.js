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
    // save the cannon and ammo to the board
    this.board.bullet = this.bullet;
    this.board.cannon = this.cannon;
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
      board: this.board,
      x: this.canvas.width / 2,
      y: this.canvas.height - 80
    });
  }

  render() {
    if (this.canvas.pressedKey === " ") {
      this.board.fire();
      this.canvas.pressedKey = null;
    }
    if (this.board.bullet.collided || this.board.bullet.eliminated) {
      this.createAmmo();
      this.canvas.objects.push(this.bullet);
      this.board.bullet = this.bullet;
    }
    this.canvas.render();
  }
}
