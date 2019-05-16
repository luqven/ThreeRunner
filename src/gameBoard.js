// gameBoard.js
// exports Board class
import { Util } from "./utils/globals";
import { Bubble } from "./bubble";

export class Board {
  constructor(props) {
    this.rows = 5;
    this.cols = 10;
    this.pieceWidth = 35;
    this.pieceHeight = 35;
    this.pieces = [];
    this.canvas = props.canvas;
  }

  init() {
    this.createBoard();
    this.populateBoard();
  }

  update() {
    this.render();
  }

  createBoard() {
    // create the rows
    for (let j = 0; j < this.rows; j++) {
      this.pieces.push([]);
    }
    // create the cols
    this.pieces.forEach(row => {
      for (let i = 0; i < this.cols; i++) {
        row.push([]);
      }
    });
  }

  // make 2d array of row / cols
  populateBoard() {
    // add a bubble at every row, col
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let pos = this.getBubbleLocAt(row, col);
        this.pieces[row][col] = this.drawBubbleAt(pos.x, pos.y);
      }
    }
  }

  getBubbleLocAt(row, col) {
    let tOffset = 1; // add spacer rows from the top
    let lOffset = 1.5; // add spacer rows from the left
    row += tOffset;
    col += lOffset;
    let offset = 5; // decrease gap between rows
    let x = col * this.pieceWidth * 2;
    // alternate offset on rows, creates shifted grid
    if (row % 2 == 0) {
      x += this.pieceWidth;
    }
    let y = row * (this.pieceHeight - offset) * 2;
    return { x, y };
  }

  getBoardPosAt(bubbleCenter) {
    let x = bubbleCenter[0];
    let y = bubbleCenter[1];
    let gridY = Math.floor(y / y);
  }

  drawBubbleAt(x, y) {
    let bubble = new Bubble({
      canvas: this.canvas,
      color: Util.getRandomColor(),
      x: x,
      y: y
    });
    return bubble;
  }

  render() {
    for (let i = 0; i < this.rows; i++) {
      let row = this.pieces[i];
      for (let j = 0; j < this.cols; j++) {
        let bubble = row[j];
        bubble.render();
      }
    }
  }
}
