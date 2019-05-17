// game.js file
// exports Game class

import { Util } from "./utils/globals";
import { Board } from "./gameBoard";
import { Cannon } from "./cannon";

export default class Game {
  constructor(props) {
    this.canvas = props.canvas;
  }
  init() {
    // save the mouse position on the canvas
    this.canvas.watchMouseDown();
    this.canvas.watchMouseUp();
    this.canvas.watchMouseMove();
    // create the game board
    this.board = new Board({ canvas: this.canvas });
    // create the cannon
    this.board.init();
    this.cannon = new Cannon({ canvas: this.canvas, board: this.board });
    this.cannon.init();
    // add objects to the canvas
    this.canvas.objects.push(this.cannon);
    this.canvas.objects.push(this.board);
  }
  render() {
    this.canvas.render();
  }
}
