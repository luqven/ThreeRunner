// ammunition.js
// exports Ammo class
import { Util } from "./utils/globals";
import { Bubble } from "./bubble";

export default class Ammunition extends Bubble {
  constructor(props) {
    super(props);
  }
  // returns null
  fireAt(bubbles, dX, dY) {
    // debugger;
    this.deltaX = dX;
    this.deltaY = dY;
    let loops = 0;
    let maxLoops = 1000;
    while (!this.collided && loops < maxLoops) {
      loops++;
      // check for and handle bubble collisions
      this.hitBubble(bubbles, [this.x, this.y]);
      let newX = this.x + this.deltaX;
      let newY = this.y + this.deltaY;
      this.updateAttributes([newX, newY]);
      // debugger;
    }
  }
}
