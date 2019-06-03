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
    this.cluster = [];
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
  // get row, col values at [l, r, uR, uL, dR, dL]
  getPosToCheck(row, col) {
    if (row % 2 !== 0) {
      return {
        left: { r: row, c: col - 1 },
        right: { r: row, c: col + 1 },
        uLeft: { r: row - 1, c: col },
        uRight: { r: row - 1, c: col + 1 },
        bLeft: { r: row + 1, c: col },
        bRight: { r: row + 1, c: col + 1 }
      };
    } else {
      return {
        left: { r: row, c: col - 1 },
        right: { r: row, c: col + 1 },
        uLeft: { r: row - 1, c: col - 1 },
        uRight: { r: row - 1, c: col },
        bLeft: { r: row + 1, c: col - 1 },
        bRight: { r: row + 1, c: col }
      };
    }
  }
  findCluster(cluster = []) {
    if (!this.neighbors) {
      this.getNeighbors();
    }
    this.neighbors.forEach((neighbor, idx) => {
      if (neighbor !== null && neighbor.isOfColor(this.color)) {
        this.neighbors[idx] = null;
        console.log(`neighbor loc = ${[neighbor.row, neighbor.col]}`);
        if (!cluster.includes(neighbor)) {
          cluster.push(neighbor);
        }
        if (!neighbor.cluster.includes(this)) {
          neighbor.cluster.push(this);
        }
        neighbor.findCluster(cluster);
      }
    });
    return cluster;
  }
  clusterOfMinSize(cluster) {
    let min = 3;
    let result = false;
    while (cluster.length > 0) {
      min -= cluster.length;
      if (min <= 0) {
        result = true;
        break;
      }
      cluster = cluster[0];
      if (!Array.isArray(cluster)) {
        cluster = [cluster];
      }
    }
    return result;
  }
  dropCluster(cluster) {
    cluster.forEach(bubble => {
      bubble.delete();
    });
  }
  storeHit() {
    this.collided = true;
    let newLoc = this.board.getBoardPosAt({
      x: this.x,
      y: this.y
    });
    let newRow = newLoc.r;
    let newCol = newLoc.c;
    if (!this.board.pieces[newRow]) {
      this.board.pieces.push([]);
    }
    this.row = newRow;
    this.col = newCol;
    // console.log(`store at [${newRow}, ${newCol}], collided? ${this.collided}`);
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
    this.collided = false;
    this.canvas.objects.push(this);
  }
  // checks if bubble of same color, drops all neighbors if true
  handleHit(bubble) {
    if (bubble.isOfColor(this.color)) {
      // drop the hit bubble
      // bubble.collided = true;
      // bubble.eliminated = true;
      this.cluster = bubble.findCluster();
      if (this.clusterOfMinSize(this.cluster)) {
        this.dropCluster(this.cluster);
        bubble.delete();
        this.delete();
      } else {
        this.storeHit();
      }
    } else {
      // store bubble in board
      this.storeHit();
    }
  }
  // check if bubble has hit another bubble
  bubbleHit() {
    // ignore hits when being eliminated
    if (this.falling === true) {
      return false;
    }

    // if hit top wall
    if (this.wallsHit.pop() === 0 && !this.falling) {
      this.storeHit();
      return;
      // if hit bot wall
    } else if (this.wallsHit.pop() === 3) {
      this.eliminated = true;
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
    // check for and handle wall collisions
    this.board.wallsHit(this);
    // check for and handle bubble collisions
    this.bubbleHit();
    let newX = this.x + this.deltaX;
    let newY = this.y + this.deltaY;
    this.setCoordinates(newX, newY);
    // debugger;
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
