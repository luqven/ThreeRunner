import THREE from "./utils/globals";
import handleResize from "./utils/handleResize";
import setCameraControl from "./utils/cameraControl";
import bubble from "./bubble";

//////////////////////////////////////////
// Rendering functions
//////////////////////////////////////////

export function animate() {
  requestAnimationFrame(animate);

  shape.rotation.x += 0.01;
  shape.rotation.y += 0.01;

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
const FIELD_OF_VIEW = 75,
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
let renderer = new THREE.WebGLRenderer();
renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);

// attach the renderer to the app canvas
let canvas = document.getElementById("gameCanvas");
canvas.appendChild(renderer.domElement);

// add the shape to the scene
let shape = bubble;
scene.add(shape);

// // create a point light
let pointLight = new THREE.PointLight(0xf8d898);

// set its position
pointLight.position.x = -1000;
pointLight.position.y = 0;
pointLight.position.z = 1000;
pointLight.intensity = 2.9;
pointLight.distance = 10000;

// add to the scene
scene.add(pointLight);

// give the camera a start position
camera.position.z = 20;

// add camera controls
setCameraControl(camera, renderer, render);

// when window is resized, re-render
window.addEventListener(
  "resize",
  (SCENE_HEIGHT, SCENE_WIDTH, renderer, camera) =>
    handleResize(SCENE_HEIGHT, SCENE_WIDTH, renderer, camera),
  false
);
