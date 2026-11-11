import * as THREE from 'three';
import { BODIES } from '../data/bodies.js';

function smoothstep(t) {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

/**
 * Computes the ideal camera position and lookAt target for a celestial stop,
 * dynamically tracking the body's live world position and framing it cleanly
 * to the right of the left HUD panel.
 */
export function computeVantageForBody(
  body,
  getBodyWorldPosition,
  userOrbitOffset = { yaw: 0, pitch: 0 }
) {
  const bodyPos = getBodyWorldPosition(body.id, new THREE.Vector3());
  const r = body.sceneRadius;

  // Determine direction from Sun (0,0,0) to body so we view its sunlit hemisphere
  const sunToBody = bodyPos.clone();
  if (sunToBody.lengthSq() < 0.001) {
    sunToBody.set(0, 0, 1);
  } else {
    sunToBody.normalize();
  }

  const worldUp = new THREE.Vector3(0, 1, 0);
  const rightVec = new THREE.Vector3().crossVectors(worldUp, sunToBody).normalize();
  if (rightVec.lengthSq() < 0.001) {
    rightVec.set(1, 0, 0);
  }

  // Distance multiplier tailored to rings or body type
  const distMultiplier = body.rings ? 4.35 : body.id === 'sun' ? 3.55 : body.type === 'moon' ? 4.1 : 3.65;
  const dist = Math.max(1.45, r * distMultiplier);

  // Base approach angle: ~48 deg sunlit side + elevated pitch
  const baseYaw = 0.72 + userOrbitOffset.yaw;
  const basePitch = (body.rings ? 0.34 : 0.22) + userOrbitOffset.pitch;

  // Build local basis pointing back toward the Sun
  const toSun = sunToBody.clone().negate();
  const horizDir = toSun
    .clone()
    .multiplyScalar(Math.cos(baseYaw))
    .addScaledVector(rightVec, Math.sin(baseYaw))
    .normalize();

  const offsetDir = horizDir
    .multiplyScalar(Math.cos(basePitch))
    .addScaledVector(worldUp, Math.sin(basePitch))
    .normalize();

  const camPos = bodyPos.clone().addScaledVector(offsetDir, dist);

  // Shift lookAt slightly toward camera-left so the body sits on the right ~60% of the screen,
  // completely clear of the left telemetry info card on desktop viewports.
  const camForward = bodyPos.clone().sub(camPos).normalize();
  const camRight = new THREE.Vector3().crossVectors(camForward, worldUp).normalize();
  const desktopShift = window.innerWidth > 768 ? -r * 0.62 : 0;
  const verticalShift = window.innerWidth <= 768 ? -r * 0.45 : 0;

  const lookAt = bodyPos
    .clone()
    .addScaledVector(camRight, desktopShift)
    .addScaledVector(worldUp, verticalShift);

  return {
    bodyPos,
    camPos,
    lookAt
  };
}

/**
 * Evaluates the camera state at normalized tour progress [0..1]
 * Each segment has a "hold/inspect" window and a smooth curved flight to the next stop.
 */
export function evaluateTourProgress(
  globalProgress,
  getBodyWorldPosition,
  userOrbitOffset
) {
  const count = BODIES.length;
  const maxIndex = count - 1;
  const clamped = Math.max(0, Math.min(1, globalProgress));
  const scaled = clamped * maxIndex;

  const segIndex = Math.min(maxIndex - 1, Math.floor(scaled));
  const rawLocalT = scaled - segIndex;

  // Hold cleanly on the current body for the first 28% of the segment, then fly over the remaining 72%
  const holdFraction = 0.28;
  let travelT = 0;
  if (rawLocalT > holdFraction) {
    travelT = smoothstep((rawLocalT - holdFraction) / (1 - holdFraction));
  }

  const fromBody = BODIES[segIndex];
  const toBody = BODIES[Math.min(maxIndex, segIndex + 1)];

  const activeIndex = travelT < 0.5 ? segIndex : Math.min(maxIndex, segIndex + 1);
  const activeBody = BODIES[activeIndex];

  // If we're at the very last stop
  if (clamped >= 0.9999) {
    const endVantage = computeVantageForBody(
      BODIES[maxIndex],
      getBodyWorldPosition,
      userOrbitOffset
    );
    return {
      activeIndex: maxIndex,
      activeBody: BODIES[maxIndex],
      fromBody: BODIES[maxIndex],
      toBody: BODIES[maxIndex],
      travelT: 0,
      camPos: endVantage.camPos,
      lookAt: endVantage.lookAt
    };
  }

  const vFrom = computeVantageForBody(
    fromBody,
    getBodyWorldPosition,
    travelT < 0.5 ? userOrbitOffset : { yaw: 0, pitch: 0 }
  );
  const vTo = computeVantageForBody(
    toBody,
    getBodyWorldPosition,
    travelT >= 0.5 ? userOrbitOffset : { yaw: 0, pitch: 0 }
  );

  // Arc the camera outward/upward mid-flight so it never clips through parent planets or rings
  const flightDist = vFrom.camPos.distanceTo(vTo.camPos);
  const arcLift = Math.sin(travelT * Math.PI) * Math.min(28, flightDist * 0.22);

  const camPos = new THREE.Vector3().lerpVectors(vFrom.camPos, vTo.camPos, travelT);
  camPos.y += arcLift * 0.45;

  // Also push slightly away from the origin/parent during mid-flight
  const midOutward = camPos.clone().normalize();
  camPos.addScaledVector(midOutward, arcLift * 0.35);

  const lookAt = new THREE.Vector3().lerpVectors(vFrom.lookAt, vTo.lookAt, travelT);

  return {
    activeIndex,
    activeBody,
    fromBody,
    toBody,
    travelT,
    camPos,
    lookAt
  };
}
