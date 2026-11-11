/**
 * Formatting Utilities for Astronomical Telemetry (English UI)
 */

const intFormat = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const dec1Format = new Intl.NumberFormat('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const dec2Format = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const dec3Format = new Intl.NumberFormat('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

export function formatKm(km) {
  if (km === 0) return '0 km (You Are Here)';
  return `${intFormat.format(Math.round(km))} km`;
}

export function formatCompactKm(km) {
  if (km === 0) return '0 km (Home)';
  if (km < 1e6) {
    return `${intFormat.format(Math.round(km))} km`;
  }
  if (km < 1e9) {
    return `${dec2Format.format(km / 1e6)}M km`;
  }
  return `${dec2Format.format(km / 1e9)}B km`;
}

export function formatAU(au, bodyId = '') {
  if (bodyId === 'earth') return '0.000 AU';
  if (au < 0.01) {
    return `${(au * 1000).toFixed(3)} mAU`;
  }
  return `${dec3Format.format(au)} AU`;
}

export function formatLightTime(seconds, bodyId = '') {
  if (bodyId === 'earth' || seconds <= 0) return '0.00 s (Local)';
  if (seconds < 60) {
    return `${dec2Format.format(seconds)} sec`;
  }
  if (seconds < 3600) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${dec1Format.format(secs)}s`;
  }
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.round(seconds % 60);
  return `${hours}h ${mins}m ${secs}s`;
}

export function formatRangeKm(rangeArr, bodyId = '') {
  if (bodyId === 'earth' || !rangeArr || (rangeArr[0] === 0 && rangeArr[1] === 0)) {
    return 'Reference Origin (0 km)';
  }
  return `${formatCompactKm(rangeArr[0])} – ${formatCompactKm(rangeArr[1])}`;
}

export function formatDiameterKm(radiusKm) {
  const diameter = radiusKm * 2;
  if (diameter < 100) {
    return `${dec1Format.format(diameter)} km`;
  }
  return `${intFormat.format(Math.round(diameter))} km`;
}
