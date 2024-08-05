import * as THREE from 'three';

import { createScene } from './src/Models/Scene';
import { createRenderer } from './src/Models/Renderer';

import { createFloor } from './src/Models/Floor';
import { createAmbientLight, createDirectionalLight } from './src/Models/Light';

import './style.css';
import PlayerView from './src/Views/PlayerView';

const scene = createScene();
const renderer = createRenderer();

const floor = createFloor();
const ambientLight = createAmbientLight();
const directionalLight = createDirectionalLight();
scene.add(floor, ambientLight, directionalLight);

const player = new PlayerView();
scene.add(player);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshPhongMaterial({ color: 'green' })
);
cube.receiveShadow = true;
scene.add(cube);

const clock = new THREE.Clock();
const animate = () => {
  let deltaTime = clock.getDelta();

  player.update(deltaTime);

  requestAnimationFrame(animate);
  renderer.render(scene, player.camera);
};

animate();
