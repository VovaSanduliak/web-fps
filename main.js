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

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
