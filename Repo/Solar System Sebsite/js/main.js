import { BODIES } from './data/bodies.js';
import { createSceneContext } from './scene/setup.js';
import { createCosmicEnvironment } from './scene/starfield.js';
import { buildSolarSystemBodies } from './scene/bodies.js';
import { createTourController } from './tour/controller.js';
import { createInfoPanelController } from './ui/panel.js';
import { createTourNavController } from './ui/nav.js';

function initApp() {
  const canvas = document.getElementById('scene-canvas');
  const loadingScreen = document.getElementById('loading-screen');
  const loadingBarFill = document.getElementById('loading-bar-fill');
  const loadingStatus = document.getElementById('loading-status');

  const { scene, camera, composer } = createSceneContext(canvas);
  const environment = createCosmicEnvironment(scene);

  // Build all 31 celestial bodies & procedural textures
  const solarSystem = buildSolarSystemBodies(scene, (progress, bodyName) => {
    if (loadingBarFill) {
      loadingBarFill.style.width = `${Math.round(progress * 100)}%`;
    }
    if (loadingStatus) {
      loadingStatus.textContent = `Synthesizing surface & ephemeris: ${bodyName}...`;
    }
  });

  let tourController = null;

  const infoPanel = createInfoPanelController({
    onSelectStopIndex: (idx) => {
      if (tourController) tourController.scrollToStopIndex(idx);
    }
  });

  const tourNav = createTourNavController({
    onSelectStopIndex: (idx) => {
      if (tourController) tourController.scrollToStopIndex(idx);
    }
  });

  tourController = createTourController({
    camera,
    canvas,
    getBodyWorldPosition: solarSystem.getBodyWorldPosition,
    onBodyChange: (body, index) => {
      infoPanel.updateBody(body, index);
      tourNav.setActiveIndex(index);
    },
    onProgressUpdate: (progress) => {
      tourNav.setProgress(progress);
    }
  });

  // Top HUD action buttons
  const btnPrev = document.getElementById('btn-prev-stop');
  const btnNext = document.getElementById('btn-next-stop');
  const btnOrbits = document.getElementById('btn-toggle-orbits');

  let orbitsVisible = true;
  if (btnPrev) {
    btnPrev.addEventListener('click', () => tourController.prevStop());
  }
  if (btnNext) {
    btnNext.addEventListener('click', () => tourController.nextStop());
  }
  if (btnOrbits) {
    btnOrbits.addEventListener('click', () => {
      orbitsVisible = !orbitsVisible;
      solarSystem.setOrbitsVisible(orbitsVisible);
      btnOrbits.classList.toggle('active', orbitsVisible);
    });
  }

  // Expose tour API on window for automated verification & debugging
  window.__SOLARIS_TOUR__ = {
    bodies: BODIES,
    scrollToStopIndex: (idx) => tourController.scrollToStopIndex(idx),
    getActiveStopIndex: () => tourController.getActiveStopIndex(),
    getProgress: () => tourController.getProgress()
  };

  // Hide loading overlay after initial frame setup
  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
  }, 250);

  // Main render loop
  let lastTime = performance.now();
  function animate(now) {
    requestAnimationFrame(animate);
    const dt = Math.min(0.1, (now - lastTime) / 1000);
    lastTime = now;

    environment.update(dt);
    solarSystem.update(dt);
    tourController.update(now, dt);

    composer.render();
  }

  requestAnimationFrame(animate);
}

window.addEventListener('DOMContentLoaded', initApp);
