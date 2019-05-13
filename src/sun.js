import THREE from "./utils/globals";
import COLORS from "./utils/colors";

let createSun = (color, amount) => {
  return new THREE.DirectionalLight(color, amount);
};

// let sun = createSun(COLORS.white, 0.8);

// sun.position.set(0, 6, 0);
// sun.castShadow = true;

// //Set up shadow properties for the sun light
// sun.shadow.mapSize.width = 256;
// sun.shadow.mapSize.height = 256;
// sun.shadow.camera.near = 0.5;
// sun.shadow.camera.far = 50;

let sun = createSun(COLORS.lightPurple, 0.9);
sun.shadow.mapSize.width = 256;
sun.shadow.mapSize.height = 256;
sun.position.set(12, 6, -7);
sun.castShadow = true;
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 10;

export default sun;
