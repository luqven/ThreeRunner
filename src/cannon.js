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
    this.width = 50;
    this.height = 180;
    this.mouseX = null;
    this.mouseY = null;
    this.x = props.canvas.width / 2 - this.width / 2;
    this.y = props.canvas.height - 80;
    this.color = "brown";
    this.ammunition = []; // array bubbles to be shot out
    this.bullet = null; // current bubble to be fired
    this.bulletPath = null; // dashed line tracing current angle path
  }

  // cannon shooting logic
  init() {
    // add bubble to ammunition array
    this.addAmmunition();
    // set the first bubble in ammunition as the bullet
    this.bullet = this.ammunition.pop();
    // create a dashed line to where the cannon is pointing
  }

  // adds bubble to ammunition array if empty
  // returns null
  addAmmunition() {
    let cannonCenterX = this.x + this.width / 2;
    let cannonCenterY = this.y - 35;
    if (this.ammunition.length < 1) {
      let bubbleY = this.canvas.height;
      this.ammunition.push(
        new Bubble({
          canvas: this.canvas,
          x: cannonCenterX,
          y: bubbleY
        })
      );
    }
  }

  // updates the rotation of the cannon
  // returns null
  update(mouseX, mouseY) {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    let angle = Util.mousePosToAngle(this.x + 6, this.y, mouseX, mouseY);
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
    this.bullet.render();
  }

  render() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "lightBlue";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
