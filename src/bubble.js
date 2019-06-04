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

  // makes {l, r, ul, ur, dl, dr} positions object, eg. {left: {r: row, c: col - 1}, ... }}
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

  // saves object of neighboring bubbles, eg { [0, 1]: Bubble Object, [0, -1]: ... }
  getNeighbors() {
    let row = this.row;
    let col = this.col;
    let neighbors = {};
    let positions = this.getPosToCheck(row, col);
    // find neighbor at each position
    Object.values(positions).forEach(pos => {
      // if the [row, col] exists
      if (this.board.pieces[pos.r] !== undefined) {
        let row = this.board.pieces[pos.r];
        if (this.board.pieces[pos.r][pos.c] !== undefined) {
          let bubble = row[pos.c];
          // add bubble at that [row, col] as neighbor
          neighbors[`[${pos.r},${pos.c}]`] = bubble;
        }
      } else {
        // otherwise, mark that neighbor as null
        neighbors[`[${pos.r},${pos.c}]`] = null;
      }
    });
    this.neighbors = neighbors;
  }

  logNeighbors() {
    Object.keys(this.neighbors).forEach(pos => {
      console.log(
        `${pos}: ${this.neighbors[pos] ? this.neighbors[pos].color : null}`
      );
    });
  }

  logCluster() {
    Object.keys(this.cluster).forEach(key => {
      console.log(`
      ${
        this.cluster[key]
          ? [
              this.cluster[key].color,
              " [" + [this.cluster[key].row, this.cluster[key].col + "]"]
            ]
          : null
      }
      `);
    });
  }

  // TO_DO: Fix cluster detection
  findCluster(cluster = []) {
    this.getNeighbors();
    Object.values(this.neighbors).forEach(neighbor => {
      // if neighbor exists, of same color, & not in cluster
      if (
        neighbor &&
        neighbor.isOfColor(this.color) &&
        !cluster.includes(neighbor)
      ) {
        // add it the to the cluster
        cluster.push(neighbor);
        neighbor.findCluster(cluster);
      }
    });
    if (!this.cluster.includes(this)) {
      this.cluster.push(this);
    }
    // debugger;
    return cluster;
  }

  // delete all bubbles in the cluster
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
      row[col] = undefined;
    }
    this.falling = true;
    this.collided = false;
    this.canvas.objects.push(this);
  }

  // checks if bubble cluster is of min size, drops cluster if true
  handleHit(bubble) {
    if (bubble.isOfColor(this.color)) {
      this.storeHit();
      this.getNeighbors();
      this.cluster = bubble.findCluster([this]);
      console.log("hit! .... \n ");
      // bubble.logNeighbors();
      // console.log(this.cluster);
      this.logCluster();
      // if cluster bigger than 3, drop it
      if (this.cluster.length >= 3) {
        this.dropCluster(this.cluster);
        bubble.delete();
        this.delete();
        // otherwise, store bubble on board
      }
    } else {
      // store bubble in board
      this.storeHit();
    }
  }

  // check if bubble has hit another bubble or wall
  bubbleHit() {
    // ignore hits when being eliminated
    if (this.falling === true || this.eliminated === true) {
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
    let pieces = this.board.pieces;
    let hit = false;
    pieces.forEach(row => {
      row.forEach(bubble => {
        if (bubble && !hit && !bubble.falling) {
          let midpointDiff = this.midPointDistance(bubble);
          if (midpointDiff < this.radius * 2) {
            hit = true;
            this.handleHit(bubble);
          }
        }
      });
    });
    return hit;
  }

  // distance between this midpoint and bubble mid point
  midPointDistance(bubble) {
    let currentPos = [this.x, this.y];
    let bubbleMidpoint = [bubble.x, bubble.y];
    return Util.getDistanceBetween(bubbleMidpoint, currentPos);
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
