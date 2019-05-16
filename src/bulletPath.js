// bulletPath.js
// exports DashedLine class
import { Util } from "./utils/globals";

export class DashedLine {
  constructor(props) {
    this.canvas = props.canvas;
    this.ctx = props.canvas.ctx;
    this.board = props.board.board;
    this.startX = props.x;
    this.startY = props.y;
    this.vertices = props.vertices ? props.vertices : [];
  }

  // checks if line has hit a bubble
  // bubbles =  [ BubbleObject, ... ]
  // currentPos = [ x, y ]
  hitBubble(bubbles, currentPos) {
    let hit = false;
    bubbles.forEach(bubble => {
      let bubbleMidpoint = [bubble.x, bubble.y];
      if (Util.getDistanceBetween(bubbleMidpoint, currentPos) < 1) {
        console.log("bubble hit");
        hit = true;
      }
    });
    return hit;
  }

  // helper that adds another point on the line
  // returns null
  addVertexAt(loc) {
    let x = loc[0],
      y = loc[1];
    this.vertices.push(loc);
  }

  // helper that draws dotted line to each hit point
  // vertices = [ [x, y], .. ]
  drawLineTo(vertices) {
    vertices.forEach(point => {
      let x = point[0];
      let y = point[1];
      this.ctx.lineTo(x, y);
    });
  }

  render() {
    this.ctx.beginPath();
    // set line as dashed line
    this.ctx.setLineDash([5, 15]);
    // set the line start point
    this.ctx.moveTo(this.startX, this.startY);
    // draw line to each vertex
    this.drawLineTo(this.vertices);
    // set the line color
    this.ctx.strokeStyle = "white";
    this.ctx.stroke();
  }
}
