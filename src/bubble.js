// bubble.js
// exports Bubble class

import { Util } from "./utils/globals";

// point values of each color
const BUBBLE_VALUES = {
  "rgba(255, 0, 0)": 1,
  blue: 1,
  green: 1,
  yellow: 1
};

export class Bubble {
  constructor(props) {
    this.canvas = props.canvas;
    this.ctx = props.canvas.ctx;
    this.x = props.x;
    this.y = props.y;
    this.row = props.row;
    this.col = props.col;
    this.width = 35;
    this.height = 35;
    this.radius = 35;
    this.board = props.board;
    this.color = props.color;
    this.value = BUBBLE_VALUES[props.color]; // point value of bubble
    this.deltaX = props.deltaX ? props.deltaX : 0;
    this.deltaY = props.deltaY ? props.deltaY : 0;
    this.collided = false; // if bubble has hit another bubble
    this.falling = false; // the bubble was hit an is falling
    this.eliminated = false; // if bubble has finished falling
    this.neighbors = null; // bubbles at [u, d, l, r, uR, uL, dR, dL]
  }
  reverseDeltaX() {
    this.deltaX = this.deltaX * -1;
  }
  reverseDeltaY() {
    this.deltaY = this.deltaY * -1;
  }
  // returns [x, y] loc of bubble
  getCoordinates() {
    return [this.x, this.y];
  }
  // changes [x, y] loc of bubble
  setCoordinates(newX, newY) {
    this.x = newX;
    this.y = newY;
    this.render();
  }
  // changes orientation of bubble
  updateCoords(newX, newY) {
    this.ctx.save();
    this.ctx.translate(newX, newY);
    this.update();
    this.ctx.translate(-newX, -newY);
    this.ctx.restore();
  }
  // returns [w, h]
  getDimensions() {
    return [this.width, this.height];
  }
  // changes [w, h]
  setDimensions(newW, newH) {
    this.width = newW;
    this.height = newH;
  }
  // returns [[x, y], [w, h]]
  getAttributes() {
    return [getCoordinates(), getDimensions()];
  }
  // changes coordinates and or dimensions
  updateAttributes(newCoords, newDims) {
    let newX, newY, newW, newH;
    if (newCoords) {
      newX = newCoords[0];
      newY = newCoords[1];
      this.setCoordinates(newX, newY);
    }
    if (newDims) {
      newW = newDims[0];
      newH = newDims[1];
      this.setDimensions(newW, newH);
    }
  }
  isOfColor(otherColor) {
    return this.color === otherColor;
  }
  // saves array of neighboring bubbles
  getNeighbors() {
    // find the row col at the given [x, y]
    let row = this.row;
    let col = this.col;
    let neighbors = [];
    // shift col on odd rows
    // if (row % 2 != 0) {
    //   col = col + 1;
    // }
    let positions = this.getPosToCheck(row, col);
    Object.values(positions).forEach(pos => {
      if (this.board.pieces[pos.r] !== undefined) {
        let row = this.board.pieces[pos.r];
        if (this.board.pieces[pos.r][pos.c] !== undefined) {
          let bubble = row[pos.c];
          neighbors.push(bubble);
        }
      }
    });
    this.neighbors = neighbors;
  }
  // get row, col values at [u, d, l, r, uR, uL, dR, dL]
  getPosToCheck(row, col) {
    let oddOffset = 0;
    let eventOffset = 0;
    if (row % 2 !== 0) {
      oddOffset = 1;
    } else {
      eventOffset = -1;
    }
    return {
      up: { r: row - 1, c: col },
      bot: { r: row + 1, c: col },
      left: { r: row, c: col - 1 },
      right: { r: row, c: col + 1 },
      uLeft: { r: row - 1, c: col - 1 + oddOffset },
      uRight: { r: row - 1, c: col + oddOffset + eventOffset },
      bLeft: { r: row + 1, c: col - 1 + oddOffset },
      bRight: { r: row + 1, c: col + 1 + eventOffset }
    };
  }
  // drop neighboring bubbles of same color
  dropNeighbors() {
    if (!this.neighbors) {
      return;
    }
    this.neighbors.forEach((neighbor, idx) => {
      if (neighbor !== null && neighbor.isOfColor(this.color)) {
        this.neighbors[idx] = null;
        neighbor.delete();
        neighbor.dropNeighbors();
      }
    });
  }
  storeHit(bubble) {
    let top = bubble.y - bubble.radius;
    let bot = bubble.y + bubble.radius;
    let left = bubble.x - bubble.radius;
    let right = bubble.x + bubble.radius;
    let newCol, newRow;
    // get the row value
    if (this.y < top) {
      newRow = bubble.row - 1;
    } else if (this.y > bot) {
      newRow = bubble.row + 1;
    } else {
      newRow = bubble.row;
    }
    // get the col value
    if (this.x < left) {
      newCol = bubble.col - 1;
    } else if (this.x > right) {
      newCol = bubble.col + 1;
    } else {
      newCol = bubble.col;
    }
    if (!this.board.pieces[newRow]) {
      this.board.pieces.push([]);
    }
    // console.log(`store at ${newRow} ${newCol}, ${this.collided}`);
    this.row = newRow;
    this.col = newCol;
    if (newRow < 0) {
      newRow = Math.abs(newRow);
    }
    if (newCol < 0) {
      newCol = Math.abs(newCol);
    }
    this.board.pieces[newRow][newCol] = this;
  }
  // eliminate this bubble from the game board
  delete() {
    this.deltaX = 0;
    this.deltaY = +5;
    // if bubble currently on the board, remove it
    if (this.row !== undefined && this.col !== undefined) {
      let row = this.board.pieces[this.row];
      let col = this.col;
      row[col] = null;
    }
    this.falling = true;
    this.canvas.objects.push(this);
  }
  // checks if bubble of same color, drops all neighbors if true
  handleHit(bubble) {
    if (bubble.isOfColor(this.color)) {
      // drop the hit bubble
      // bubble.collided = true;
      // bubble.eliminated = true;
      bubble.dropNeighbors();
      bubble.delete();
      this.delete();
    } else {
      this.collided = true;
      // store bubble in board
      this.storeHit(bubble);
    }
  }
  // check if bubble has hit another bubble
  bubbleHit() {
    // ignore hits when being eliminated
    if (this.falling === true) {
      return false;
    }
    let currentPos = [this.x, this.y];
    let pieces = this.board.pieces;
    let hit = false;

    pieces.forEach(row => {
      row.forEach(bubble => {
        if (bubble && !hit) {
          let bubbleMidpoint = [bubble.x, bubble.y];
          let midpointDiff = Util.getDistanceBetween(
            bubbleMidpoint,
            currentPos
          );
          if (midpointDiff < this.radius * 2) {
            hit = true;
            this.handleHit(bubble);
          }
        }
      });
    });
    return hit;
  }
  // shoot the bubble
  move() {
    // check for and handle bubble collisions
    this.bubbleHit();
    // check for and handle wall collisions
    this.board.wallsHit(this);
    // if hit top wall, or bottom of the canvas
    if (this.wallsHit.pop() === 0) {
      this.collided = true;
    }
    let newX = this.x + this.deltaX;
    let newY = this.y + this.deltaY;
    this.setCoordinates(newX, newY);
  }
  // gets called every frame
  update() {
    if (!this.eliminated) {
      if ((this.deltaX !== 0 || this.deltaY !== 0) && this.collided === false) {
        this.move();
      }
      this.render();
    }
  }
  // draw the bubble
  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}

// // returns null
// fall() {
//   this.deltaX = 0;
//   this.deltaY = -1;
//   // while (!this.hitWalls(0, this.canvas.width, 0, this.canvas.height)) {
//   let newX = this.x + this.deltaX;
//   let newY = this.y + this.deltaY;
//   this.updateCoords(newX, newY);
//   // }
// }
