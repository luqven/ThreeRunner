/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ammunition.js":
/*!***************************!*\
  !*** ./src/ammunition.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Ammunition; });\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n/* harmony import */ var _bubble__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bubble */ \"./src/bubble.js\");\n// ammunition.js\n// exports Ammo class\n\n\n\nclass Ammunition extends _bubble__WEBPACK_IMPORTED_MODULE_1__[\"Bubble\"] {\n  constructor(props) {\n    super(props);\n    this.type = \"ammo\";\n  }\n}\n\n\n//# sourceURL=webpack:///./src/ammunition.js?");

/***/ }),

/***/ "./src/bubble.js":
/*!***********************!*\
  !*** ./src/bubble.js ***!
  \***********************/
/*! exports provided: Bubble */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Bubble\", function() { return Bubble; });\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n// bubble.js\n// exports Bubble class\n\n\n\n// point values of each color\nconst BUBBLE_VALUES = {\n  \"rgba(255, 0, 0)\": 1,\n  blue: 1,\n  green: 1,\n  yellow: 1\n};\n\nclass Bubble {\n  constructor(props) {\n    this.canvas = props.canvas;\n    this.ctx = props.canvas.ctx;\n    this.x = props.x;\n    this.y = props.y;\n    this.row = props.row;\n    this.col = props.col;\n    this.width = 35;\n    this.height = 35;\n    this.radius = 35;\n    this.board = props.board;\n    this.color = props.color;\n    this.value = BUBBLE_VALUES[props.color];\n    this.deltaX = props.deltaX ? props.deltaX : 0;\n    this.deltaY = props.deltaY ? props.deltaY : 0;\n    this.collided = false;\n    this.eliminated = false;\n    this.neighbors = null;\n  }\n\n  // returns null\n  reverseDeltaX() {\n    this.deltaX = this.deltaX * -1;\n  }\n  // returns null\n  reverseDeltaY() {\n    this.deltaY = this.deltaY * -1;\n  }\n  // returns [x, y]\n  getCoordinates() {\n    return [this.x, this.y];\n  }\n  // returns null\n  setCoordinates(newX, newY) {\n    this.x = newX;\n    this.y = newY;\n    this.render();\n  }\n  // returns null\n  updateCoords(newX, newY) {\n    this.ctx.save();\n    this.ctx.translate(newX, newY);\n    this.update();\n    this.ctx.translate(-newX, -newY);\n    this.ctx.restore();\n  }\n  // returns [w, h]\n  getDimensions() {\n    return [this.width, this.height];\n  }\n  // returns null\n  setDimensions(newW, newH) {\n    this.width = newW;\n    this.height = newH;\n  }\n  // returns [[x, y], [w, h]]\n  getAttributes() {\n    return [getCoordinates(), getDimensions()];\n  }\n  // returns null\n  updateAttributes(newCoords, newDims) {\n    let newX, newY, newW, newH;\n    if (newCoords) {\n      newX = newCoords[0];\n      newY = newCoords[1];\n      this.setCoordinates(newX, newY);\n    }\n    if (newDims) {\n      newW = newDims[0];\n      newH = newDims[1];\n      this.setDimensions(newW, newH);\n    }\n  }\n  // returns bool\n  isOfColor(otherColor) {\n    return this.color === otherColor;\n  }\n\n  getNeighbors() {\n    // find the row col at the given [x, y]\n    let row = this.row;\n    let col = this.col;\n    let neighbors = [];\n    // shift col on odd rows\n    // if (row % 2 != 0) {\n    //   col = col + 1;\n    // }\n    let pos = {\n      up: { r: row - 1, c: col },\n      bot: { r: row + 1, c: col },\n      left: { r: row, c: col - 1 },\n      right: { r: row, c: col + 1 },\n      uLeft: { r: row - 1, c: col - 1 },\n      uRight: { r: row - 1, c: col + 1 },\n      bLeft: { r: row + 1, c: col - 1 },\n      bRight: { r: row + 1, c: col + 1 }\n    };\n    Object.values(pos).forEach(loc => {\n      if (this.board.pieces[loc.r] !== undefined) {\n        let row = this.board.pieces[loc.r];\n        if (this.board.pieces[loc.r][loc.c] !== undefined) {\n          let bubble = row[loc.c];\n          neighbors.push(bubble);\n        }\n      }\n    });\n    this.neighbors = neighbors;\n  }\n\n  // returns null\n  fall() {\n    this.deltaX = 0;\n    this.deltaY = -1;\n    // while (!this.hitWalls(0, this.canvas.width, 0, this.canvas.height)) {\n    let newX = this.x + this.deltaX;\n    let newY = this.y + this.deltaY;\n    this.updateCoords(newX, newY);\n    // }\n  }\n  hitBubble() {\n    let currentPos = [this.x, this.y];\n    let hit = false;\n    this.board.pieces.forEach(row => {\n      row.forEach(bubble => {\n        let bubbleMidpoint = [bubble.x, bubble.y];\n        let midpointDelta = _utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].getDistanceBetween(bubbleMidpoint, currentPos);\n        if (midpointDelta < this.radius * 2) {\n          if (bubble.isOfColor(this.color)) {\n            console.log(\"hit same color\");\n            // drop matching bubbles\n            this.dropSameOfColor(bubble);\n            hit = true;\n            this.collided = true;\n            this.eliminated = true;\n            this.board.pieces[bubble.row].splice(bubble.col, 1);\n          } else {\n            console.log(\"bubble hit\");\n            hit = true;\n            this.collided = true;\n          }\n        }\n      });\n    });\n    return hit;\n  }\n\n  dropSameOfColor(hitBubble) {\n    let matched = [];\n    hitBubble.neighbors.forEach(curBubble => {\n      if (curBubble.isOfColor(hitBubble.color)) {\n        let row = this.board.pieces[curBubble.row];\n        let col = curBubble.col;\n        console.log(curBubble.row, col);\n        debugger;\n        row[col] = null;\n        curBubble.eliminated = true;\n      }\n    });\n  }\n\n  // returns null\n  fire() {\n    // check for and handle bubble collisions\n    this.hitBubble();\n    this.board.wallsHit();\n    let newX = this.x + this.deltaX;\n    let newY = this.y + this.deltaY;\n    this.setCoordinates(newX, newY);\n  }\n\n  update() {\n    if (this.eliminated) {\n      return;\n    }\n    if ((this.deltaX !== 0 || this.deltaY !== 0) && this.collided === false) {\n      this.fire();\n    }\n    this.render();\n  }\n\n  render() {\n    this.ctx.beginPath();\n    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);\n    this.ctx.fillStyle = this.color;\n    this.ctx.fill();\n    this.ctx.closePath();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/bubble.js?");

