import * as THREE from 'three';

export default class Renderer {
  _threeRenderer = null;
  canvasEl = null;
  _camera;

  constructor() {
    this.canvasEl = document.getElementById('canvas');
    this._threeRenderer = new THREE.WebGLRenderer({ canvas: this.canvasEl });

    this._threeRenderer.setSize(window.innerWidth, window.innerHeight);
    this._threeRenderer.setPixelRatio(window.devicePixelRatio);
    this._threeRenderer.shadowMap.enabled = true;
    document.body.appendChild(this._threeRenderer.domElement);

    this._setEventListeners();
  }

  render = (scene, camera) => {
    this._camera = camera;
    this._threeRenderer.render(scene, camera);
  };

  _setEventListeners = () => {
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      this._camera.aspect = width / height;
      this._camera.updateProjectionMatrix();

      this._threeRenderer.setSize(width, height);
      this._threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    window.addEventListener('dblclick', () => {
      if (document.fullscreenElement) {
        // document.exitFullscreen();
      } else {
        this.canvasEl.requestFullscreen();
      }
    });
  };
}
