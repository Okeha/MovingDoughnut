import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Loading
const textureLoader = new THREE.TextureLoader();
// const normalTexture = textureLoader.load("/NormalMap.png");
const normalTexture = textureLoader.load("/images.jpg");
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
// const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);
const geometry = new THREE.TorusGeometry(0.76, 0.25, 16, 100);
//===> const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 3;
pointLight.position.y = 0.89;
pointLight.position.z = 0.37;
pointLight.intensity = 0.74;
scene.add(pointLight);

const light1 = gui.addFolder("Light 1");

light1.add(pointLight.position, "y").min(-3).max(3).step(0.01);
light1.add(pointLight.position, "x").min(-6).max(6).step(0.01);
light1.add(pointLight.position, "z").min(-3).max(3).step(0.01);
light1.add(pointLight, "intensity").min(0).max(10).step(0.01);

const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(-1.86, 2.19, -1.26);
pointLight2.intensity = 1.06;
scene.add(pointLight2);

const light2 = gui.addFolder("Light 2");

light2.add(pointLight.position, "y").min(-3).max(3).step(0.01);
light2.add(pointLight.position, "x").min(-6).max(6).step(0.01);
light2.add(pointLight.position, "z").min(-3).max(3).step(0.01);
light2.add(pointLight, "intensity").min(0).max(10).step(0.01);

const pointLight3 = new THREE.PointLight(0x3cff, 2);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
pointLight3.position.set(3.34, -3, 0.24);
pointLight3.intensity = 0.63;
scene.add(pointLight3);

const light3 = gui.addFolder("Light 3");

light3.add(pointLight.position, "y").min(-3).max(3).step(0.01);
light3.add(pointLight.position, "x").min(-6).max(6).step(0.01);
light3.add(pointLight.position, "z").min(-3).max(3).step(0.01);
light3.add(pointLight, "intensity").min(0).max(10).step(0.01);

// const pointLightHelper = new THREE.pointLightHelper(pointLight2, 1);
// scene.add(pointLightHelper);

const light3color = {
  color: 0x3cff,
};
light3.addColor(light3color, "color").onChange(() => {
  pointLight3.color.set(light3color.color);
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 0.25 * (targetX - sphere.rotation.y);
  sphere.rotation.y += 0.2 * (targetY - sphere.rotation.x);
  sphere.rotation.z += 0.2 * (targetY - sphere.rotation.z);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
