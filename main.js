import { Clock, PerspectiveCamera } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import CannonDebugger from 'cannon-es-debugger';

import Renderer from './src/Views/Renderer';

import World from './src/Views/World';
import Player from './src/Views/Player';
import Ball from './src/Views/Ball';

import './style.css';

const stats = Stats();
document.body.appendChild(stats.dom);

const renderer = new Renderer();

const world = new World();
const player = world.add(new Player());
const ball = world.add(new Ball());

player.translateZ(5);

const cannonDebugger = new CannonDebugger(world.scene, world.physicsWorld, {});

//////
const clock = new Clock();
const animate = () => {
  let deltaTime = clock.getDelta();

  stats.update();

  world.physicsWorld.step(deltaTime);
  world.update(deltaTime);
  cannonDebugger.update();

  // const testCamera = new PerspectiveCamera(75, 1, 0.1, 2000);
  // player.add(testCamera);
  // testCamera.translateZ(3);
  renderer.render(world.scene, player.camera);
  requestAnimationFrame(animate);
};

animate();
