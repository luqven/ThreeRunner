// ammunition.js
// exports Ammo class
import { Util } from "./utils/globals";
import { Bubble } from "./bubble";

export default class Ammunition extends Bubble {
  constructor(props) {
    super(props);
    this.type = "ammo";
    this.soundFx = document.querySelector("#shoot-fx");
  }

  playFx() {
    let audio = this.soundFx;
    audio.currentTime = 0;
    audio.play();
  }
}
