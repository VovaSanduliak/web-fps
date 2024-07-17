import * as THREE from 'three';
import { createScene } from './src/models/Scene';
import { createCamera } from './src/models/Camera';
import { createRenderer } from './src/models/Renderer';

import './style.css';
import { createFloor } from './src/models/Floor';

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

const floor = createFloor();
scene.add(floor);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
