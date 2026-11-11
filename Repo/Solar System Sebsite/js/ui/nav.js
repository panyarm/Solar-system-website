import { BODIES } from '../data/bodies.js';

export function createTourNavController({ onSelectStopIndex }) {
  const listEl = document.getElementById('tour-nav-list');
  const barEl = document.getElementById('tour-nav-bar');
  const promptEl = document.getElementById('scroll-prompt');

  const itemEls = [];

  BODIES.forEach((body, index) => {
    const li = document.createElement('li');
    li.className = `tour-nav-item ${body.type === 'moon' ? 'is-moon' : 'is-primary'}`;
    li.title = `Jump to ${body.name} (${body.badge})`;

    const label = document.createElement('span');
    label.className = 'tour-nav-label';
    label.textContent = body.type === 'moon' ? `· ${body.name}` : body.name;

    const dot = document.createElement('span');
    dot.className = 'tour-nav-dot';

    li.appendChild(label);
    li.appendChild(dot);

    li.addEventListener('click', () => {
      onSelectStopIndex(index);
    });

    listEl.appendChild(li);
    itemEls.push(li);
  });

  function setActiveIndex(activeIndex) {
    itemEls.forEach((el, idx) => {
      el.classList.toggle('active', idx === activeIndex);
    });
  }

  function setProgress(progress) {
    const pct = Math.max(0, Math.min(100, progress * 100));
    barEl.style.height = `${pct.toFixed(1)}%`;

    if (promptEl) {
      promptEl.classList.toggle('dimmed', progress > 0.025);
    }
  }

  return {
    setActiveIndex,
    setProgress
  };
}
