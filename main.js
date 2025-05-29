// main.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, robot;

function init() {
  const container = document.getElementById('scene-container');

  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // Camera
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.5, 3);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Lighting
  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(light);

  // Load GLTF model
  const loader = new GLTFLoader();
  loader.load('drf-robo.glb', (gltf) => {
    robot = gltf.scene;
    robot.position.y = -1;
    scene.add(robot);
  }, undefined, (error) => {
    console.error('Error loading GLB:', error);
  });

  // Mouse movement
  document.addEventListener('mousemove', (e) => {
    if (robot) {
      robot.rotation.y = (e.clientX / window.innerWidth - 0.5) * 2;
    }
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