/***/ }),

/***/ "./src/cannon.js":
/*!***********************!*\
  !*** ./src/cannon.js ***!
  \***********************/
/*! exports provided: Cannon */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cannon\", function() { return Cannon; });\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n// cannon.js\n// export Cannon class\n\n\nclass Cannon {\n  constructor(props) {\n    this.canvas = props.canvas;\n    this.ctx = props.canvas.ctx;\n    this.board = props.board;\n    this.width = 5;\n    this.height = 180;\n    this.x = props.canvas.width / 2;\n    this.y = props.canvas.height - 80;\n    this.newX = this.x + this.width;\n    this.newY = this.y - this.height / 2;\n    this.mouseX = null;\n    this.mouseY = null;\n    this.color = \"brown\";\n  }\n\n  init() {}\n\n  // returns null\n  update() {\n    if (this.canvas.isDragging === true) {\n      // let dragDir = this.canvas.mousePos.dragDir;\n      // this.newX = this.newX + dragDir;\n      // this.newY = this.newY + dragDir;\n      this.newX = this.canvas.mousePos.x;\n      this.newY = this.canvas.mousePos.y;\n    }\n    this.render();\n  }\n\n  drawCannon(x, y) {\n    let newAngle = _utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].getAngleFromPos([x, y], [this.newX, this.newY]);\n    let mult1 = Math.cos(_utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].degToRadians(newAngle));\n    let mult2 = Math.sin(_utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].degToRadians(newAngle));\n    let newX = x + 1.5 * this.width * mult1 * 50;\n    let newY = y + 1.5 * this.height * mult2;\n    this.mouseX = newX;\n    this.mouseY = newY;\n    // debugger;\n    //render the line from player to mouse\n    this.ctx.lineWidth = 2;\n    this.ctx.strokeStyle = _utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].colors[\"red\"];\n    this.ctx.beginPath();\n    this.ctx.moveTo(x, y);\n    this.ctx.lineTo(newX, newY);\n    this.ctx.stroke();\n  }\n\n  render() {\n    this.drawCannon(this.x, this.y);\n  }\n}\n\n\n//# sourceURL=webpack:///./src/cannon.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ \"./src/gameBoard.js\");\n/* harmony import */ var _cannon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cannon */ \"./src/cannon.js\");\n/* harmony import */ var _ammunition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ammunition */ \"./src/ammunition.js\");\n// game.js file\n// exports Game class\n\n\n\n\n\n\nclass Game {\n  constructor(props) {\n    this.canvas = props.canvas;\n  }\n  init() {\n    // save the mouse position on the canvas\n    this.watchMouseEvents();\n    // save the current key pressed\n    this.watchKeyPress();\n    // create and save the game board\n    this.createGameBoard();\n    // create and save the bubble cannon\n    this.createCannon();\n    // create and save ammunition\n    this.createAmmo();\n    // save the cannon and ammo to the board\n    this.board.bullet = this.bullet;\n    this.board.cannon = this.cannon;\n    // add objects to the canvas\n    this.canvas.objects.push(this.cannon);\n    this.canvas.objects.push(this.board);\n    this.canvas.objects.push(this.bullet);\n  }\n\n  // save the mouse position on the canvas\n  watchMouseEvents() {\n    this.canvas.watchMouseDown();\n    this.canvas.watchMouseUp();\n    this.canvas.watchMouseMove();\n  }\n\n  watchKeyPress() {\n    this.canvas.watchKeyPress();\n  }\n\n  createGameBoard() {\n    this.board = new _gameBoard__WEBPACK_IMPORTED_MODULE_1__[\"Board\"]({ canvas: this.canvas });\n    this.board.init();\n  }\n\n  createCannon() {\n    this.cannon = new _cannon__WEBPACK_IMPORTED_MODULE_2__[\"Cannon\"]({\n      canvas: this.canvas,\n      board: this.board\n    });\n    this.cannon.init();\n  }\n\n  createAmmo() {\n    this.bullet = new _ammunition__WEBPACK_IMPORTED_MODULE_3__[\"default\"]({\n      canvas: this.canvas,\n      color: \"blue\",\n      board: this.board,\n      x: this.canvas.width / 2,\n      y: this.canvas.height - 80\n    });\n  }\n\n  render() {\n    if (this.canvas.pressedKey === \" \") {\n      this.board.fire();\n      this.canvas.pressedKey = null;\n    }\n    this.canvas.render();\n  }\n}\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gameBoard.js":
/*!**************************!*\
  !*** ./src/gameBoard.js ***!
  \**************************/
