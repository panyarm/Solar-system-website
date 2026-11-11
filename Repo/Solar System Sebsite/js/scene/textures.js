import * as THREE from 'three';

/**
 * Deterministic seeded PRNG & 3D Value Noise for seamless spherical equirectangular maps
 */
function createSeededRandom(seedStr) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return function () {
    h += h << 13;
    h ^= h >>> 7;
    h += h << 3;
    h ^= h >>> 17;
    h += h << 5;
    return (h >>> 0) / 4294967296;
  };
}

function hash3(ix, iy, iz, seed) {
  let n = ix * 374761393 + iy * 668265263 + iz * 2147483647 + seed * 1597334677;
  n = (n ^ (n >> 13)) * 1274126177;
  return ((n ^ (n >> 16)) >>> 0) / 4294967296;
}

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function valueNoise3D(x, y, z, seed) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);
  const fx = smoothstep(x - ix);
  const fy = smoothstep(y - iy);
  const fz = smoothstep(z - iz);

  const n000 = hash3(ix, iy, iz, seed);
  const n100 = hash3(ix + 1, iy, iz, seed);
  const n010 = hash3(ix, iy + 1, iz, seed);
  const n110 = hash3(ix + 1, iy + 1, iz, seed);
  const n001 = hash3(ix, iy, iz + 1, seed);
  const n101 = hash3(ix + 1, iy, iz + 1, seed);
  const n011 = hash3(ix, iy + 1, iz + 1, seed);
  const n111 = hash3(ix + 1, iy + 1, iz + 1, seed);

  const nx00 = lerp(n000, n100, fx);
  const nx10 = lerp(n010, n110, fx);
  const nx01 = lerp(n001, n101, fx);
  const nx11 = lerp(n011, n111, fx);

  const nxy0 = lerp(nx00, nx10, fy);
  const nxy1 = lerp(nx01, nx11, fy);

  return lerp(nxy0, nxy1, fz);
}

function fbm3D(x, y, z, seed, octaves = 4) {
  let value = 0;
  let amp = 0.5;
  let freq = 1.0;
  for (let i = 0; i < octaves; i++) {
    value += amp * valueNoise3D(x * freq, y * freq, z * freq, seed + i * 31);
    freq *= 2.05;
    amp *= 0.5;
  }
  return value;
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function mixRgb(c1, c2, t) {
  const cl = Math.max(0, Math.min(1, t));
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * cl),
    g: Math.round(c1.g + (c2.g - c1.g) * cl),
    b: Math.round(c1.b + (c2.b - c1.b) * cl)
  };
}

/**
 * Generates an equirectangular color texture + bump map for a given body
 */
