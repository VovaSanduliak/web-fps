import { PerspectiveCamera } from 'three';

class FirstPersonCamera {
  _fov = 45;
  _aspect = window.innerWidth / window.innerHeight;
  _near = 0.1;
  _far = 1000;

  constructor() {
    this.camera = new PerspectiveCamera(
      this._fov,
      this._aspect,
      this._near,
      this._far
    );

    return this.camera;
  }
}

export default FirstPersonCamera;
