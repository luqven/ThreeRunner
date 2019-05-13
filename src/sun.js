import THREE from "./utils/globals";

let sun = new THREE.DirectionalLight(0xffffff, 0.8);
sun.position.set(0, 4, 1);
sun.castShadow = true;

//Set up shadow properties for the sun light
sun.shadow.mapSize.width = 256;
sun.shadow.mapSize.height = 256;
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 50;

export default sun;
