import THREE from "./utils/globals";
import COLORS from "./utils/colors";
import * as MTLLoader from "./utils/mtlLoader";
import * as OBJLoader from "./utils/objLoader";

let width = 10,
  height = 10,
  depth = 10;

let playerGeometry = new THREE.BoxGeometry(width, height, depth); //cube
let playerMaterial = new THREE.MeshStandardMaterial({ color: COLORS.magenta });

let player = new THREE.Mesh(playerGeometry, playerMaterial);

player.castShadow = true;
player.receiveShadow = false;
player.position.y = 10;

export default player;
