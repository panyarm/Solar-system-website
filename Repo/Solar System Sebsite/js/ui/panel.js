import gsap from 'gsap';
import { BODIES } from '../data/bodies.js';
import { getDistanceFromEarth } from '../astro/orbits.js';
import {
  formatKm,
  formatCompactKm,
  formatAU,
  formatLightTime,
  formatRangeKm,
  formatDiameterKm
} from './format.js';

export function createInfoPanelController({ onSelectStopIndex }) {
  const elBadge = document.getElementById('body-badge');
  const elParent = document.getElementById('body-parent');
  const elName = document.getElementById('body-name');
  const elTagline = document.getElementById('body-tagline');
  const elDesc = document.getElementById('body-description');

  const elDistKm = document.getElementById('distance-km');
  const elDistAu = document.getElementById('distance-au');
  const elDistLight = document.getElementById('distance-light');
  const elDistRange = document.getElementById('distance-range');

  const elHudStop = document.getElementById('hud-stop-index');
  const elHudTopDist = document.getElementById('hud-top-distance');
  const elHudUtc = document.getElementById('hud-utc-time');

  const elDiameter = document.getElementById('metric-diameter');
  const elMass = document.getElementById('metric-mass');
  const elGravity = document.getElementById('metric-gravity');
  const elTemp = document.getElementById('metric-temp');
  const elDay = document.getElementById('metric-day');
  const elYear = document.getElementById('metric-year');
  const elMoons = document.getElementById('metric-moons');
  const elOrbitDist = document.getElementById('metric-orbit-dist');

  const elFacts = document.getElementById('body-facts');
  const elMoonsContainer = document.getElementById('moons-jump-container');
  const elMoonsList = document.getElementById('moons-jump-list');

  const animState = { km: 0, au: 0, lightSeconds: 0 };
  let currentBody = null;

  function renderSatelliteChips(activeBody) {
    // Determine system parent ID (either this planet or this moon's parent planet)
    const systemId = activeBody.type === 'moon' ? activeBody.parent : activeBody.id;
    const systemMoons = BODIES.map((b, idx) => ({ body: b, idx })).filter(
      (item) => item.body.type === 'moon' && item.body.parent === systemId
    );

    if (systemMoons.length === 0) {
      elMoonsContainer.classList.add('hidden');
      elMoonsList.innerHTML = '';
      return;
    }

    elMoonsContainer.classList.remove('hidden');
    elMoonsList.innerHTML = '';

    // Also include a chip back to the host planet if currently viewing a moon
    if (activeBody.type === 'moon') {
      const hostIdx = BODIES.findIndex((b) => b.id === systemId);
      if (hostIdx !== -1) {
        const hostChip = document.createElement('button');
        hostChip.type = 'button';
        hostChip.className = 'moon-chip';
        hostChip.textContent = `🪐 ${BODIES[hostIdx].name} (Host)`;
        hostChip.addEventListener('click', () => onSelectStopIndex(hostIdx));
        elMoonsList.appendChild(hostChip);
      }
    }

    systemMoons.forEach(({ body, idx }) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'moon-chip';
      if (body.id === activeBody.id) {
        btn.style.borderColor = '#38bdf8';
        btn.style.color = '#ffffff';
      }
      btn.textContent = body.name;
      btn.addEventListener('click', () => onSelectStopIndex(idx));
      elMoonsList.appendChild(btn);
    });
  }

  function updateBody(body, stopIndex) {
    currentBody = body;
    const panelContainer = document.getElementById('info-panel');
    if (panelContainer) {
      panelContainer.scrollTop = 0;
    }

    // Badge styling by type
    elBadge.textContent = body.badge;
    elBadge.className = `body-badge type-${body.type}`;
    elParent.textContent = body.parentLabel || '';
    elName.textContent = body.name;
    elTagline.textContent = body.tagline;
    elDesc.textContent = body.description;

    // Top HUD stop counter
    const paddedIdx = String(stopIndex + 1).padStart(2, '0');
    const paddedTotal = String(BODIES.length).padStart(2, '0');
    elHudStop.textContent = `${paddedIdx} / ${paddedTotal}`;

    // Physical metrics
    elDiameter.textContent = formatDiameterKm(body.radiusKm);
    elMass.textContent = body.massText;
    elGravity.textContent = `${body.gravityMs2} m/s²`;
    elTemp.textContent = body.tempText;
    elDay.textContent = body.rotationText;
    elYear.textContent = body.orbitalPeriodText;
    elMoons.textContent = body.moonsCountText;
    elOrbitDist.textContent = body.semiMajorAxisText;

    // Scientific facts
    elFacts.innerHTML = '';
    (body.facts || []).forEach((factText) => {
      const li = document.createElement('li');
      li.textContent = factText;
      elFacts.appendChild(li);
    });

    // Satellite chips
    renderSatelliteChips(body);

    // Compute live distance from Earth and animate numbers
    const now = new Date();
    const dist = getDistanceFromEarth(body, now);
    elDistRange.textContent = formatRangeKm(body.earthDistRangeKm, body.id);

    gsap.killTweensOf(animState);
    gsap.to(animState, {
      km: dist.km,
      au: dist.au,
      lightSeconds: dist.lightSeconds,
      duration: 0.65,
      ease: 'power2.out',
      onUpdate: () => {
        elDistKm.textContent = formatKm(animState.km);
        elDistAu.textContent = formatAU(animState.au, body.id);
        elDistLight.textContent = formatLightTime(animState.lightSeconds, body.id);
        elHudTopDist.textContent = formatCompactKm(animState.km);
      }
    });

    // Subtle entrance animation for panel header
    gsap.fromTo(
      [elName, elTagline],
      { opacity: 0.35, y: 6 },
      { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: 'power2.out' }
    );
  }

  // Live UTC clock + periodic live ephemeris refresh
  function tickLiveClock() {
    const now = new Date();
    elHudUtc.textContent = now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  }
  tickLiveClock();
  setInterval(tickLiveClock, 1000);

  return {
    updateBody
  };
}
