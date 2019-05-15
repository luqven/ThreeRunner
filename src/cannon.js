// cannon.js
// export Cannon class
import { Util } from "./utils/globals";
import { Bubble } from "./bubble";
import { DashedLine } from "./bulletPath";

export class Cannon {
  constructor(props) {
    this.canvas = props.canvas;
    this.ctx = props.canvas.ctx;
    this.width = 50;
    this.height = 180;
    this.x = props.canvas.width / 2 - this.width / 2;
    this.y = props.canvas.height - 80;
    this.color = "brown";
    this.ammunition = []; // array bubbles to be shot out
    this.bullet = null; // current bubble to be fired
    this.tracer = null; // dashed line tracing current angle path
  }

  // cannon shooting logic
  init() {
    let cannonCenterX = this.x + this.width / 2;
    let cannonCenterY = this.y - 35;
    // add bubble to ammunition array if empty
    if (this.ammunition.length < 1) {
      let bubbleY = this.y - 35;
      this.ammunition.push(
        new Bubble({ canvas: this.canvas, x: cannonCenterX, y: bubbleY })
      );
    }
    // set the first bubble in ammunition as the current bullet
    this.bullet = this.ammunition.pop();
    // create a dashed line to where the cannon is pointing
    this.tracer = new DashedLine({
      canvas: this.canvas,
      x: cannonCenterX,
      y: this.y,
      cx: cannonCenterX,
      cy: -150
    });
  }

  // updates the rotation of the cannon
  // returns null
  update(mouseX, mouseY) {
    let angle = this.mousePosToDegrees(mouseX, mouseY);
    // save the current context
    this.ctx.save();
    // set the new center for the context
    let newCenterX = this.x + 0.5 * this.width;
    let newCenterY = this.y + 0.5 * this.height;
    this.ctx.translate(newCenterX, newCenterY);
    // rotate the context
    this.ctx.rotate(angle);
    // revert context center back to where it was
    this.ctx.translate(-newCenterX, -newCenterY);
    this.render();
    // restore context to saved state
    this.ctx.restore();
  }

  // only uses mouseX, but might use mouseY in future
  // returns float
  mousePosToDegrees(mouseX, mouseY) {
    let centerX = this.x + 6;
    let centerY = this.y;
    let maxMouseY = 11;
    // console.log(newMouseY / 30);
    let midpoint = [centerX - centerX / 2, centerY];
    let angle = Util.arcTangent(
      midpoint[0],
      midpoint[1],
      mouseX / 35,
      maxMouseY
    );
    return angle;
  }

  render() {
    this.tracer.render();
    this.bullet.render();
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "lightBlue";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
