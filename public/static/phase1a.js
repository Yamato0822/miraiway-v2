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
    const mobileDesignQuery = window.matchMedia('(max-width: 768px)');
    if (!viewport || !slides.length) return;

    let currentIndex = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartScroll = 0;
    let wheelTotal = 0;
    let wheelLocked = false;
    let autoPlayTimer = null;

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

    const stopAutoPlay = () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    };

    const startAutoPlay = () => {
      stopAutoPlay();
      if (prefersReducedMotion.matches || mobileDesignQuery.matches) return;
      autoPlayTimer = setInterval(() => {
        changeSlide(1);
      }, 5000);
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
      startAutoPlay();
    };

    const changeSlide = (direction) => goTo(currentIndex + direction);

    previousButton?.addEventListener('click', () => changeSlide(-1));
    nextButton?.addEventListener('click', () => changeSlide(1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => goTo(index)));
    slides.forEach((slide) => {
      slide.addEventListener('click', () => {
        if (!desktopQuery.matches) return;
        if (slide.classList.contains('is-prev')) changeSlide(-1);
        if (slide.classList.contains('is-next')) changeSlide(1);
      });
    });

    rail.addEventListener('mouseenter', stopAutoPlay);
    rail.addEventListener('mouseleave', startAutoPlay);
    rail.addEventListener('touchstart', stopAutoPlay, { passive: true });
    rail.addEventListener('touchend', startAutoPlay, { passive: true });

    startAutoPlay();

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
    mobileDesignQuery.addEventListener('change', () => {
      if (mobileDesignQuery.matches) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    });
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

      summary.addEventListener('click', (e) => {
        if (!item.open) return;
        e.preventDefault();
        item.removeAttribute('open');
      });
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

  /* ---------- FOOTER BACKGROUND & AURORA DYNAMIC INTERACTION ---------- */
  (function initFooterBackgroundInteraction() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    let mouseX = 50;
    let mouseY = 50;
    let targetScrollY = 0;
    let currentScrollY = 0;
    let targetGlowX = 0;
    let targetGlowY = 0;
    let currentGlowX = 0;
    let currentGlowY = 0;
    let rafId = null;

    const updateFooter = () => {
      currentGlowX += (targetGlowX - currentGlowX) * 0.08;
      currentGlowY += (targetGlowY - currentGlowY) * 0.08;
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;

      footer.style.setProperty('--footer-mouse-x', `${mouseX.toFixed(2)}%`);
      footer.style.setProperty('--footer-mouse-y', `${mouseY.toFixed(2)}%`);

      footer.style.setProperty('--footer-glow-x', `${currentGlowX.toFixed(2)}px`);
      footer.style.setProperty('--footer-glow-y', `${currentGlowY.toFixed(2)}px`);

      footer.style.setProperty('--footer-scroll-x', `${(currentScrollY * 0.12).toFixed(2)}px`);
      footer.style.setProperty('--footer-scroll-y', `${(currentScrollY * -0.18).toFixed(2)}px`);
      footer.style.setProperty('--footer-scroll-angle', `${(currentScrollY * 0.05).toFixed(2)}deg`);

      const glowDiffX = Math.abs(targetGlowX - currentGlowX);
      const glowDiffY = Math.abs(targetGlowY - currentGlowY);
      const scrollDiff = Math.abs(targetScrollY - currentScrollY);

      if (glowDiffX > 0.05 || glowDiffY > 0.05 || scrollDiff > 0.05) {
        rafId = requestAnimationFrame(updateFooter);
      } else {
        rafId = null;
      }
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateFooter);
      }
    };

    const handleScroll = () => {
      if (prefersReducedMotion.matches) return;
      const rect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight + 200 && rect.bottom > -200) {
        const scrollOffset = windowHeight - rect.top;
        targetScrollY = scrollOffset;
        scheduleUpdate();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    footer.addEventListener('mousemove', (e) => {
      if (prefersReducedMotion.matches) return;
      const rect = footer.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;

      mouseX = Math.max(0, Math.min(100, xPct));
      mouseY = Math.max(0, Math.min(100, yPct));

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      targetGlowX = (e.clientX - rect.left - centerX) * 0.15;
      targetGlowY = (e.clientY - rect.top - centerY) * 0.15;

      scheduleUpdate();
    });

    footer.addEventListener('mouseleave', () => {
      targetGlowX = 0;
      targetGlowY = 0;
      mouseX = 50;
      mouseY = 50;
      scheduleUpdate();
    });
  })();

  /* ---------- CONTACT CTA DYNAMIC INTERACTION ---------- */
  (function initCTAInteraction() {
    const cta = document.querySelector('.contact-cta');
    if (!cta) return;

    let mouseX = 30;
    let mouseY = 50;
    let targetScrollY = 0;
    let currentScrollY = 0;
    let targetGlowX = 0;
    let targetGlowY = 0;
    let currentGlowX = 0;
    let currentGlowY = 0;
    let rafId = null;

    const updateCTA = () => {
      currentGlowX += (targetGlowX - currentGlowX) * 0.08;
      currentGlowY += (targetGlowY - currentGlowY) * 0.08;
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;

      cta.style.setProperty('--cta-mouse-x', `${mouseX.toFixed(2)}%`);
      cta.style.setProperty('--cta-mouse-y', `${mouseY.toFixed(2)}%`);

      cta.style.setProperty('--cta-glow-x', `${currentGlowX.toFixed(2)}px`);
      cta.style.setProperty('--cta-glow-y', `${currentGlowY.toFixed(2)}px`);

      cta.style.setProperty('--cta-scroll-x', `${(currentScrollY * 0.14).toFixed(2)}px`);
      cta.style.setProperty('--cta-scroll-y', `${(currentScrollY * -0.16).toFixed(2)}px`);
      cta.style.setProperty('--cta-scroll-angle', `${(currentScrollY * 0.04).toFixed(2)}deg`);

      const glowDiffX = Math.abs(targetGlowX - currentGlowX);
      const glowDiffY = Math.abs(targetGlowY - currentGlowY);
      const scrollDiff = Math.abs(targetScrollY - currentScrollY);

      if (glowDiffX > 0.05 || glowDiffY > 0.05 || scrollDiff > 0.05) {
        rafId = requestAnimationFrame(updateCTA);
      } else {
        rafId = null;
      }
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateCTA);
      }
    };

    const handleScroll = () => {
      if (prefersReducedMotion.matches) return;
      const rect = cta.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight + 200 && rect.bottom > -200) {
        const scrollOffset = windowHeight - rect.top;
        targetScrollY = scrollOffset;
        scheduleUpdate();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    cta.addEventListener('mousemove', (e) => {
      if (prefersReducedMotion.matches) return;
      const rect = cta.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;

      mouseX = Math.max(0, Math.min(100, xPct));
      mouseY = Math.max(0, Math.min(100, yPct));

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      targetGlowX = (e.clientX - rect.left - centerX) * 0.18;
      targetGlowY = (e.clientY - rect.top - centerY) * 0.18;

      scheduleUpdate();
    });

    cta.addEventListener('mouseleave', () => {
      targetGlowX = 0;
      targetGlowY = 0;
      mouseX = 30;
      mouseY = 50;
      scheduleUpdate();
    });
  })();

  /* ---------- SERVICE CREATIVE DYNAMIC INTERACTION ---------- */
  (function initCreativeInteraction() {
    const item = document.querySelector('.service-showcase-item--creative');
    if (!item) return;
    const mobileDesignQuery = window.matchMedia('(max-width: 768px)');

    let mouseX = 70;
    let mouseY = 50;
    let targetScrollY = 0;
    let currentScrollY = 0;
    let targetGlowX = 0;
    let targetGlowY = 0;
    let currentGlowX = 0;
    let currentGlowY = 0;
    let rafId = null;
    let lastScrollPos = window.scrollY;
    let lastScrollTime = Date.now();
    let scrollVelocity = 0;

    const updateCreative = () => {
      currentGlowX += (targetGlowX - currentGlowX) * 0.08;
      currentGlowY += (targetGlowY - currentGlowY) * 0.08;
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      scrollVelocity *= 0.92;

      item.style.setProperty('--creative-mouse-x', `${mouseX.toFixed(2)}%`);
      item.style.setProperty('--creative-mouse-y', `${mouseY.toFixed(2)}%`);

      item.style.setProperty('--creative-glow-x', `${currentGlowX.toFixed(2)}px`);
      item.style.setProperty('--creative-glow-y', `${currentGlowY.toFixed(2)}px`);

      item.style.setProperty('--creative-scroll-x', `${(currentScrollY * 0.14).toFixed(2)}px`);
      item.style.setProperty('--creative-scroll-y', `${(currentScrollY * -0.16).toFixed(2)}px`);
      item.style.setProperty('--creative-scroll-angle', `${(currentScrollY * 0.04).toFixed(2)}deg`);
      item.style.setProperty('--creative-scroll-velocity', `${scrollVelocity.toFixed(2)}px`);

      item.style.setProperty('--creative-phone-rotate-y', `${(currentGlowX * 0.08).toFixed(2)}deg`);
      item.style.setProperty('--creative-phone-rotate-x', `${(currentGlowY * -0.08).toFixed(2)}deg`);

      const rect = item.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Viewport Center Sync: All reveals progress as user scrolls section to viewport center (user's screenshot position)
      // Triggers start at rect.top = 82% window height, and reach 100% completion exactly when section is fully centered at rect.top = 28% window height
      const startPoint = windowHeight * 0.82;
      const endPoint = windowHeight * 0.28;
      const centerSyncProgress = mobileDesignQuery.matches
        ? 1
        : Math.max(0, Math.min(1, (startPoint - rect.top) / (startPoint - endPoint)));

      item.style.setProperty('--creative-scroll-progress', centerSyncProgress.toFixed(3));
      item.style.setProperty('--creative-phone-flip-progress', centerSyncProgress.toFixed(3));
      item.style.setProperty('--creative-text-reveal-progress', centerSyncProgress.toFixed(3));
      item.style.setProperty('--creative-dissolve-opacity', centerSyncProgress.toFixed(3));

      const glowDiffX = Math.abs(targetGlowX - currentGlowX);
      const glowDiffY = Math.abs(targetGlowY - currentGlowY);
      const scrollDiff = Math.abs(targetScrollY - currentScrollY);

      if (glowDiffX > 0.05 || glowDiffY > 0.05 || scrollDiff > 0.05 || scrollVelocity > 0.1) {
        rafId = requestAnimationFrame(updateCreative);
      } else {
        rafId = null;
      }
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(updateCreative);
      }
    };

    const handleScroll = () => {
      if (prefersReducedMotion.matches) return;
      const rect = item.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const now = Date.now();
      const timeDiff = Math.max(16, now - lastScrollTime);
      const posDiff = Math.abs(window.scrollY - lastScrollPos);
      scrollVelocity = (posDiff / timeDiff) * 12;
      lastScrollPos = window.scrollY;
      lastScrollTime = now;

      if (rect.top < windowHeight + 200 && rect.bottom > -200) {
        const scrollOffset = windowHeight - rect.top;
        targetScrollY = scrollOffset;
        scheduleUpdate();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    item.addEventListener('mousemove', (e) => {
      if (prefersReducedMotion.matches) return;
      const rect = item.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;

      mouseX = Math.max(0, Math.min(100, xPct));
      mouseY = Math.max(0, Math.min(100, yPct));

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      targetGlowX = (e.clientX - rect.left - centerX) * 0.18;
      targetGlowY = (e.clientY - rect.top - centerY) * 0.18;

      scheduleUpdate();
    });

    const invertBox = item.querySelector('.interactive-invert-box');
    if (invertBox) {
      invertBox.addEventListener('mousemove', (e) => {
        const boxRect = invertBox.getBoundingClientRect();
        const lensX = e.clientX - boxRect.left;
        const lensY = e.clientY - boxRect.top;
        invertBox.style.setProperty('--text-lens-x', `${lensX.toFixed(1)}px`);
        invertBox.style.setProperty('--text-lens-y', `${lensY.toFixed(1)}px`);
      });
    }

    item.addEventListener('mouseleave', () => {
      targetGlowX = 0;
      targetGlowY = 0;
      mouseX = 70;
      mouseY = 50;
      scheduleUpdate();
    });
  })();

  /* ---------- CREATIVE PHONE VIDEO PLAYBACK RECOVERY ---------- */
  (function initCreativePhoneVideo() {
    const video = document.querySelector('.phone-video');
    const screen = video?.closest('.phone-screen');
    const control = screen?.querySelector('.phone-video-control');
    const status = screen?.querySelector('.phone-video-status');
    if (!video || !screen || !control) return;

    let isInView = false;
    let userPaused = false;

    video.muted = true;
    video.defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;

    const updateControl = (state) => {
      const isPlaying = state === 'playing';
      const needsAction = state === 'blocked' || state === 'error';
      const icon = control.querySelector('i');

      screen.classList.toggle('is-video-playing', isPlaying);
      screen.classList.toggle('is-video-paused', state === 'paused');
      screen.classList.toggle('needs-video-action', needsAction);
      control.setAttribute('aria-pressed', String(isPlaying));
      control.setAttribute('aria-label', isPlaying ? 'Creative動画を一時停止' : 'Creative動画を再生');
      if (icon) icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
      if (status) {
        status.textContent = isPlaying
          ? 'Creative動画を再生しています'
          : needsAction
            ? 'Creative動画は停止しています。再生ボタンで再生できます'
            : 'Creative動画を一時停止しています';
      }
    };

    const attemptPlay = () => {
      if (!isInView || userPaused || document.visibilityState === 'hidden') return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise
          .then(() => updateControl('playing'))
          .catch(() => updateControl('blocked'));
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isInView = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        if (isInView) attemptPlay();
      });
    }, { threshold: [0, 0.2, 0.55] });

    observer.observe(screen);

    video.addEventListener('playing', () => updateControl('playing'));
    video.addEventListener('pause', () => updateControl(userPaused ? 'paused' : 'blocked'));
    video.addEventListener('canplay', attemptPlay);
    video.addEventListener('error', () => updateControl('error'));

    control.addEventListener('click', () => {
      if (video.paused) {
        userPaused = false;
        attemptPlay();
      } else {
        userPaused = true;
        video.pause();
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') attemptPlay();
    });
    window.addEventListener('pageshow', attemptPlay);

    updateControl(video.paused ? 'blocked' : 'playing');
  })();

  /* ---------- FOOTER WORDMARK SCROLL-DRIVEN REALTIME SYNC ---------- */
  (function initWordmarkScrollSync() {
    const wordmark = document.querySelector('.footer-wordmark');
    const footer = document.getElementById('site-footer') || document.querySelector('.footer-shell');
    if (!wordmark || !footer) return;

    if (prefersReducedMotion.matches) {
      wordmark.style.opacity = '0.72';
      wordmark.style.transform = 'none';
      wordmark.style.filter = 'none';
      return;
    }

    let ticking = false;
    function updateWordmarkOnScroll() {
      const rect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // フッターが画面下端に入ってから、画面中央〜底に現れるまでの進行率 (0.0 ～ 1.0)
      const startThreshold = windowHeight;
      const endThreshold = windowHeight * 0.15;
      const rawProgress = (startThreshold - rect.top) / (startThreshold - endThreshold);
      const progress = Math.min(1, Math.max(0, rawProgress));

      // スクロール量と完全1:1連動して変形・不透明度・ボカシ・字間をリアルタイム計算
      const opacity = progress * 0.72;
      const translateY = (1 - progress) * 56;
      const scale = 0.92 + progress * 0.08;
      const blur = (1 - progress) * 12;
      const letterSpacing = -0.055 + progress * 0.03;

      wordmark.style.opacity = opacity.toFixed(3);
      wordmark.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      wordmark.style.filter = `blur(${blur.toFixed(1)}px)`;
      wordmark.style.letterSpacing = `${letterSpacing.toFixed(3)}em`;

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateWordmarkOnScroll);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateWordmarkOnScroll();
  })();

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
