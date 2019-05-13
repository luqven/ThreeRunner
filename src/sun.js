import THREE from "./utils/globals";
import COLORS from "./utils/colors";

let sun = new THREE.DirectionalLight(COLORS.white, 0.8);
sun.position.set(0, 4, 1);
sun.castShadow = true;

export default sun;
