import THREE from "./utils/globals";

import COLORS from "./utils/colors";
import setCameraControl from "./utils/cameraControl";
import hemisphereLight from "./utils/hemisphereLight";

import fog from "./fog";
import sun from "./sun";
import ground from "./ground";
import player from "./player";

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

// resize helper
let handleResize = () => {
  let sceneHeight = window.innerHeight;
  let sceneWidth = window.innerWidth;
  renderer.setSize(sceneWidth, sceneHeight);
  camera.aspect = sceneWidth / sceneHeight;
  camera.updateProjectionMatrix();
};

//////////////////////////////////////////
// Rendering setup
//////////////////////////////////////////

// set the scene size to be the 1/2 entire page (increases performance)
const SCENE_WIDTH = window.innerWidth,
  SCENE_HEIGHT = window.innerHeight;

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
// set the renderers clear color to be the same as the fog color;
renderer.clearColor(COLORS.fogColor, 1);
renderer.setSize(SCENE_WIDTH, SCENE_HEIGHT);

// attach the renderer to the app canvas
let canvas = document.getElementById("gameCanvas");
canvas.appendChild(renderer.domElement);

// add the shape to the scene
// scene.add(shape);
scene.add(player);
scene.add(ground);

// add lighting to the scene
scene.add(sun);
scene.add(hemisphereLight);

// add fog to the scene
scene.fog = fog;

// give the camera a start position
camera.position.z = 50;
camera.position.y = 10;

// add camera controls
setCameraControl(camera, renderer, render);

// when window is resized, re-render
window.addEventListener("resize", handleResize, false);
