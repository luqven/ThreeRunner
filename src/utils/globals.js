export const Util = {
  getRandom: function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  getRandomFraction: function(min, max) {
    return Math.random() * (max - min) + min;
  },
  getDistanceBetween: function(pos1, pos2) {
    let xDiff = Math.round(pos2[0]) - Math.round(pos1[0]);
    let yDiff = Math.round(pos2[1]) - Math.round(pos1[1]);
    // a**2 + b**2 === c**2
    let distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    return distance;
  },
  radiansToDeg(angle) {
    return angle * (180 / Math.PI);
  },
  arcTangent: function(playerPos, newPos) {
    // based off answers to:
    // https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points
    let px = playerPos[0],
      py = playerPos[1],
      mx = newPos[0],
      my = newPos[1],
      dy = my - py,
      dx = mx - px,
      theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta = Util.radiansToDeg(theta); // range (0 -  360)
    if (theta < 0) {
      theta = 180 + (180 + theta);
    }
    return theta;
  },
  getAngleFromPos: function(playerPos, newPos) {
    let angle = Util.arcTangent(playerPos, newPos);
    // limit angle to always aim up
    if (angle < 90 || angle > 350) {
      angle = 350;
    } else {
      if (angle < 190) {
        angle = 190;
      }
    }
    return angle;
  },
  degToRadians: function(angle) {
    return angle * (Math.PI / 180);
  },
  requestAnimFrame: (function() {
    // shim layer with setTimeout fallback based on work by Paul Irish
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })(),
  colors: {
    red: "rgba(255, 0, 0)",
    blue: "blue",
    green: "green",
    yellow: "yellow"
  },
  getRandomColor: function() {
    let options = Object.keys(Util.colors);
    let selectedColor = options[Util.getRandom(0, 4)];
    return Util.colors[selectedColor];
  },
  addButtonEventListeners: function() {
    // toggle controls transparency on click
    let controlsBtn = document.querySelector("#controls-btn");
    controlsBtn.addEventListener("click", e => {
      let controls = document.querySelector(".controlsModal");
      controls.classList.toggle("transparent");
    });
    // toggle mute on click
    let volumeBtn = document.querySelector("#volume-btn");
    let music = document.querySelector(".gameMusic");
    volumeBtn.addEventListener("click", e => {
      if (music.paused) {
        volumeBtn.innerHTML = "Mute";
        music.play();
      } else {
        volumeBtn.innerHTML = "Unmute";
        music.pause();
      }
    });
  }
};
