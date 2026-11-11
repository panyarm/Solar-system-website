import * as THREE from 'three';

/**
 * Creates a multi-spectral 3D starfield + instanced Main Asteroid Belt & Kuiper Belt
 */
export function createCosmicEnvironment(scene) {
  const starCount = 9500;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);

  const spectralPalette = [
    new THREE.Color('#9bb0ff'), // O/B blue-white
    new THREE.Color('#cad7ff'), // A white-blue
    new THREE.Color('#f8f7ff'), // F pure white
    new THREE.Color('#fff4ea'), // G yellow-white
    new THREE.Color('#ffd2a1'), // K orange
    new THREE.Color('#ffcc6f')  // M red-orange
  ];

  for (let i = 0; i < starCount; i++) {
    const r = 650 + Math.random() * 1400;
    const theta = Math.random() * Math.PI * 2;
    const u = Math.random() * 2 - 1;
    const phi = Math.acos(u);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi);
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

    const baseCol = spectralPalette[Math.floor(Math.random() * spectralPalette.length)];
    const brightness = 0.55 + Math.random() * 0.45;
    colors[i * 3] = baseCol.r * brightness;
    colors[i * 3 + 1] = baseCol.g * brightness;
    colors[i * 3 + 2] = baseCol.b * brightness;
  }

  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const starMat = new THREE.PointsMaterial({
    size: 1.85,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    depthWrite: false
  });

  const starPoints = new THREE.Points(starGeo, starMat);
  scene.add(starPoints);

  // Main Asteroid Belt (between Mars @ 88 and Jupiter @ 145, centered near Ceres @ 112)
  const asteroidGeo = new THREE.IcosahedronGeometry(0.18, 0);
  const asteroidMat = new THREE.MeshStandardMaterial({
    color: 0x8a8279,
    roughness: 0.92,
    metalness: 0.08
  });

  const beltCount = 1400;
  const asteroidBelt = new THREE.InstancedMesh(asteroidGeo, asteroidMat, beltCount);
  const dummy = new THREE.Object3D();

  for (let i = 0; i < beltCount; i++) {
    const radius = 104 + (Math.random() + Math.random()) * 10; // ~104..124
    const angle = Math.random() * Math.PI * 2;
    const ySpread = (Math.random() - 0.5) * 4.5;

    dummy.position.set(
      Math.cos(angle) * radius,
      ySpread,
      Math.sin(angle) * radius
    );
    dummy.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    const s = 0.4 + Math.random() * 1.45;
    dummy.scale.set(s * 1.2, s * 0.85, s);
    dummy.updateMatrix();
    asteroidBelt.setMatrixAt(i, dummy.matrix);
  }
  asteroidBelt.instanceMatrix.needsUpdate = true;
  scene.add(asteroidBelt);

  // Outer Kuiper Belt icy bodies (around Pluto @ 375)
  const kuiperGeo = new THREE.IcosahedronGeometry(0.24, 0);
  const kuiperMat = new THREE.MeshStandardMaterial({
    color: 0x99b2cc,
    roughness: 0.85,
    metalness: 0.1
  });
  const kuiperCount = 900;
  const kuiperBelt = new THREE.InstancedMesh(kuiperGeo, kuiperMat, kuiperCount);

  for (let i = 0; i < kuiperCount; i++) {
    const radius = 355 + Math.random() * 48;
    const angle = Math.random() * Math.PI * 2;
    const ySpread = (Math.random() - 0.5) * 14.0;

    dummy.position.set(
      Math.cos(angle) * radius,
      ySpread,
      Math.sin(angle) * radius
    );
    dummy.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
    const s = 0.5 + Math.random() * 1.6;
    dummy.scale.set(s, s * 0.8, s * 1.1);
    dummy.updateMatrix();
    kuiperBelt.setMatrixAt(i, dummy.matrix);
  }
  kuiperBelt.instanceMatrix.needsUpdate = true;
  scene.add(kuiperBelt);

  return {
    starPoints,
    asteroidBelt,
    kuiperBelt,
    update(dt) {
      asteroidBelt.rotation.y += dt * 0.004;
      kuiperBelt.rotation.y += dt * 0.0012;
    }
  };
}
