export const Util = {
  inherits: function inherits(childClass, parentClass) {
    // TODO: allow classes to inherit
  },
  getRandom: function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },
  getRandomFraction: function(min, max) {
    return Math.random() * (max - min) + min;
  },
  arcTangent: function angle(cx, cy, ex, ey) {
    // based off answers to:
    // https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points
    let dy = ey - cy;
    let dx = ex - cx;
    let theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // radians to degrees, range (-180, 180]
    return theta;
  },
  // shim layer with setTimeout fallback based on work by Paul Irish
  requestAnimFrame: (function() {
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
  }
};
