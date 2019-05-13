import THREE from "./utils/globals";
import COLORS from "./utils/colors";

// simulate depth / horizon
const createFog = (amount = 0.14) => {
  return new THREE.FogExp2(COLORS.fogColor, amount);
};

let fog = createFog(0.018);

export default fog;
