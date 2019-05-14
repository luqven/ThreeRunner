// gameBoard.js
// exports Board class

export class Board {
  constructor(props) {
    this.rows = 5;
    this.cols = 5;
    this.board = [];
    this.pieces = null;
  }

  init() {
    this.populateBoard();
  }
  // make 2d array of row / cols
  populateBoard() {
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push("bubble");
      }
      this.board.push(row);
    }
    console.log(this.board);
  }

  update() {}
}
