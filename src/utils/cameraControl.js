import THREE from "./globals";
//helper to rotate around in scene
let setCameraControl = (camera, renderer, render) => {
  let cameraControl = new THREE.OrbitControls(camera, renderer.domElement);
  cameraControl.addEventListener("change", render);
  cameraControl.enableZoom = false;
};

export default setCameraControl;
