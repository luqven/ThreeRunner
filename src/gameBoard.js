// gameBoard.js
// exports Board class
import { Util } from "./utils/globals";
import { Bubble } from "./bubble";

export class Board {
  constructor(props) {
    this.rows = 5;
    this.cols = 10;
    this.tOffset = 1; // add spacer rows from the top
    this.lOffset = 1.5; // add spacer rows from the left
    this.rOffset = 5; // row gaps
    this.pieceWidth = 35;
    this.pieceHeight = 35;
    this.pieces = [];
    this.cannon = props.cannon;
    this.bullet = props.bullet;
    this.canvas = props.canvas;
    this.walls = this.canvas.walls;
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
    this.pieces.forEach(row => {
      row.forEach(bubble => {
        bubble.getNeighbors();
      });
    });
  }

  getBubbleLocAt(row, col) {
    let tOffset = this.tOffset;
    let lOffset = this.lOffset;
    row += tOffset;
    col += lOffset;
    let offset = this.rOffset;
    let x = col * this.pieceWidth * 2;
    // alternate offset on rows, creates shifted grid
    if (row % 2 == 0) {
      x += this.pieceWidth;
    }
    let y = row * (this.pieceHeight - offset) * 2;
    return { x, y };
  }

  getBoardPosAt(loc) {
    let row = Math.floor(loc.x / 2 / this.pieceWidth) - 2;
    let col = Math.floor(loc.y / 2 / (this.pieceHeight - this.rOffset));
    let gridPos = { r: row, c: col };
    return gridPos;
  }

  drawBubbleAt(x, y) {
    let bubble = new Bubble({
      canvas: this.canvas,
      color: Util.getRandomColor(),
      board: this,
      x: x,
      y: y
    });
    return bubble;
  }

  // helper hat saves array of walls hit
  // returns bool
  wallsHit() {
    let midPoint = { x: this.bullet.x, y: this.bullet.y };
    let radius = this.bullet.radius;
    this.bullet.wallsHit = [];
    // if midP +/- radius <=> wall -> wall hit
    if (midPoint.x - radius <= this.walls.left.x) {
      this.bullet.wallsHit.push(2);
      this.bullet.reverseDeltaX();
    } else if (midPoint.x + radius >= this.walls.right.x) {
      this.bullet.wallsHit.push(2);
      this.bullet.reverseDeltaX();
    }
    if (midPoint.y - radius >= this.walls.top.y) {
      this.bullet.wallsHit.push(0);
      this.bullet.reverseDeltaY();
    } else if (midPoint.y + radius <= this.walls.bot.y) {
      this.bullet.wallsHit.push(0);
      this.bullet.reverseDeltaY();
    }
    if (this.bullet.wallsHit.length < 1) {
      return false;
    }
    if (this.bullet.wallsHit.length > 1) {
      return true;
    }
  }

  fire() {
    console.log("fire");
    let location = { x: this.cannon.x, y: this.cannon.y };
    let target = { x: this.cannon.mouseX, y: this.cannon.mouseY };
    let speed = this.getDeltas(location, target);
    // fire the bullet
    this.bullet.board = this;
    this.bullet.deltaX = speed.x;
    this.bullet.deltaY = speed.y;
    this.bullet.fire();
  }

  getDeltas(loc, target) {
    let distancePerFrame = 5;
    let angle = Math.atan2(target.y - loc.y, target.x - loc.x);
    let sin = Math.sin(angle) * distancePerFrame;
    let cos = Math.cos(angle) * distancePerFrame;
    let delta = { x: cos, y: sin };
    return delta;
  }

  render() {
    for (let i = 0; i < this.rows; i++) {
      let row = this.pieces[i];
      for (let j = 0; j < this.cols; j++) {
        let bubble = row[j];
        if (bubble !== undefined) {
          bubble.render();
        }
      }
    }
  }
}
