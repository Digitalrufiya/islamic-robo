import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#canvas'), antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Light
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
scene.add(light);

// Position
camera.position.set(0, 1.6, 3);

// Load DRF Robo
const loader = new GLTFLoader();
loader.load('drfrobo.glb', function (gltf) {
  const model = gltf.scene;
  model.scale.set(1, 1, 1);
  model.position.set(0, 0, 0);
  scene.add(model);

  // Animation
  const animate = () => {
    requestAnimationFrame(animate);
    model.rotation.y += 0.005; // slow rotate
    renderer.render(scene, camera);
  };
  animate();
});
