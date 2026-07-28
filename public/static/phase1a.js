/* MiraiWay Phase 1A — focused accessible interactions */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- ABOUT activity rail ---------- */
  document.querySelectorAll('[data-activity-rail]').forEach((rail) => {
    const viewport = rail.querySelector('[data-rail-viewport]');
    const previousButton = rail.querySelector('[data-rail-prev]');
    const nextButton = rail.querySelector('[data-rail-next]');
    if (!viewport || !previousButton || !nextButton) return;

    const getStep = () => {
      const card = viewport.querySelector('.activity-card');
      if (!card) return viewport.clientWidth * 0.8;
      const styles = window.getComputedStyle(viewport);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      return card.getBoundingClientRect().width + gap;
    };

    const scrollRail = (direction) => {
      viewport.scrollBy({
        left: getStep() * direction,
        behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
      });
    };

    const updateControls = () => {
      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      previousButton.disabled = viewport.scrollLeft <= 2;
      nextButton.disabled = viewport.scrollLeft >= maxScroll - 2;
    };

    previousButton.addEventListener('click', () => scrollRail(-1));
    nextButton.addEventListener('click', () => scrollRail(1));
    viewport.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollRail(-1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollRail(1);
      }
      if (event.key === 'Home') {
        event.preventDefault();
        viewport.scrollTo({ left: 0, behavior: prefersReducedMotion.matches ? 'auto' : 'smooth' });
      }
      if (event.key === 'End') {
        event.preventDefault();
        viewport.scrollTo({
          left: viewport.scrollWidth,
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });
      }
    });

    let isDragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;

    viewport.addEventListener('pointerdown', (event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      isDragging = true;
      dragStartX = event.clientX;
      dragStartScroll = viewport.scrollLeft;
      viewport.classList.add('is-dragging');
      viewport.setPointerCapture(event.pointerId);
    });

    viewport.addEventListener('pointermove', (event) => {
      if (!isDragging) return;
      viewport.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
    });

    const endDrag = (event) => {
      if (!isDragging) return;
      isDragging = false;
      viewport.classList.remove('is-dragging');
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
    };

    viewport.addEventListener('pointerup', endDrag);
    viewport.addEventListener('pointercancel', endDrag);
    viewport.addEventListener('scroll', updateControls, { passive: true });
    window.addEventListener('resize', updateControls, { passive: true });
    updateControls();
  });

  /* ---------- FAQ category + accordion ---------- */
  const faqButtons = Array.from(document.querySelectorAll('.faq-category-button'));
  const faqItems = Array.from(document.querySelectorAll('.faq-accordion__item'));

  if (faqButtons.length && faqItems.length) {
    const activateCategory = (category) => {
      faqButtons.forEach((button) => {
        const isActive = button.dataset.category === category;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });

      faqItems.forEach((item) => {
        item.hidden = category !== 'all' && item.dataset.category !== category;
      });
    };

    faqButtons.forEach((button, index) => {
      button.addEventListener('click', () => activateCategory(button.dataset.category || 'all'));
      button.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let nextIndex = index;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + faqButtons.length) % faqButtons.length;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % faqButtons.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = faqButtons.length - 1;
        faqButtons[nextIndex].focus();
      });
    });

    faqItems.forEach((item) => {
      const summary = item.querySelector('summary');
      if (!summary) return;
      const syncExpandedState = () => summary.setAttribute('aria-expanded', String(item.open));
      item.addEventListener('toggle', syncExpandedState);
      syncExpandedState();
    });

    const revealHashTarget = () => {
      if (!window.location.hash) return;
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      const target = document.getElementById(targetId);
      if (!target || !target.classList.contains('faq-accordion__item')) return;
      activateCategory('all');
      target.open = true;
      window.setTimeout(() => {
        target.scrollIntoView({
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth',
          block: 'center'
        });
        const summary = target.querySelector('summary');
        if (summary) summary.focus({ preventScroll: true });
      }, 520);
    };

    revealHashTarget();
    window.addEventListener('hashchange', revealHashTarget);
  }

  /* ---------- Small global keyboard refinements ---------- */
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const mobileNav = document.getElementById('mobile-nav');
    const menuToggle = document.getElementById('menu-toggle');
    if (!mobileNav || !menuToggle || !mobileNav.classList.contains('open')) return;
    mobileNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'メニューを開く');
    const icon = menuToggle.querySelector('i');
    if (icon) icon.className = 'fas fa-bars';
    menuToggle.focus();
  });
})();