/*! exports provided: Board */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Board\", function() { return Board; });\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n/* harmony import */ var _bubble__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bubble */ \"./src/bubble.js\");\n// gameBoard.js\n// exports Board class\n\n\n\nclass Board {\n  constructor(props) {\n    this.rows = 5;\n    this.cols = 10;\n    this.tOffset = 1; // add spacer rows from the top\n    this.lOffset = 1.5; // add spacer rows from the left\n    this.rOffset = 5; // row gaps\n    this.pieceWidth = 35;\n    this.pieceHeight = 35;\n    this.pieces = [];\n    this.cannon = props.cannon;\n    this.bullet = props.bullet;\n    this.canvas = props.canvas;\n    this.walls = this.canvas.walls;\n  }\n\n  init() {\n    this.createBoard();\n    this.populateBoard();\n  }\n\n  update() {\n    this.render();\n  }\n\n  createBoard() {\n    // create the rows\n    for (let j = 0; j < this.rows; j++) {\n      this.pieces.push([]);\n    }\n    // create the cols\n    this.pieces.forEach(row => {\n      for (let i = 0; i < this.cols; i++) {\n        row.push([]);\n      }\n    });\n  }\n\n  // make 2d array of row / cols\n  populateBoard() {\n    // add a bubble at every row, col\n    for (let row = 0; row < this.rows; row++) {\n      for (let col = 0; col < this.cols; col++) {\n        let pos = this.getBubbleLocAt(row, col);\n        this.pieces[row][col] = this.drawBubbleAt(pos.x, pos.y, row, col);\n      }\n    }\n    this.pieces.forEach(row => {\n      row.forEach(bubble => {\n        bubble.getNeighbors();\n      });\n    });\n  }\n\n  getBubbleLocAt(row, col) {\n    let tOffset = this.tOffset;\n    let lOffset = this.lOffset;\n    row += tOffset;\n    col += lOffset;\n    let offset = this.rOffset;\n    let x = col * this.pieceWidth * 2;\n    // alternate offset on rows, creates shifted grid\n    if (row % 2 == 0) {\n      x += this.pieceWidth;\n    }\n    let y = row * (this.pieceHeight - offset) * 2;\n    return { x, y };\n  }\n\n  getBoardPosAt(loc) {\n    let row = Math.floor(loc.x / 2 / this.pieceWidth - this.tOffset);\n    let col = Math.floor(\n      loc.y / 2 / (this.pieceHeight - this.rOffset) - this.lOffset\n    );\n    let gridPos = { r: row, c: col };\n    return gridPos;\n  }\n\n  drawBubbleAt(x, y, row, col) {\n    let bubble = new _bubble__WEBPACK_IMPORTED_MODULE_1__[\"Bubble\"]({\n      canvas: this.canvas,\n      color: _utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].getRandomColor(),\n      board: this,\n      x: x,\n      y: y,\n      row: row,\n      col: col\n    });\n    return bubble;\n  }\n\n  // helper hat saves array of walls hit\n  // returns bool\n  wallsHit() {\n    let midPoint = { x: this.bullet.x, y: this.bullet.y };\n    let radius = this.bullet.radius;\n    this.bullet.wallsHit = [];\n    // if midP +/- radius <=> wall -> wall hit\n    if (midPoint.x - radius <= this.walls.left.x) {\n      this.bullet.wallsHit.push(2);\n      this.bullet.reverseDeltaX();\n    } else if (midPoint.x + radius >= this.walls.right.x) {\n      this.bullet.wallsHit.push(2);\n      this.bullet.reverseDeltaX();\n    }\n    if (midPoint.y - radius >= this.walls.top.y) {\n      this.bullet.wallsHit.push(0);\n      this.bullet.reverseDeltaY();\n    } else if (midPoint.y + radius <= this.walls.bot.y) {\n      this.bullet.wallsHit.push(0);\n      this.bullet.reverseDeltaY();\n    }\n    if (this.bullet.wallsHit.length < 1) {\n      return false;\n    }\n    if (this.bullet.wallsHit.length > 1) {\n      return true;\n    }\n  }\n\n  fire() {\n    console.log(\"fire\");\n    let location = { x: this.cannon.x, y: this.cannon.y };\n    let target = { x: this.cannon.mouseX, y: this.cannon.mouseY };\n    let speed = this.getDeltas(location, target);\n    // fire the bullet\n    this.bullet.board = this;\n    this.bullet.deltaX = speed.x;\n    this.bullet.deltaY = speed.y;\n    this.bullet.fire();\n  }\n\n  getDeltas(loc, target) {\n    let distancePerFrame = 5;\n    let angle = Math.atan2(target.y - loc.y, target.x - loc.x);\n    let sin = Math.sin(angle) * distancePerFrame;\n    let cos = Math.cos(angle) * distancePerFrame;\n    let delta = { x: cos, y: sin };\n    return delta;\n  }\n\n  render() {\n    for (let i = 0; i < this.rows; i++) {\n      let row = this.pieces[i];\n      for (let j = 0; j < this.cols; j++) {\n        let bubble = row[j];\n        if (bubble !== null && bubble !== undefined) {\n          bubble.render();\n        }\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack:///./src/gameBoard.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/globals */ \"./src/utils/globals.js\");\n/* harmony import */ var _utils_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/canvas */ \"./src/utils/canvas.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n// index js file\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  console.log(\"webpack is running...\");\n  console.log(\"DOM fully loaded and parsed\");\n  window.requestAnimFrame = _utils_globals__WEBPACK_IMPORTED_MODULE_0__[\"Util\"].requestAnimFrame;\n  // create the game canvas\n  const canvas = new _utils_canvas__WEBPACK_IMPORTED_MODULE_1__[\"Canvas\"]({\n    canvas: document.getElementById(\"gameCanvas\"),\n    container: document.getElementById(\"gameContainer\"),\n    objects: []\n  });\n  // initialize the game\n  const game = new _game__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({ canvas });\n  game.init();\n  // render the game\n  const render = () => {\n    window.requestAnimationFrame(render);\n    game.render();\n  };\n\n  window.requestAnimationFrame(render);\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utils/canvas.js":
/*!*****************************!*\
  !*** ./src/utils/canvas.js ***!
  \*****************************/
