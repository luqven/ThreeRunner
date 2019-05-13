import THREE from "./utils/globals";
import handleResize from "./utils/handleResize";
import setCameraControl from "./utils/cameraControl";
import sun from "./sun";
import ground from "./ground";
import player from "./player";
import bubble from "./bubble";
// import COLORS from "./utils/colors";

//////////////////////////////////////////
// Rendering functions
//////////////////////////////////////////

export function animate() {
  requestAnimationFrame(animate);

  player.rotation.x += 0.01;
  player.rotation.y += 0.01;

  render(); // this draws an updated shape
}

function render() {
  renderer.render(scene, camera);
}

//////////////////////////////////////////
// Rendering setup
//////////////////////////////////////////

// set the scene size to be the 1/2 entire page (increases performance)
const SCENE_WIDTH = window.innerWidth / 2,
  SCENE_HEIGHT = window.innerHeight / 2;

// set the camera attributes
const FIELD_OF_VIEW = 60,
  ASPECT_RATIO = SCENE_WIDTH / SCENE_HEIGHT,
  NEAR = 0.1,
  FAR = 1000;

// create a renderer, camera, and scene
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  FIELD_OF_VIEW,
  ASPECT_RATIO,
  NEAR,
  FAR
);
// start the renderer
let renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.shadowMap.enabled = true; //enable shadow
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);

// attach the renderer to the app canvas
let canvas = document.getElementById("gameCanvas");
canvas.appendChild(renderer.domElement);

// add the shape to the scene
let shape = bubble;
scene.add(shape);
scene.add(player);
scene.add(ground);

// add lighting to the scene
scene.add(sun);

//Set up shadow properties for the sun light
sun.shadow.mapSize.width = 256;
sun.shadow.mapSize.height = 256;
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 50;

// give the camera a start position
camera.position.z = 50;
camera.position.y = 10;

// add camera controls
setCameraControl(camera, renderer, render);

// when window is resized, re-render
window.addEventListener(
  "resize",
  (SCENE_HEIGHT, SCENE_WIDTH, renderer, camera) =>
    handleResize(SCENE_HEIGHT, SCENE_WIDTH, renderer, camera),
  false
);
