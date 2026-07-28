/* MiraiWay Phase 1A — focused accessible interactions */
(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- ABOUT activity rail ---------- */
  document.querySelectorAll('[data-activity-rail]').forEach((rail) => {
    const viewport = rail.querySelector('[data-rail-viewport]');
    const previousButton = rail.querySelector('[data-rail-prev]');
    const nextButton = rail.querySelector('[data-rail-next]');
    const slides = Array.from(viewport?.querySelectorAll('.activity-card') || []);
    const dots = Array.from(rail.querySelectorAll('[data-rail-dot]'));
    const status = rail.querySelector('[data-rail-status]');
    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    if (!viewport || !previousButton || !nextButton || !slides.length) return;

    let currentIndex = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let wheelTotal = 0;
    let wheelLocked = false;

    const wrapIndex = (index) => (index + slides.length) % slides.length;

    const updateIndicators = () => {
      dots.forEach((dot, index) => {
        const isCurrent = index === currentIndex;
        dot.classList.toggle('is-active', isCurrent);
        dot.setAttribute('aria-current', isCurrent ? 'true' : 'false');
      });
      if (status) status.textContent = `活動${currentIndex + 1} / ${slides.length}`;
    };

    const renderDesktop = () => {
      const previousIndex = wrapIndex(currentIndex - 1);
      const nextIndex = wrapIndex(currentIndex + 1);
      slides.forEach((slide, index) => {
        slide.classList.toggle('is-active', index === currentIndex);
        slide.classList.toggle('is-prev', index === previousIndex);
        slide.classList.toggle('is-next', index === nextIndex);
        const isVisible = index === currentIndex || index === previousIndex || index === nextIndex;
        slide.setAttribute('aria-hidden', String(!isVisible));
      });
      updateIndicators();
    };

    const getMobileStep = () => {
      const card = slides[0];
      const styles = window.getComputedStyle(viewport);
      const gap = parseFloat(styles.columnGap || styles.gap || '0');
      return card.getBoundingClientRect().width + gap;
    };

    const goTo = (index, shouldFocus = false) => {
      currentIndex = wrapIndex(index);
      if (desktopQuery.matches) {
        renderDesktop();
      } else {
        slides.forEach((slide) => slide.setAttribute('aria-hidden', 'false'));
        viewport.scrollTo({
          left: getMobileStep() * currentIndex,
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });
        updateIndicators();
      }
      if (shouldFocus) viewport.focus({ preventScroll: true });
    };

    const changeSlide = (direction) => goTo(currentIndex + direction);

    previousButton.addEventListener('click', () => changeSlide(-1));
    nextButton.addEventListener('click', () => changeSlide(1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => goTo(index)));
    slides.forEach((slide) => {
      slide.addEventListener('click', () => {
        if (!desktopQuery.matches) return;
        if (slide.classList.contains('is-prev')) changeSlide(-1);
        if (slide.classList.contains('is-next')) changeSlide(1);
      });
    });

    viewport.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        changeSlide(-1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        changeSlide(1);
      }
      if (event.key === 'Home') {
        event.preventDefault();
        goTo(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        goTo(slides.length - 1);
      }
    });

    viewport.querySelectorAll('img').forEach((image) => image.setAttribute('draggable', 'false'));

    viewport.addEventListener('mousedown', (event) => {
      if (event.button !== 0) return;
      event.preventDefault();
      isDragging = true;
      dragStartX = event.clientX;
      dragStartScroll = viewport.scrollLeft;
      viewport.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (event) => {
      if (!isDragging) return;
      if (!desktopQuery.matches) {
        viewport.scrollLeft = dragStartScroll - (event.clientX - dragStartX);
      }
    });

    const endDrag = (event) => {
      if (!isDragging) return;
      const distance = event.clientX - dragStartX;
      isDragging = false;
      viewport.classList.remove('is-dragging');
      if (desktopQuery.matches && Math.abs(distance) >= 48) {
        changeSlide(distance < 0 ? 1 : -1);
      }
    };

    window.addEventListener('mouseup', endDrag);

    viewport.addEventListener('wheel', (event) => {
      if (!desktopQuery.matches || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      event.preventDefault();
      if (wheelLocked) return;
      wheelTotal += event.deltaX;
      if (Math.abs(wheelTotal) < 36) return;
      changeSlide(wheelTotal > 0 ? 1 : -1);
      wheelTotal = 0;
      wheelLocked = true;
      window.setTimeout(() => {
        wheelLocked = false;
      }, 360);
    }, { passive: false });

    let mobileScrollFrame = 0;
    viewport.addEventListener('scroll', () => {
      if (desktopQuery.matches || mobileScrollFrame) return;
      mobileScrollFrame = window.requestAnimationFrame(() => {
        mobileScrollFrame = 0;
        const step = getMobileStep();
        currentIndex = Math.max(0, Math.min(slides.length - 1, Math.round(viewport.scrollLeft / step)));
        updateIndicators();
      });
    }, { passive: true });

    const syncMode = () => {
      rail.classList.add('is-carousel-ready');
      if (desktopQuery.matches) {
        viewport.scrollLeft = 0;
        renderDesktop();
      } else {
        slides.forEach((slide) => {
          slide.classList.remove('is-active', 'is-prev', 'is-next');
          slide.setAttribute('aria-hidden', 'false');
        });
        viewport.scrollLeft = getMobileStep() * currentIndex;
        updateIndicators();
      }
    };

    desktopQuery.addEventListener('change', syncMode);
    syncMode();
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
