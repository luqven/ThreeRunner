import THREE from "./utils/globals";
import COLORS from "./utils/colors";

let width = 50,
  height = 50,
  widthSegments = 4,
  heightSegments = 4;

let planeGeometry = new THREE.PlaneGeometry(
  width,
  height,
  widthSegments,
  heightSegments
);
let planeMaterial = new THREE.MeshStandardMaterial({ color: COLORS.green });

let ground = new THREE.Mesh(planeGeometry, planeMaterial);

ground.receiveShadow = true;
ground.castShadow = false;
ground.rotation.x = -Math.PI / 2;

export default ground;
