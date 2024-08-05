import { PerspectiveCamera } from 'three';

const fov = 45;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const createCamera = () => {
  const camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 10;

  return camera;
};

export { createCamera };
