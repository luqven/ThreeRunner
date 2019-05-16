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
  getDistanceBetween: function(pos1, pos2) {
    let xDiff = Math.round(pos2[0]) - Math.round(pos1[0]);
    let yDiff = Math.round(pos2[1]) - Math.round(pos1[1]);
    // a**2 + b**2 === c**2
    let distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    return distance;
  },
  arcTangent: function(vertex1, vertex2) {
    // based off answers to:
    // https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points
    let cx = vertex1[0],
      cy = vertex1[1],
      ex = vertex2[0],
      ey = vertex2[1],
      dy = ey - cy,
      dx = ex - cx,
      theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // radians to degrees, range (-180, 180]
    return theta;
  },
  // only uses mouseX, but might use mouseY in future
  // returns float
  mousePosToAngle: function(x, y, mouseX, mouseY) {
    let maxMouseY = 11;
    let midpoint = [x - x / 2, y];
    let target = [mouseX / 35, maxMouseY];
    return Util.arcTangent(midpoint, target);
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
