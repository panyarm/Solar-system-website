import * as THREE from 'three';
import { BODIES } from '../data/bodies.js';
import { getHeliocentricPositionAU } from '../astro/orbits.js';
import { generateBodyTextures, generateRingTexture } from './textures.js';

const DEG2RAD = Math.PI / 180;

/**
 * Custom Fresnel Atmosphere Glow ShaderMaterial
 */
function createAtmosphereMaterial(colorHex, intensity = 0.85) {
  return new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(colorHex) },
      intensity: { value: intensity }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-mvPosition.xyz);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform vec3 glowColor;
      uniform float intensity;
      varying vec3 vNormal;
      varying vec3 vViewDir;
      void main() {
        float rim = 1.0 - max(0.0, dot(vNormal, vViewDir));
        float glow = pow(rim, 2.8) * intensity;
        gl_FragColor = vec4(glowColor, glow);
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
    transparent: true,
    depthWrite: false
  });
}

/**
 * Creates a circular or mildly inclined orbit LineLoop in 3D
 */
function createOrbitRing(radius, tiltDeg = 0, colorHex = 0x38bdf8, opacity = 0.22) {
  const segments = 180;
  const pts = [];
  const tiltRad = tiltDeg * DEG2RAD;
  for (let i = 0; i < segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    const y = Math.sin(theta) * Math.sin(tiltRad) * (radius * 0.08);
    pts.push(new THREE.Vector3(x, y, z));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity,
    depthWrite: false
  });
  return new THREE.LineLoop(geo, mat);
}

/**
 * Builds all 31 celestial bodies in the 3D scene and returns a registry
 */
