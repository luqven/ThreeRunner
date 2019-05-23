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
    this.eliminated = false; // if bubble has been popped
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
  // check if bubble has hit another bubble
  bubbleHit() {
    let currentPos = [this.x, this.y];
    let pieces = this.board.pieces;
    let hit = false;

    pieces.forEach(row => {
      row.forEach(bubble => {
        if (bubble) {
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
  // checks if bubble of same color, drops all neighbors if true
  handleHit(bubble) {
    if (bubble.isOfColor(this.color)) {
      // drop the hit bubble
      bubble.collided = true;
      bubble.eliminated = true;
      bubble.delete();
      bubble.dropNeighbors();
      this.delete();
    } else {
      this.collided = true;
    }
  }

  // drop neighboring bubbles of same color
  dropNeighbors() {
    debugger;
    this.neighbors.forEach((neighbor, idx) => {
      if (neighbor !== null && neighbor.isOfColor(this.color)) {
        this.neighbors[idx] = null;
        neighbor.delete();
        neighbor.dropNeighbors();
      }
    });
  }
  // eliminate this bubble from the game board
  delete() {
    let row = this.board.pieces[this.row];
    let col = this.col;
    row[col] = null;
    this.eliminated = true;
  }
  // shoot the bubble
  fire() {
    // check for and handle bubble collisions
    this.bubbleHit();
    // check for and handle wall collisions
    this.board.wallsHit();
    let newX = this.x + this.deltaX;
    let newY = this.y + this.deltaY;
    this.setCoordinates(newX, newY);
  }
  // gets called every frame
  update() {
    if (!this.eliminated) {
      if ((this.deltaX !== 0 || this.deltaY !== 0) && this.collided === false) {
        this.fire();
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
