import { Clock } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { createScene } from './src/Views/Scene';
import { createRenderer } from './src/Views/Renderer';
import { createFloor } from './src/Views/Floor';
import { createAmbientLight, createDirectionalLight } from './src/Views/Lights';

import Player from './src/Views/Player';
import './style.css';

const stats = Stats();
document.body.appendChild(stats.dom);

const scene = createScene();
const renderer = createRenderer();

const floor = createFloor();
const ambientLight = createAmbientLight();
const directionalLight = createDirectionalLight();
scene.add(floor, ambientLight, directionalLight);

const player = new Player();
scene.add(player);

const clock = new Clock();
const animate = () => {
  let deltaTime = clock.getDelta();
  player.update(deltaTime);

  requestAnimationFrame(animate);
  stats.update();
  renderer.render(scene, player.camera);
};

animate();
