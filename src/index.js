// index js file
import { Util } from "./utils/globals";
import { Canvas } from "./utils/canvas";
import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  console.log("webpack is running...");
  console.log("DOM fully loaded and parsed");
  window.requestAnimFrame = Util.requestAnimFrame;
  // create the game canvas
  let canvas = new Canvas({
    canvas: document.getElementById("gameCanvas"),
    container: document.getElementById("gameContainer"),
    objects: []
  });
  // initialize the game
  let game = new Game({ canvas });
  game.init();
  // render the game
  const render = () => {
    window.requestAnimationFrame(render);
    if (game.start && !game.over) {
      game.render();
    }
    if (canvas.pressedKey === "r") {
      canvas.pressedKey = null;
      game = new Game({ canvas });
      canvas.objects = [];
      game.start = true;
      game.init();
    }
  };

  window.requestAnimationFrame(render);
});
