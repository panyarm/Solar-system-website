/**
 * Real-Time Keplerian Ephemeris & Distance Calculator
 * Uses JPL Approximate Positions of the Planets (J2000 epoch) to compute
 * 3D heliocentric vectors (AU) and live distance from Earth (km, AU, light-time).
 */

import { BODY_MAP } from '../data/bodies.js';

export const AU_IN_KM = 149597870.7;
export const SPEED_OF_LIGHT_KM_S = 299792.458;
const DEG2RAD = Math.PI / 180;

/**
 * Compute Julian Centuries since J2000.0 (2000-01-01 12:00 TT)
 */
export function getJulianCenturies(date = new Date()) {
  const jd = date.getTime() / 86400000 + 2440587.5;
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Normalize angle to [-180, 180] degrees
 */
function normalizeDeg(deg) {
  let d = deg % 360;
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

/**
 * Solve Kepler's Equation M = E - e * sin(E) via Newton-Raphson (in radians)
 */
export function solveKeplerRad(M, e) {
  let E = M + e * Math.sin(M);
  for (let iter = 0; iter < 8; iter++) {
    const dM = M - (E - e * Math.sin(E));
    const dE = dM / (1 - e * Math.cos(E));
    E += dE;
    if (Math.abs(dE) < 1e-8) break;
  }
  return E;
}

/**
 * Compute heliocentric ecliptic coordinates { x, y, z } in AU for a planet/dwarf planet
 */
export function getHeliocentricPositionAU(body, date = new Date()) {
  if (!body || body.id === 'sun') {
    return { x: 0, y: 0, z: 0, rAU: 0, lonRad: 0 };
  }

  // If the body is a moon, start from its parent planet's heliocentric position
  if (body.type === 'moon' && body.parent) {
    const parentBody = BODY_MAP.get(body.parent);
    const parentPos = getHeliocentricPositionAU(parentBody, date);
    const offsetAU = (body.meanDistFromParentKm || 0) / AU_IN_KM;
    const tDays = date.getTime() / 86400000;
    const angle = (body.localOrbitAngle || 0) + tDays * (body.localOrbitSpeed || 0.3);
    const x = parentPos.x + Math.cos(angle) * offsetAU;
    const z = parentPos.z + Math.sin(angle) * offsetAU;
    const y = parentPos.y;
    const rAU = Math.hypot(x, y, z);
    return { x, y, z, rAU, lonRad: Math.atan2(z, x) };
  }

  const el = body.orbitElements;
  if (!el) {
    return { x: 0, y: 0, z: 0, rAU: 0, lonRad: 0 };
  }

  const T = getJulianCenturies(date);
  const a = el.a + (el.dA || 0) * T;
  const e = el.e + (el.dE || 0) * T;
  const i = (el.i + (el.dI || 0) * T) * DEG2RAD;
  const L = el.L + (el.dL || 0) * T;
  const varpi = el.varpi + (el.dVarpi || 0) * T;
  const node = (el.node + (el.dNode || 0) * T) * DEG2RAD;

  const omega = (varpi - el.node - (el.dNode || 0) * T) * DEG2RAD;
  const Mdeg = normalizeDeg(L - varpi);
  const Mrad = Mdeg * DEG2RAD;

  const E = solveKeplerRad(Mrad, e);

  // Orbital plane coordinates
  const xPrime = a * (Math.cos(E) - e);
  const yPrime = a * Math.sqrt(1 - e * e) * Math.sin(E);

  // Rotate to 3D ecliptic coordinates (x, z horizontal plane, y vertical)
  const cosO = Math.cos(omega);
  const sinO = Math.sin(omega);
  const cosN = Math.cos(node);
  const sinN = Math.sin(node);
  const cosI = Math.cos(i);
  const sinI = Math.sin(i);

  const xEcl =
    (cosO * cosN - sinO * sinN * cosI) * xPrime +
    (-sinO * cosN - cosO * sinN * cosI) * yPrime;
  const yEcl =
    (cosO * sinN + sinO * cosN * cosI) * xPrime +
    (-sinO * sinN + cosO * cosN * cosI) * yPrime;
  const zEcl = sinO * sinI * xPrime + cosO * sinI * yPrime;

  // Map ecliptic (xEcl, yEcl, zEcl) -> Three.js scene axes (x: xEcl, y: zEcl, z: -yEcl)
  const x = xEcl;
  const y = zEcl;
  const z = -yEcl;
  const rAU = Math.hypot(x, y, z);
  const lonRad = Math.atan2(z, x);

  return { x, y, z, rAU, lonRad };
}

/**
 * Compute real-time distance from Earth in kilometers, AU, and light-travel seconds
 */
export function getDistanceFromEarth(body, date = new Date()) {
  if (!body || body.id === 'earth') {
    return {
      km: 0,
      au: 0,
      lightSeconds: 0
    };
  }

  // Earth's Moon uses its direct geocentric distance with slight orbital eccentricity variation
  if (body.id === 'moon') {
    const tDays = date.getTime() / 86400000;
    const anomalisticPhase = (2 * Math.PI * (tDays - 2451555.8)) / 27.55455;
    const km = 385000 - 20905 * Math.cos(anomalisticPhase);
    return {
      km,
      au: km / AU_IN_KM,
      lightSeconds: km / SPEED_OF_LIGHT_KM_S
    };
  }

  const earth = BODY_MAP.get('earth');
  const earthPos = getHeliocentricPositionAU(earth, date);
  const targetPos = getHeliocentricPositionAU(body, date);

  const dx = targetPos.x - earthPos.x;
  const dy = targetPos.y - earthPos.y;
  const dz = targetPos.z - earthPos.z;

  const distAU = Math.hypot(dx, dy, dz);
  const distKm = distAU * AU_IN_KM;
  const lightSeconds = distKm / SPEED_OF_LIGHT_KM_S;

  return {
    km: distKm,
    au: distAU,
    lightSeconds
  };
}