export function buildSolarSystemBodies(scene, onProgress) {
  const bodyNodes = new Map();
  const orbitLines = [];
  const now = new Date();

  const sphereGeo = new THREE.SphereGeometry(1, 64, 48);

  BODIES.forEach((body, idx) => {
    const { colorTex, bumpTex } = generateBodyTextures(body);

    // Root anchor group placed at orbital position
    const anchor = new THREE.Group();
    anchor.name = `anchor_${body.id}`;

    // Tilt group for axial obliquity
    const tiltGroup = new THREE.Group();
    tiltGroup.rotation.z = (body.axialTiltDeg || 0) * DEG2RAD;
    anchor.add(tiltGroup);

    let material;
    if (body.id === 'sun') {
      material = new THREE.MeshBasicMaterial({
        map: colorTex
      });
    } else {
      material = new THREE.MeshStandardMaterial({
        map: colorTex,
        bumpMap: bumpTex,
        bumpScale: body.type === 'planet' && body.palette.pattern !== 'cratered' ? 0.015 : 0.045,
        roughness: body.palette.pattern === 'earth' ? 0.65 : 0.85,
        metalness: 0.05
      });
    }

    const mesh = new THREE.Mesh(sphereGeo, material);
    mesh.scale.setScalar(body.sceneRadius);
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    tiltGroup.add(mesh);

    // Add Solar Corona / Atmospheric Fresnel Shell
    if (body.palette.atmosphere) {
      const atmoScale = body.id === 'sun' ? 1.16 : 1.055;
      const atmoIntensity = body.id === 'sun' ? 1.25 : 0.72;
      const atmoMat = createAtmosphereMaterial(body.palette.atmosphere, atmoIntensity);
      const atmoMesh = new THREE.Mesh(sphereGeo, atmoMat);
      atmoMesh.scale.setScalar(body.sceneRadius * atmoScale);
      tiltGroup.add(atmoMesh);
    }

    // Add Ring System for Saturn & Uranus
    if (body.rings) {
      const isSaturn = body.id === 'saturn';
      const ringGeo = new THREE.RingGeometry(
        body.rings.innerRadius,
        body.rings.outerRadius,
        128
      );

      // Remap UVs radially (u = 0 at innerRadius, u = 1 at outerRadius)
      const posAttr = ringGeo.attributes.position;
      const uvAttr = ringGeo.attributes.uv;
      for (let i = 0; i < posAttr.count; i++) {
        const vx = posAttr.getX(i);
        const vy = posAttr.getY(i);
        const r = Math.hypot(vx, vy);
        const u = (r - body.rings.innerRadius) / (body.rings.outerRadius - body.rings.innerRadius);
        uvAttr.setXY(i, u, 0.5);
      }

      const ringTex = generateRingTexture(body.rings.color, isSaturn);
      const ringMat = new THREE.MeshStandardMaterial({
        map: ringTex,
        side: THREE.DoubleSide,
        transparent: true,
        roughness: 0.6,
        metalness: 0.1,
        depthWrite: false
      });

      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI * 0.5;
      tiltGroup.add(ringMesh);
    }

    // Position the body in the 3D scene
    if (body.id === 'sun') {
      anchor.position.set(0, 0, 0);
      scene.add(anchor);
    } else if (body.type === 'moon' && body.parent) {
      // Attach moon around its parent planet's anchor
      const parentEntry = bodyNodes.get(body.parent);
      if (parentEntry) {
        const localR = body.localOrbitRadius || 4.0;
        const angle = body.localOrbitAngle || 0;
        const tiltRad = (body.localOrbitTilt || 0) * DEG2RAD;

        anchor.position.set(
          Math.cos(angle) * localR,
          Math.sin(angle) * Math.sin(tiltRad) * (localR * 0.12),
          Math.sin(angle) * localR
        );
        parentEntry.anchor.add(anchor);

        // Local moon orbit line attached to parent planet
        const moonOrbitLine = createOrbitRing(localR, body.localOrbitTilt || 0, 0xa78bfa, 0.2);
        parentEntry.anchor.add(moonOrbitLine);
        orbitLines.push(moonOrbitLine);
      }
    } else {
      // Planet or Dwarf Planet orbiting the Sun
      // Use real Keplerian ecliptic longitude angle from today's date, with compressed sceneDistance
      const helio = getHeliocentricPositionAU(body, now);
      const angle = helio.lonRad || idx * 0.85;
      const rScene = body.sceneDistance;
      const inclDeg = body.orbitElements ? body.orbitElements.i : 0;
      const inclRad = inclDeg * DEG2RAD;

      anchor.position.set(
        Math.cos(angle) * rScene,
        Math.sin(angle) * Math.sin(inclRad) * (rScene * 0.08),
        Math.sin(angle) * rScene
      );
      scene.add(anchor);

      const orbitColor = body.type === 'dwarf' ? 0x34d399 : 0x38bdf8;
      const planetOrbitLine = createOrbitRing(rScene, inclDeg, orbitColor, 0.22);
      scene.add(planetOrbitLine);
      orbitLines.push(planetOrbitLine);
    }

    bodyNodes.set(body.id, {
      body,
      anchor,
      tiltGroup,
      mesh,
      currentOrbitAngle: body.localOrbitAngle || 0
    });

    if (onProgress) {
      onProgress((idx + 1) / BODIES.length, body.name);
    }
  });

  // Helper to get world-space center of any body
  const tempVec = new THREE.Vector3();
  function getBodyWorldPosition(bodyId, target = new THREE.Vector3()) {
    const entry = bodyNodes.get(bodyId);
    if (!entry) return target.set(0, 0, 0);
    entry.anchor.updateWorldMatrix(true, false);
    entry.anchor.getWorldPosition(target);
    return target;
  }

  // Per-frame axial spin + gentle moon orbital motion
  function update(dt) {
    bodyNodes.forEach((entry) => {
      const { body, mesh, anchor } = entry;
      mesh.rotation.y += (body.rotationSpeed || 0.002) * (dt * 60);

      // Slowly advance moons along their local orbits for a living system feel
      if (body.type === 'moon') {
        entry.currentOrbitAngle += (body.localOrbitSpeed || 0.3) * dt * 0.045;
        const localR = body.localOrbitRadius || 4.0;
        const angle = entry.currentOrbitAngle;
        const tiltRad = (body.localOrbitTilt || 0) * DEG2RAD;
        anchor.position.set(
          Math.cos(angle) * localR,
          Math.sin(angle) * Math.sin(tiltRad) * (localR * 0.12),
          Math.sin(angle) * localR
        );
      }
    });
  }

  function setOrbitsVisible(visible) {
    orbitLines.forEach((line) => {
      line.visible = visible;
    });
  }

  return {
    bodyNodes,
    orbitLines,
    getBodyWorldPosition,
    update,
    setOrbitsVisible
  };
}
