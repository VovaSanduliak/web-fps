import * as THREE from 'three';

import { createScene } from './src/Models/Scene';
import { createCamera } from './src/Models/Camera';
import { createRenderer } from './src/Models/Renderer';

import { createFloor } from './src/Models/Floor';
import { createAmbientLight, createDirectionalLight } from './src/Models/Light';

import './style.css';
import { Player } from './src/Models/Player';

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

const floor = createFloor();
const ambientLight = createAmbientLight();
const directionalLight = createDirectionalLight();
scene.add(floor, ambientLight, directionalLight);

const player = new Player(scene, camera, renderer);

const clock = new THREE.Clock();
function animate() {
  let mixerUpdateDelta = clock.getDelta();

  player.update(mixerUpdateDelta);

  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
