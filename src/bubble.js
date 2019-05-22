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
    this.value = BUBBLE_VALUES[props.color];
    this.deltaX = props.deltaX ? props.deltaX : 0;
    this.deltaY = props.deltaY ? props.deltaY : 0;
    this.collided = false;
    this.eliminated = false;
    this.neighbors = null;
  }

  // returns null
  reverseDeltaX() {
    this.deltaX = this.deltaX * -1;
  }
  // returns null
  reverseDeltaY() {
    this.deltaY = this.deltaY * -1;
  }
  // returns [x, y]
  getCoordinates() {
    return [this.x, this.y];
  }
  // returns null
  setCoordinates(newX, newY) {
    this.x = newX;
    this.y = newY;
    this.render();
  }
  // returns null
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
  // returns null
  setDimensions(newW, newH) {
    this.width = newW;
    this.height = newH;
  }
  // returns [[x, y], [w, h]]
  getAttributes() {
    return [getCoordinates(), getDimensions()];
  }
  // returns null
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
  // returns bool
  isOfColor(otherColor) {
    return this.color === otherColor;
  }

  getNeighbors() {
    // find the row col at the given [x, y]
    let boardPos = this.board.getBoardPosAt({ x: this.x, y: this.y });
    let row = boardPos.r;
    let col = boardPos.c;
    let neighbors = [];
    // shift col on odd rows
    if (row % 2 === 0) {
      col = col - 1;
    }
    let pos = {
      uLeft: { r: row - 1, c: col },
      uRight: { r: row - 1, c: col + 1 },
      left: { r: row, c: col - 1 },
      right: { r: row, c: col + 1 },
      bLeft: { r: row + 1, c: col },
      bRight: { r: row + 1, c: col + 1 }
    };
    Object.values(pos).forEach(loc => {
      if (this.board.pieces[loc.r] !== undefined) {
        let row = this.board.pieces[loc.r];
        if (this.board.pieces[loc.r][loc.c] !== undefined) {
          let bubble = row[loc.c];
          neighbors.push(bubble);
        }
      }
    });
    this.neighbors = neighbors;
  }

  // returns null
  fall() {
    this.deltaX = 0;
    this.deltaY = -1;
    // while (!this.hitWalls(0, this.canvas.width, 0, this.canvas.height)) {
    let newX = this.x + this.deltaX;
    let newY = this.y + this.deltaY;
    this.updateCoords(newX, newY);
    // }
  }
  hitBubble() {
    let currentPos = [this.x, this.y];
    let hit = false;
    this.board.pieces.forEach(row => {
      row.forEach(bubble => {
        let bubbleMidpoint = [bubble.x, bubble.y];
        let midpointDelta = Util.getDistanceBetween(bubbleMidpoint, currentPos);
        if (midpointDelta < this.radius * 2) {
          if (this.isOfColor(bubble.color)) {
            console.log("hit same color");
            // drop matching bubbles
            this.dropSameOfColor(bubble);
            hit = true;
            this.collided = true;
            this.eliminated = true;
          } else {
            console.log("bubble hit");
            hit = true;
            this.collided = true;
          }
        }
      });
    });
    return hit;
  }

  dropSameOfColor(hitBubble) {
    let matched = [];
    hitBubble.neighbors.forEach(curBubble => {
      if (curBubble.isOfColor(hitBubble.color)) {
        let boardLoc = this.board.getBoardPosAt({
          x: curBubble.x,
          y: curBubble.y
        });
        let row = this.board.pieces[boardLoc.r];
        let col = boardLoc.c;
        debugger;
        row.splice(col, 1);
        debugger;
        curBubble.eliminated = true;
      }
    });
  }

  // returns null
  fire() {
    // check for and handle bubble collisions
    this.hitBubble();
    this.board.wallsHit();
    let newX = this.x + this.deltaX;
    let newY = this.y + this.deltaY;
    this.setCoordinates(newX, newY);
  }

  update() {
    if (this.eliminated) {
      return;
    }
    if ((this.deltaX !== 0 || this.deltaY !== 0) && this.collided === false) {
      this.fire();
    }
    this.render();
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }
}