export function generateBodyTextures(body) {
  const width = 512;
  const height = 256;

  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = width;
  colorCanvas.height = height;
  const ctx = colorCanvas.getContext('2d');
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = width;
  bumpCanvas.height = height;
  const bumpCtx = bumpCanvas.getContext('2d');
  const bumpImg = bumpCtx.createImageData(width, height);
  const bData = bumpImg.data;

  const rand = createSeededRandom(body.id);
  const seed = Math.floor(rand() * 10000);

  const cBase = hexToRgb(body.palette.base);
  const cSec = hexToRgb(body.palette.secondary);
  const cHigh = hexToRgb(body.palette.highlight);
  const pattern = body.palette.pattern || 'cratered';

  // Pre-generate craters for rocky / cratered worlds
  const craters = [];
  if (pattern === 'cratered' || pattern === 'mars' || pattern === 'pluto') {
    const count = pattern === 'cratered' ? 45 : 22;
    for (let c = 0; c < count; c++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      craters.push({
        cx: Math.sin(phi) * Math.cos(theta),
        cy: Math.cos(phi),
        cz: Math.sin(phi) * Math.sin(theta),
        radius: 0.06 + rand() * 0.18,
        depth: 0.4 + rand() * 0.6
      });
    }
  }

  for (let y = 0; y < height; y++) {
    const v = y / (height - 1);
    const phi = v * Math.PI; // 0 (north pole) -> PI (south pole)
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);
    const lat = Math.abs(v - 0.5) * 2; // 0 at equator, 1 at poles

    for (let x = 0; x < width; x++) {
      const u = x / width;
      const theta = u * Math.PI * 2;
      const sx = sinPhi * Math.cos(theta);
      const sy = cosPhi;
      const sz = sinPhi * Math.sin(theta);

      let rgb = cBase;
      let heightVal = 0.5;

      if (pattern === 'star') {
        const n1 = fbm3D(sx * 4.5, sy * 4.5, sz * 4.5, seed, 4);
        const n2 = fbm3D(sx * 12, sy * 12, sz * 12, seed + 99, 3);
        const gran = Math.pow(n1 * 0.65 + n2 * 0.35, 1.3);
        rgb = gran > 0.52 ? mixRgb(cBase, cHigh, (gran - 0.52) * 2.4) : mixRgb(cSec, cBase, gran * 1.9);
        heightVal = gran;
      } else if (pattern === 'earth') {
        const cont = fbm3D(sx * 2.2, sy * 2.2, sz * 2.2, seed, 5);
        const detail = fbm3D(sx * 8, sy * 8, sz * 8, seed + 51, 3);
        const elev = cont * 0.82 + detail * 0.18;

        if (lat > 0.84 - detail * 0.08) {
          // Polar ice caps
          rgb = { r: 238, g: 247, b: 255 };
          heightVal = 0.7;
        } else if (elev > 0.51) {
          // Continents: forest green -> arid tan -> mountain snow
          const landT = (elev - 0.51) / 0.49;
          const forest = { r: 38, g: 115, b: 58 };
          const desert = { r: 179, g: 148, b: 92 };
          const peak = { r: 235, g: 240, b: 245 };
          rgb = landT < 0.6 ? mixRgb(forest, desert, landT / 0.6) : mixRgb(desert, peak, (landT - 0.6) / 0.4);
          heightVal = 0.55 + landT * 0.45;
        } else {
          // Deep ocean -> shallow coastal shelf
          const seaT = elev / 0.51;
          const deep = { r: 12, g: 46, b: 99 };
          const shallow = { r: 34, g: 118, b: 184 };
          rgb = mixRgb(deep, shallow, Math.pow(seaT, 2));
          heightVal = 0.25;
        }
      } else if (pattern === 'mars') {
        const n = fbm3D(sx * 2.8, sy * 2.8, sz * 2.8, seed, 5);
        if (lat > 0.88 - n * 0.05) {
          rgb = { r: 242, g: 238, b: 235 };
          heightVal = 0.75;
        } else {
          rgb = n > 0.52 ? mixRgb(cBase, cHigh, (n - 0.52) * 2) : mixRgb(cSec, cBase, n * 1.9);
          heightVal = n;
        }
      } else if (pattern === 'jupiter' || pattern === 'saturn') {
        const turb = fbm3D(sx * 4, sy * 4, sz * 4, seed, 4) * 0.08;
        const bands = Math.sin((v + turb) * Math.PI * (pattern === 'jupiter' ? 16 : 12));
        const bandNorm = bands * 0.5 + 0.5;
        rgb = bandNorm > 0.55
          ? mixRgb(cBase, cHigh, (bandNorm - 0.55) * 2.1)
          : mixRgb(cSec, cBase, bandNorm * 1.8);

        // Great Red Spot on Jupiter
        if (pattern === 'jupiter') {
          const du = ((u - 0.58 + 1.5) % 1) - 0.5;
          const dv = v - 0.62;
          const spotDist = Math.hypot(du * 4.5, dv * 9.5);
          if (spotDist < 1.0) {
            const spotFactor = smoothstep(1 - spotDist);
            const redSpot = { r: 196, g: 68, b: 39 };
            rgb = mixRgb(rgb, redSpot, spotFactor * 0.88);
          }
        }
        heightVal = 0.45 + bandNorm * 0.1;
      } else if (pattern === 'ice_giant' || pattern === 'neptune') {
        const turb = fbm3D(sx * 3.5, sy * 3.5, sz * 3.5, seed, 4) * 0.05;
        const band = Math.cos((v + turb) * Math.PI * 8) * 0.5 + 0.5;
        rgb = mixRgb(cSec, cBase, band * 0.75 + 0.2);
        if (pattern === 'neptune' && band > 0.72) {
          rgb = mixRgb(rgb, cHigh, (band - 0.72) * 2.5);
        }
        heightVal = 0.5;
      } else if (pattern === 'clouds') {
        const swirl = fbm3D(sx * 3.2, sy * 3.2, sz * 3.2, seed, 5);
        const streak = Math.sin((v + swirl * 0.15) * Math.PI * 9) * 0.5 + 0.5;
        const mixVal = swirl * 0.65 + streak * 0.35;
        rgb = mixVal > 0.5 ? mixRgb(cBase, cHigh, (mixVal - 0.5) * 1.8) : mixRgb(cSec, cBase, mixVal * 2);
        heightVal = 0.45 + mixVal * 0.15;
      } else if (pattern === 'volcanic') {
        const calderas = fbm3D(sx * 5, sy * 5, sz * 5, seed, 5);
        const sulfur = fbm3D(sx * 10, sy * 10, sz * 10, seed + 19, 3);
        if (calderas < 0.27) {
          rgb = mixRgb({ r: 40, g: 12, b: 5 }, { r: 255, g: 85, b: 10 }, calderas / 0.27);
        } else {
          rgb = mixRgb(cBase, cHigh, sulfur);
        }
        heightVal = calderas;
      } else if (pattern === 'icy_cracks') {
        const baseNoise = fbm3D(sx * 3, sy * 3, sz * 3, seed, 4);
        const ridge1 = Math.abs(fbm3D(sx * 7, sy * 7, sz * 7, seed + 23, 3) - 0.5);
        const ridge2 = Math.abs(fbm3D(sx * 11, sy * 11, sz * 11, seed + 71, 3) - 0.5);
        const crack = Math.min(ridge1, ridge2);
        if (crack < 0.032) {
          const t = 1 - crack / 0.032;
          rgb = mixRgb(cBase, cSec, t * 0.9);
          heightVal = 0.3;
        } else {
          rgb = mixRgb(cBase, cHigh, baseNoise);
          heightVal = 0.55 + baseNoise * 0.2;
        }
      } else if (pattern === 'pluto') {
        const n = fbm3D(sx * 3, sy * 3, sz * 3, seed, 5);
        // Tombaugh Regio bright heart patch
        const du = ((u - 0.48 + 1.5) % 1) - 0.5;
        const dv = v - 0.52;
        const heartDist = Math.hypot(du * 4.2, dv * 3.8);
        if (heartDist < 0.65) {
          rgb = mixRgb(cBase, cHigh, smoothstep(1 - heartDist / 0.65));
          heightVal = 0.48;
        } else {
          rgb = n > 0.48 ? mixRgb(cBase, cHigh, (n - 0.48) * 1.4) : mixRgb(cSec, cBase, n * 2);
          heightVal = n;
        }
      } else {
        // Cratered rocky / icy moon or planet (Mercury, Moon, Ceres, Ganymede, Callisto, Iapetus, etc.)
        let n = fbm3D(sx * 3.5, sy * 3.5, sz * 3.5, seed, 5);
        // Special two-toned hemisphere for Iapetus
        if (body.id === 'iapetus' && sx > -0.15 + (n - 0.5) * 0.35) {
          n *= 0.32;
        }
        rgb = n > 0.52 ? mixRgb(cBase, cHigh, (n - 0.52) * 1.8) : mixRgb(cSec, cBase, n * 1.9);
        heightVal = n;
      }

      // Apply 3D spherical craters if present
      if (craters.length > 0) {
        for (let i = 0; i < craters.length; i++) {
          const cr = craters[i];
          const dx = sx - cr.cx;
          const dy = sy - cr.cy;
          const dz = sz - cr.cz;
          const dist = Math.hypot(dx, dy, dz);
          if (dist < cr.radius) {
            const norm = dist / cr.radius;
            if (norm < 0.78) {
              // Crater bowl
              const bowl = Math.cos((norm / 0.78) * (Math.PI * 0.5)) * cr.depth * 0.35;
              heightVal = Math.max(0.05, heightVal - bowl);
              rgb = mixRgb(rgb, cSec, bowl * 1.2);
            } else {
              // Elevated bright rim
              const rim = Math.sin(((norm - 0.78) / 0.22) * Math.PI) * cr.depth * 0.28;
              heightVal = Math.min(0.98, heightVal + rim);
              rgb = mixRgb(rgb, cHigh, rim * 1.3);
            }
          }
        }
      }

      const idx = (y * width + x) * 4;
      data[idx] = rgb.r;
      data[idx + 1] = rgb.g;
      data[idx + 2] = rgb.b;
      data[idx + 3] = 255;

      const bVal = Math.max(0, Math.min(255, Math.round(heightVal * 255)));
      bData[idx] = bVal;
      bData[idx + 1] = bVal;
      bData[idx + 2] = bVal;
      bData[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);
  bumpCtx.putImageData(bumpImg, 0, 0);

  const colorTex = new THREE.CanvasTexture(colorCanvas);
  colorTex.colorSpace = THREE.SRGBColorSpace;
  colorTex.wrapS = THREE.RepeatWrapping;
  colorTex.wrapT = THREE.ClampToEdgeWrapping;

  const bumpTex = new THREE.CanvasTexture(bumpCanvas);
  bumpTex.wrapS = THREE.RepeatWrapping;
  bumpTex.wrapT = THREE.ClampToEdgeWrapping;

  return { colorTex, bumpTex };
}

/**
 * Generates radial ring texture for Saturn & Uranus
 */
export function generateRingTexture(baseColorHex, isSaturn = true) {
  const width = 512;
  const height = 32;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const baseRgb = hexToRgb(baseColorHex);

  for (let x = 0; x < width; x++) {
    const t = x / (width - 1); // 0 = inner edge, 1 = outer edge
    let alpha = 0;
    let shade = 1.0;

    if (isSaturn) {
      // C Ring (inner faint), B Ring (bright dense), Cassini Division (gap ~0.64..0.70), A Ring, F Ring
      if (t > 0.05 && t < 0.24) {
        alpha = 0.22 + 0.12 * Math.sin(t * 95);
        shade = 0.78;
      } else if (t >= 0.24 && t < 0.63) {
        alpha = 0.72 + 0.22 * Math.sin(t * 160) * Math.cos(t * 43);
        shade = 0.95 + 0.1 * Math.sin(t * 120);
      } else if (t >= 0.63 && t < 0.69) {
        // Cassini Division
        alpha = 0.04;
        shade = 0.5;
      } else if (t >= 0.69 && t < 0.93) {
        // A Ring + Encke Gap around 0.87
        const encke = Math.abs(t - 0.87) < 0.01 ? 0.1 : 1.0;
        alpha = (0.55 + 0.15 * Math.cos(t * 140)) * encke;
        shade = 0.88;
      } else if (t >= 0.95 && t < 0.98) {
        alpha = 0.35;
      }
    } else {
      // Uranus narrow epsilon & inner rings
      const r1 = Math.exp(-Math.pow((t - 0.35) / 0.025, 2)) * 0.35;
      const r2 = Math.exp(-Math.pow((t - 0.62) / 0.02, 2)) * 0.42;
      const r3 = Math.exp(-Math.pow((t - 0.88) / 0.035, 2)) * 0.65;
      alpha = Math.min(0.8, r1 + r2 + r3);
      shade = 0.9;
    }

    const r = Math.min(255, Math.round(baseRgb.r * shade));
    const g = Math.min(255, Math.round(baseRgb.g * shade));
    const b = Math.min(255, Math.round(baseRgb.b * shade));

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
    ctx.fillRect(x, 0, 1, height);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
