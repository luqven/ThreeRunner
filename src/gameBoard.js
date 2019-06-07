// gameBoard.js
// exports Board class
import { Util } from "./utils/globals";
import { Bubble } from "./bubble";

export class Board {
  constructor(props) {
    this.rows = 5;
    this.cols = 10;
    this.topOffset = 1; // add spacer rows from the top
    this.leftOffset = 1.5; // add spacer rows from the left
    this.rowGap = 5;
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
        this.pieces[row][col] = this.drawBubbleAt(pos.x, pos.y, row, col);
      }
    }
    this.pieces.forEach(row => {
      row.forEach(bubble => {
        bubble.getNeighbors();
      });
    });
  }

  getBubbleLocAt(row, col) {
    row += this.topOffset;
    col += this.leftOffset;
    let x = col * this.pieceWidth * 2;
    // alternate offset on rows, creates shifted grid
    if (row % 2 == 0) {
      x += this.pieceWidth;
    }
    let y = row * (this.pieceHeight - this.rowGap) * 2;
    return { x, y };
  }

  getBoardPosAt(loc) {
    let row = Math.floor(
      loc.y / (this.pieceHeight - this.rowGap) / 2 - this.topOffset
    );
    let offset = 0;
    // add offset if on odd row to compensate for shift in board
    if (row % 2 !== 0) {
      offset = this.pieceWidth / 2;
    }
    let col = Math.floor(
      (loc.x - offset) / this.pieceWidth / 2 - this.leftOffset
    );
    let gridPos = { r: row, c: col };
    return gridPos;
  }

  isValidLoc(row, col) {
    // if adding beyond current size, expand board
    if (!this.pieces[row]) {
      this.pieces.push([]);
      return true;
    }
    // if trying to as to pos where bubble already exists
    else if (this.pieces[row][col]) {
      return false;
    }
    return true;
  }

  snapToBoard(bubble, row, col) {
    if (this.isValidLoc(row, col)) {
      console.log(`*** ammunition stored @ [${[row, col]}]`);
      bubble.row = row;
      bubble.col = col;
      this.pieces[row][col] = bubble;
      let newCoords = this.getBubbleLocAt(row, col);
      console.log(`*** - redraw bubble @ [${(newCoords.x, newCoords.y)}]`);
      bubble.x = newCoords.x;
      bubble.y = newCoords.y;
      console.log("*** - check for bubble hit at new loc");
      // bubble.hitNeighbor();
    } else {
      console.log(`!!! invalid ammo pos @ [${[row, col]}]`);
      bubble.x -= bubble.radius / this.pieceWidth;
      bubble.y += bubble.radius / this.pieceHeight;
      let newLoc = this.getBoardPosAt({
        x: bubble.x,
        y: bubble.y
      });
      this.snapToBoard(bubble, newLoc.r, newLoc.c);
    }
  }

  drawBubbleAt(x, y, row, col) {
    let bubble = new Bubble({
      canvas: this.canvas,
      color: Util.getRandomColor(),
      board: this,
      x: x,
      y: y,
      row: row,
      col: col
    });
    return bubble;
  }

  // helper hat saves array of walls hit
  // returns bool
  wallsHit(bullet) {
    let midPoint = { x: bullet.x, y: bullet.y };
    let radius = bullet.radius;
    bullet.wallsHit = [];
    // if midP +/- radius <=> wall -> wall hit
    if (midPoint.x - radius <= this.walls.left.x) {
      bullet.wallsHit.push(1);
      bullet.reverseDeltaX();
    } else if (midPoint.x + radius >= this.walls.right.x) {
      bullet.wallsHit.push(2);
      bullet.reverseDeltaX();
    }
    if (midPoint.y - radius >= this.walls.top.y + 50) {
      bullet.wallsHit.push(3);
      bullet.reverseDeltaY();
      bullet.deltaY = 0;
      bullet.deltaX = 0;
    } else if (midPoint.y + radius <= this.walls.bot.y) {
      bullet.wallsHit.push(0);
      bullet.deltaY = 0;
      bullet.deltaX = 0;
    }
    if (bullet.wallsHit.length < 1) {
      return false;
    }
    if (bullet.wallsHit.length > 1) {
      return true;
    }
  }

  fire() {
    let music = document.querySelector(".gameMusic");
    let location = { x: this.cannon.x, y: this.cannon.y };
    let target = { x: this.cannon.mouseX, y: this.cannon.mouseY };
    let speed = this.getDeltas(location, target);
    // fire the bullet
    this.bullet.board = this;
    this.bullet.deltaX = speed.x;
    this.bullet.deltaY = speed.y;
    if (!music.paused) {
      this.bullet.playFx();
    }
    this.bullet.move();
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
        if (bubble !== null && bubble !== undefined) {
          bubble.render();
        }
      }
    }
  }
}
