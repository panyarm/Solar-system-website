import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { BODIES } from '../data/bodies.js';
import { evaluateTourProgress } from './path.js';

gsap.registerPlugin(ScrollTrigger);

export function createTourController({
  camera,
  canvas,
  getBodyWorldPosition,
  onBodyChange,
  onProgressUpdate
}) {
  // Initialize Lenis for silky-smooth wheel & touch scrolling
  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5
  });

  lenis.on('scroll', ScrollTrigger.update);

  let currentProgress = 0;
  let activeStopIndex = -1;

  // Interactive user drag-orbit offset around the currently viewed body
  const userOrbit = { yaw: 0, pitch: 0 };
  const targetOrbit = { yaw: 0, pitch: 0 };
  let isDragging = false;
  let lastPointer = { x: 0, y: 0 };

  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true;
    lastPointer = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPointer.x;
    const dy = e.clientY - lastPointer.y;
    lastPointer = { x: e.clientX, y: e.clientY };

    targetOrbit.yaw -= dx * 0.0045;
    targetOrbit.pitch = Math.max(-0.95, Math.min(0.95, targetOrbit.pitch + dy * 0.004));
  });

  window.addEventListener('pointerup', () => {
    isDragging = false;
  });

  // ScrollTrigger across #scroll-track
  const stopCount = BODIES.length;
  const maxIndex = stopCount - 1;

  ScrollTrigger.create({
    trigger: '#scroll-track',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.5,
    onUpdate: (self) => {
      currentProgress = self.progress;
      if (onProgressUpdate) {
        onProgressUpdate(currentProgress);
      }
    }
  });

  const smoothedCamPos = new THREE.Vector3();
  const smoothedLookAt = new THREE.Vector3();
  let initializedCamera = false;

  function scrollToStopIndex(index) {
    const clampedIdx = Math.max(0, Math.min(maxIndex, index));
    const targetProgress = clampedIdx / maxIndex;
    const trackEl = document.getElementById('scroll-track');
    const maxScroll = Math.max(1, trackEl.offsetHeight - window.innerHeight);
    const targetScrollY = targetProgress * maxScroll;

    // Reset manual orbit offset when flying to a new celestial body
    targetOrbit.yaw = 0;
    targetOrbit.pitch = 0;

    lenis.scrollTo(targetScrollY, {
      duration: 1.45,
      easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    });
  }

  function nextStop() {
    scrollToStopIndex(activeStopIndex + 1);
  }

  function prevStop() {
    scrollToStopIndex(activeStopIndex - 1);
  }

  // Keyboard shortcuts (Down/Right -> Next, Up/Left -> Prev)
  window.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowRight', 'PageDown'].includes(e.key)) {
      e.preventDefault();
      nextStop();
    } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      prevStop();
    }
  });

  function update(timeMs, dt) {
    lenis.raf(timeMs);

    // Smoothly damp manual orbit offset
    userOrbit.yaw += (targetOrbit.yaw - userOrbit.yaw) * Math.min(1, dt * 8);
    userOrbit.pitch += (targetOrbit.pitch - userOrbit.pitch) * Math.min(1, dt * 8);

    const state = evaluateTourProgress(
      currentProgress,
      getBodyWorldPosition,
      userOrbit
    );

    if (!initializedCamera) {
      smoothedCamPos.copy(state.camPos);
      smoothedLookAt.copy(state.lookAt);
      initializedCamera = true;
    } else {
      const damp = Math.min(1, dt * 9.5);
      smoothedCamPos.lerp(state.camPos, damp);
      smoothedLookAt.lerp(state.lookAt, damp);
    }

    camera.position.copy(smoothedCamPos);
    camera.lookAt(smoothedLookAt);

    if (state.activeIndex !== activeStopIndex) {
      activeStopIndex = state.activeIndex;
      // Gently decay manual orbit when switching stops via scroll
      targetOrbit.yaw *= 0.25;
      targetOrbit.pitch *= 0.25;

      if (onBodyChange) {
        onBodyChange(state.activeBody, state.activeIndex);
      }
    }

    return state;
  }

  return {
    lenis,
    update,
    scrollToStopIndex,
    nextStop,
    prevStop,
    getActiveStopIndex: () => activeStopIndex,
    getProgress: () => currentProgress
  };
}