/*! exports provided: Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Canvas\", function() { return Canvas; });\nclass Canvas {\n  constructor(props) {\n    this.colors = {\n      red: \"rgba(255, 0, 0)\",\n      blue: \"blue\",\n      green: \"green\",\n      yellow: \"yellow\"\n    };\n    this.gameOver = false;\n    this.canvas = props.canvas;\n    this.ctx = props.canvas.getContext(\"2d\");\n    this.container = props.container; // the canvas's container div\n    this.x = 0;\n    this.y = 0;\n    this.width = this.container.offsetWidth;\n    this.height = this.container.offsetHeight;\n    this.walls = {\n      left: { x: 10, y: 10 },\n      right: { x: this.width - 10, y: 10 },\n      bot: { x: 10, y: 10 },\n      top: { x: 10, y: this.height - 10 }\n    };\n    this.mousePos = {\n      x: this.container.offsetWidth / 2,\n      y: this.container.offsetHeight / 2,\n      clickX: null,\n      clickY: null,\n      releaseX: null,\n      releaseY: null,\n      dragDir: 0,\n      dragDelta: 0\n    };\n    this.objects = props.objects; // objects that belong to this canvas\n    this.canvasDidMount = false; // bool turns true on first render\n    this.isDragging = false;\n    this.pressedKey = null;\n\n    this.render = this.render.bind(this);\n    this.resize = this.resize.bind(this);\n    this.watchMouseMove = this.watchMouseMove.bind(this);\n    this.watchMouseClick = this.watchMouseClick.bind(this);\n    this.onCanvasDidMount = this.onCanvasDidMount.bind(this);\n  }\n\n  // change cursor pos when mouse moves over canvas container\n  watchMouseMove() {\n    // console.log(\"watching mouse movements\");\n    this.container.addEventListener(\"mousemove\", e => {\n      this.mousePos.x = e.offsetX;\n      // this.mousePos.y = e.offsetY / 1.2;\n      this.mousePos.y = e.offsetY;\n    });\n    // console.log(this.mousePos);\n  }\n\n  // save mouse click location on click\n  watchMouseClick() {\n    this.container.addEventListener(\"click\", e => {\n      this.mousePos.clickX = e.offsetX;\n      this.mousePos.clickY = e.offsetY;\n    });\n  }\n\n  watchMouseDown() {\n    this.container.addEventListener(\"mousedown\", e => {\n      this.mousePos.clickX = e.offsetX;\n      this.mousePos.clickY = e.offsetY;\n      this.isDragging = true;\n    });\n  }\n  watchMouseUp() {\n    this.container.addEventListener(\"mouseup\", e => {\n      this.mousePos.releaseX = e.offsetX;\n      this.mousePos.releaseY = e.offsetY;\n      this.isDragging = false;\n\n      let xDiff = this.mousePos.clickX - this.mousePos.releaseX;\n\n      if (xDiff < 0) {\n        this.mousePos.dragDir = 1;\n      } else if (xDiff > 0) {\n        this.mousePos.dragDir = -1;\n      } else {\n        this.mousePos.dragDir = 0;\n      }\n\n      // reverse xDiff to match mouse drag direction\n      this.mousePos.dragDelta = Math.abs(xDiff);\n      // console.log(this.mousePos.dragDir, this.mousePos.dragDelta);\n    });\n  }\n\n  watchKeyPress() {\n    document.addEventListener(\"keydown\", e => {\n      this.pressedKey = e.key;\n    });\n  }\n\n  // resize the canvas when it's container resizes\n  resize() {\n    this.container.addEventListener(\"resize\", () => {\n      this.width = this.container.offsetWidth;\n      this.height = this.container.offsetHeight;\n    });\n  }\n\n  // on first render, add event listeners\n  onCanvasDidMount() {\n    this.resize();\n  }\n\n  render() {\n    if (this.gameOver === true) {\n      return;\n    }\n    if (this.canvasDidMount === false) {\n      this.canvasDidMount = true;\n      this.onCanvasDidMount();\n    }\n    this.ctx.clearRect(0, 0, this.width, this.height);\n    this.objects.forEach(object => {\n      object.update();\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/utils/canvas.js?");

/***/ }),

