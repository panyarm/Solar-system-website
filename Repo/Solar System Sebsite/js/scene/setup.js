import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

export function createSceneContext(canvas) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x02040a);
  scene.fog = new THREE.FogExp2(0x02040a, 0.00065);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    4000
  );
  camera.position.set(0, 18, 42);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Post-processing bloom for the Sun, atmospheres, and star highlights
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.85, // strength
    0.45, // radius
    0.78  // threshold
  );
  composer.addPass(bloomPass);

  // Primary Solar PointLight at origin
  const sunLight = new THREE.PointLight(0xfff5e0, 3.4, 0, 0.0);
  sunLight.position.set(0, 0, 0);
  scene.add(sunLight);

  // Subtle fill light so night sides of outer planets remain discernible
  const ambientLight = new THREE.AmbientLight(0x25355a, 0.55);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0x6889c2, 0x0b1021, 0.35);
  scene.add(hemiLight);

  function onResize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
  }

  window.addEventListener('resize', onResize);

  return {
    scene,
    camera,
    renderer,
    composer,
    bloomPass,
    sunLight
  };
}
