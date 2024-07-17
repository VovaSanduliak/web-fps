import { createScene } from './src/models/Scene';
import { createCamera } from './src/models/Camera';
import { createRenderer } from './src/models/Renderer';

import './style.css';

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

animate();
