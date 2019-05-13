import THREE from "./utils/globals";

let planeGeometry = new THREE.PlaneGeometry(5, 5, 4, 4);
let planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
ground = new THREE.Mesh(planeGeometry, planeMaterial);
ground.receiveShadow = true;
ground.castShadow = false;
ground.rotation.x = -Math.PI / 2;

export default ground;
