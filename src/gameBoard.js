// gameBoard.js
// exports Board class
import { Util } from "./utils/globals";
import { Bubble } from "./bubble";

export class Board {
  constructor(props) {
    this.rows = 5;
    this.cols = 10;
    this.board = [];
    this.pieces = null;
    this.canvas = props.canvas;
  }

  init() {
    this.populateBoard();
    this.render();
  }
  // make 2d array of row / cols
  populateBoard() {
    let bubbleDiameter = 70;
    let startX = bubbleDiameter * 1.5;
    let startY = -bubbleDiameter / 2.8;
    let gap = 70;
    let yGap = 60;
    let currentX = startX;
    let currentY = startY;
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      currentY += yGap;
      for (let j = 0; j < this.cols; j++) {
        let bubbleX = currentX + j * gap;
        let bubbleY = currentY;
        // alternate offset on even rows
        // to create shifted grid
        if (i % 2 == 0) {
          bubbleX += bubbleDiameter / 2;
        }

        let newBubble = new Bubble({
          color: Object.values(Util.colors)[
            Util.getRandom(0, Object.values(Util.colors).length)
          ],
          x: bubbleX,
          y: bubbleY,
          canvas: this.canvas
        });
        newBubble.setCoordinates(bubbleX, bubbleY);
        row.push(newBubble);
      }
      this.board.push(row);
    }
  }

  // update() {}
  render() {
    for (let i = 0; i < this.rows; i++) {
      let row = this.board[i];
      for (let j = 0; j < this.cols; j++) {
        let bubble = row[j];
        bubble.render();
      }
    }
  }
}
