/* ABOUT v4 — continuous scene flow + depth-based slide transitions. */
(function () {
  'use strict';

  const section = document.getElementById('about-section');
  const rail = document.querySelector('[data-activity-rail]');
  if (!section || !rail) return;

  const cards = Array.from(rail.querySelectorAll('.activity-card'));
  const currentNode = rail.querySelector('[data-activity-current]');
  const kickerNode = rail.querySelector('[data-activity-kicker]');
  const titleNode = rail.querySelector('[data-activity-title]');
  const detailCopy = rail.querySelector('[data-activity-detail-copy]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!cards.length) return;

  let lastIndex = -1;
  let depthTimer = 0;
  let settleTimer = 0;
  let frame = 0;

  const readCard = (card) => {
    const index = Math.max(0, cards.indexOf(card));
    const kicker = card.querySelector('.marquee-badge')?.textContent?.trim() || '';
    const title = card.querySelector('.marquee-card-title')?.textContent?.trim() || '';
    return { index, kicker, title };
  };

  const updateCaption = (active) => {
    if (!active) return;
    const data = readCard(active);
    if (data.index === lastIndex) return;

    lastIndex = data.index;
    if (currentNode) currentNode.textContent = String(data.index + 1).padStart(2, '0');
    if (kickerNode) kickerNode.textContent = data.kicker;
    if (titleNode) titleNode.textContent = data.title;

    if (!reducedMotion.matches) {
      window.clearTimeout(depthTimer);
      window.clearTimeout(settleTimer);
      rail.classList.remove('is-depth-settled');
      rail.classList.add('is-depth-transitioning');

      depthTimer = window.setTimeout(() => {
        rail.classList.remove('is-depth-transitioning');
        rail.classList.add('is-depth-settled');
      }, 170);

      settleTimer = window.setTimeout(() => {
        rail.classList.remove('is-depth-settled');
      }, 920);

      if (detailCopy?.animate) {
        detailCopy.animate(
          [
            { opacity: 0.18, filter: 'blur(4px)', transform: 'translate3d(0, 7px, 0)' },
            { opacity: 1, filter: 'blur(0)', transform: 'translate3d(0, 0, 0)' }
          ],
          { duration: 560, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
        );
      }
    }
  };

  const cardObserver = new MutationObserver(() => {
    const active = rail.querySelector('.activity-card.is-active') || cards[0];
    updateCaption(active);
  });

  cards.forEach((card) => {
    cardObserver.observe(card, { attributes: true, attributeFilter: ['class'] });
  });

  updateCaption(rail.querySelector('.activity-card.is-active') || cards[0]);

  const updateFlow = () => {
    frame = 0;
    if (reducedMotion.matches) {
      section.style.setProperty('--about-flow', '1');
      return;
    }

    const rect = section.getBoundingClientRect();
    const viewport = window.innerHeight;
    const start = viewport * 0.58;
    const travel = Math.max(viewport * 0.72, 520);
    const raw = (start - rect.top) / travel;
    const progress = Math.max(0, Math.min(1, raw));
    const eased = progress * progress * progress * (progress * (progress * 6 - 15) + 10);
    section.style.setProperty('--about-flow', eased.toFixed(4));
  };

  const scheduleFlow = () => {
    if (!frame) frame = window.requestAnimationFrame(updateFlow);
  };

  window.addEventListener('scroll', scheduleFlow, { passive: true });
  window.addEventListener('resize', scheduleFlow, { passive: true });
  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', scheduleFlow);
  }
  scheduleFlow();
})();
