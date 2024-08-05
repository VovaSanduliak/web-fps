import * as THREE from 'three';
import { createSkyBox } from './SkyBox';

const createScene = () => {
  const scene = new THREE.Scene();
  scene.background = createSkyBox();
  return scene;
};

export { createScene };
