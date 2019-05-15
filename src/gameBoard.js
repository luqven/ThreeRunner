// gameBoard.js
// exports Board class
import { Util } from "./utils/globals";
import { Bubble } from "./bubble";

export class Board {
  constructor(props) {
    this.rows = 5;
    this.cols = 5;
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
    let startX = this.canvas.width / 5.5;
    let startY = -35;
    let gap = 70;
    let currentX = startX;
    let currentY = startY;
    for (let i = 1; i < this.rows + 1; i++) {
      let row = [];
      currentY += gap;
      for (let j = 1; j < this.cols + 1; j++) {
        let bubbleX = currentX + j * gap;
        let bubbleY = currentY;
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
        console.log(newBubble.getCoordinates());
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
