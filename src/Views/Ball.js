import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export default class Ball extends THREE.Object3D {
  physicsComponent = null;

  constructor(radius = 0.5) {
    super();
    this._init(radius);
    this._initPhysics(radius);
  }

  _init = (radius) => {
    const geometry = new THREE.SphereGeometry(radius);
    const material = new THREE.MeshNormalMaterial();
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  };

  _initPhysics = (radius) => {
    this.physicsComponent = new CANNON.Body({
      mass: 0.25,
      shape: new CANNON.Sphere(radius),
    });
    this.physicsComponent.position.set(1, 2, 0);
  };

  update = (deltaTime) => {
    this.position.copy(this.physicsComponent.position);
    this.quaternion.copy(this.physicsComponent.quaternion);
    console.log(this.position);
  };
}
