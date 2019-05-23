// ammunition.js
// exports Ammo class
import { Util } from "./utils/globals";
import { Bubble } from "./bubble";

export default class Ammunition extends Bubble {
  constructor(props) {
    super(props);
    this.type = "ammo";
  }

  delete() {
    this.eliminated = true;
    this.deltaX = 0;
    this.deltaY = 0;
  }
}