/***/ "./src/utils/globals.js":
/*!******************************!*\
  !*** ./src/utils/globals.js ***!
  \******************************/
/*! exports provided: Util */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Util\", function() { return Util; });\nconst Util = {\n  getRandom: function(min, max) {\n    return Math.floor(Math.random() * (max - min) + min);\n  },\n  getRandomFraction: function(min, max) {\n    return Math.random() * (max - min) + min;\n  },\n  getDistanceBetween: function(pos1, pos2) {\n    let xDiff = Math.round(pos2[0]) - Math.round(pos1[0]);\n    let yDiff = Math.round(pos2[1]) - Math.round(pos1[1]);\n    // a**2 + b**2 === c**2\n    let distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));\n    return distance;\n  },\n  radiansToDeg(angle) {\n    return angle * (180 / Math.PI);\n  },\n  arcTangent: function(playerPos, newPos) {\n    // based off answers to:\n    // https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points\n    let px = playerPos[0],\n      py = playerPos[1],\n      mx = newPos[0],\n      my = newPos[1],\n      dy = my - py,\n      dx = mx - px,\n      theta = Math.atan2(dy, dx); // range (-PI, PI]\n    theta = Util.radiansToDeg(theta); // range (0 -  360)\n    if (theta < 0) {\n      theta = 180 + (180 + theta);\n    }\n    return theta;\n  },\n  getAngleFromPos: function(playerPos, newPos) {\n    let angle = Util.arcTangent(playerPos, newPos);\n    // limit angle to always aim up\n    if (angle < 90 || angle > 350) {\n      angle = 350;\n    } else {\n      if (angle < 190) {\n        angle = 190;\n      }\n    }\n    return angle;\n  },\n  degToRadians: function(angle) {\n    return angle * (Math.PI / 180);\n  },\n  requestAnimFrame: (function() {\n    // shim layer with setTimeout fallback based on work by Paul Irish\n    return (\n      window.requestAnimationFrame ||\n      window.webkitRequestAnimationFrame ||\n      window.mozRequestAnimationFrame ||\n      window.oRequestAnimationFrame ||\n      window.msRequestAnimationFrame ||\n      function(callback) {\n        window.setTimeout(callback, 1000 / 60);\n      }\n    );\n  })(),\n  colors: {\n    red: \"rgba(255, 0, 0)\",\n    blue: \"blue\",\n    green: \"green\",\n    yellow: \"yellow\"\n  },\n  getRandomColor: function() {\n    let options = Object.keys(Util.colors);\n    let selectedColor = options[Util.getRandom(0, 4)];\n    return Util.colors[selectedColor];\n  }\n};\n\n\n//# sourceURL=webpack:///./src/utils/globals.js?");

/***/ })

/******/ });