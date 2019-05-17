// cannon.js
// export Cannon class
import { Util } from "./utils/globals";

export class Cannon {
  constructor(props) {
    this.canvas = props.canvas;
    this.ctx = props.canvas.ctx;
    this.board = props.board;
    this.width = 5;
    this.height = 180;
    this.x = props.canvas.width / 2 - this.width;
    this.y = props.canvas.height - 80;
    this.newX = this.x + this.width;
    this.newY = this.y - this.height / 2;
    this.color = "brown";
  }

  init() {}

  // returns null
  update() {
    if (this.canvas.isDragging === true) {
      // let dragDir = this.canvas.mousePos.dragDir;
      // this.newX = this.newX + dragDir;
      // this.newY = this.newY + dragDir;
      this.newX = this.canvas.mousePos.x;
      this.newY = this.canvas.mousePos.y;
    }
    this.render();
  }

  drawCannon(x, y) {
    let newAngle = Util.getAngleFromPos([x, y], [this.newX, this.newY]);
    let mult1 = Math.cos(Util.degToRadians(newAngle));
    let mult2 = Math.sin(Util.degToRadians(newAngle));
    let newX = x + 1.5 * this.width * mult1 * 50;
    let newY = y + 1.5 * this.height * mult2;
    // debugger;
    //render the line from player to mouse
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = Util.colors["red"];
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(newX, newY);
    this.ctx.stroke();
  }

  render() {
    this.drawCannon(this.x, this.y);
  }
}
