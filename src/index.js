// index js file
import { Util } from "./utils/globals";
import { Canvas } from "./utils/canvas";
import { Board } from "./gameBoard";
import { Cannon } from "./cannon";
import Game from "./game";
document.addEventListener("DOMContentLoaded", () => {
  console.log("webpack is running...");
  console.log("DOM fully loaded and parsed");
  window.requestAnimFrame = Util.requestAnimFrame;
  // create the game canvas
  const canvas = new Canvas({
    canvas: document.getElementById("gameCanvas"),
    container: document.getElementById("gameContainer"),
    objects: []
  });
  // initialize the game
  const game = new Game({ canvas });
  game.init();
  // render the game
  const render = () => {
    window.requestAnimationFrame(render);
    game.render();
  };

  window.requestAnimationFrame(render);
});
