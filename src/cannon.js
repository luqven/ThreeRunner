// cannon.js
// export Cannon class
import { Util } from "./utils/globals";
import { Bubble } from "./bubble";
import { DashedLine } from "./bulletPath";

export class Cannon {
  constructor(props) {
    this.canvas = props.canvas;
    this.ctx = props.canvas.ctx;
    this.board = props.board;
    this.width = 5;
    this.height = 180;
    this.mouseX = null;
    this.mouseY = null;
    this.x = props.canvas.width / 2 - this.width;
    this.y = props.canvas.height - 80;
    this.color = "brown";
  }

  init() {}

  // returns null
  update() {
    this.mouseX = this.canvas.mousePos.x;
    this.mouseY = this.canvas.mousePos.y;
    this.render();
  }

  drawCannon(x, y) {
    let mouseAngle = Util.mousePosToAngle([x, y], [this.mouseX, this.mouseY]);
    let mult1 = Math.cos(Util.degToRadians(mouseAngle));
    let mult2 = Math.sin(Util.degToRadians(mouseAngle));
    let newX = x + 1.5 * this.width * mult1 * 50;
    let newY = y + 1.5 * this.height * mult2;
    debugger;
    //render the line from player to mouse
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = Util.colors["red"];
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(newX, newY);
    this.ctx.stroke();
    debugger;
  }

  render() {
    this.drawCannon(this.x, this.y);
  }
}
