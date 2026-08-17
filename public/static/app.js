/* MiraiWay — frontend interactions */
(function () {
  'use strict';

  if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  try {
    window.scrollTo(0, 0);
  } catch (_) {}
  window.addEventListener('beforeunload', () => { try { window.scrollTo(0, 0); } catch (_) {} });
  window.addEventListener('pageshow', () => { try { window.scrollTo(0, 0); } catch (_) {} });

  /* Helper: Debounce */
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const pageLoader = document.getElementById('page-loader');
  const loaderReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const loaderStartedAt = performance.now();
  let loaderHasOpened = false;
  let loaderOpenTimer = null;
  
  function hidePageLoader() {
    if (loaderHasOpened) return;
    loaderHasOpened = true;

    if (pageLoader) {
      pageLoader.classList.remove('is-closing');
      pageLoader.classList.add('is-complete');
    }

    const progressSettleDuration = loaderReducedMotion.matches ? 0 : 120;
    setTimeout(() => {
      if (pageLoader) pageLoader.classList.add('is-loaded');
      document.body.classList.remove('is-loading');
      document.body.classList.add('intro-revealed');

      // Trigger animated marker line drawing
      const markerWrap = document.querySelector('.animated-marker-wrap');
      if (markerWrap) {
        setTimeout(() => markerWrap.classList.add('is-drawing'), 250);
      }
    }, progressSettleDuration);

    const openingDuration = loaderReducedMotion.matches ? 200 : 1040;
    setTimeout(() => {
      if (pageLoader) pageLoader.style.display = 'none';
      if (window.realMapLibreInstance) {
        window.realMapLibreInstance.resize();
      }
    }, openingDuration);
  }

  function schedulePageLoaderOpen(delay = 0) {
    if (loaderHasOpened || loaderOpenTimer) return;
    const minimumVisibleDuration = loaderReducedMotion.matches ? 80 : 620;
    const elapsed = performance.now() - loaderStartedAt;
    loaderOpenTimer = setTimeout(
      hidePageLoader,
      Math.max(delay, minimumVisibleDuration - elapsed)
    );
  }

  if (document.readyState === 'complete') {
    schedulePageLoaderOpen(80);
  } else {
    window.addEventListener('load', () => schedulePageLoaderOpen(80), { once: true });
    setTimeout(() => schedulePageLoaderOpen(), 1000);
  }

  /* ---------- Smooth Page Transitions ---------- */
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Skip if anchor link on same page or external
      if (!href || href.startsWith('/#') || href.startsWith('#') || link.target === '_blank') return;
      
      const targetUrl = new URL(link.href, window.location.href);
      if (targetUrl.pathname !== window.location.pathname) {
        e.preventDefault();
        if (pageLoader) {
          pageLoader.style.display = 'flex';
          pageLoader.classList.add('is-complete', 'is-closing');
          pageLoader.getBoundingClientRect();
          requestAnimationFrame(() => {
            pageLoader.classList.remove('is-loaded');
            document.body.classList.add('is-loading');
          });
        }
        const closingDuration = loaderReducedMotion.matches ? 160 : 550;
        setTimeout(() => {
          window.location.href = href;
        }, closingDuration);
      }
    });
  });

  /* ---------- Header scroll compact shadow ---------- */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const isOpen = mobileNav.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fas fa-xmark' : 'fas fa-bars';
      }
      if (isOpen && window.matchMedia('(max-width: 768px)').matches) {
        const firstLink = mobileNav.querySelector('a');
        if (firstLink) window.requestAnimationFrame(() => firstLink.focus());
      }
    });
    mobileNav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'メニューを開く');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      })
    );
  }

  /* ---------- Scroll reveal ---------- */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.05 }
  );
  document.querySelectorAll('.reveal, .reveal-glow').forEach((el) => observer.observe(el));

  /* ---------- Canvas 3D Typography Globe Engine (Refined Transition: Eclipse Corona + Stardust Dissolve + Arc Pulse) ---------- */
  const canvas = document.getElementById('typography-globe-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    const compactGlobe = window.innerWidth <= 900;
    const dpr = Math.min(window.devicePixelRatio || 1, compactGlobe ? 1 : 1.25);
    const logicalWidth = 1000;
    const logicalHeight = 1000;
    
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    ctx.scale(dpr, dpr);
    
    const globeRadius = 380;
    const centerX = 500;
    const centerY = 500;
    
    let baseTiltX = -0.28; 
    let baseTiltZ = -0.12;
    let targetTiltX = baseTiltX;
    let targetTiltZ = baseTiltZ;
    let currentTiltX = baseTiltX;
    let currentTiltZ = baseTiltZ;
    let tiltCosX = Math.cos(currentTiltX);
    let tiltSinX = Math.sin(currentTiltX);
    let tiltCosZ = Math.cos(currentTiltZ);
    let tiltSinZ = Math.sin(currentTiltZ);

    const globeReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!globeReducedMotion.matches) {
      window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        targetTiltZ = baseTiltZ + (x * 0.08);
        targetTiltX = baseTiltX + (y * 0.08);
      }, { passive: true });
    }
    const fontFamily = "'Outfit', 'Noto Sans JP', sans-serif";
    const cosmicTypeColors = ['#b9d7ff', '#8fbaff', '#6fa2ff', '#4f86f7'];
    
    const bands = [
      { text: "MiraiWay · Opportunity · Growth · ", lat: 1.35, fontSize: 16, color: "#98BCDE", speed: 0.0015, weight: 500 },
      { text: "Sri Lanka · Japan · Connection · Education · Future · ", lat: 1.15, fontSize: 20, color: "#7BA3CD", speed: 0.002, weight: 500 },
      { text: "Global Talent · Support · Career Growth · Learning · Community · ", lat: 0.9, fontSize: 25, color: "#5482B0", speed: 0.0025, weight: 600 },
      { text: "Education · Future · MiraiWay · Support · Learning · ", lat: 0.65, fontSize: 30, color: "#306191", speed: 0.003, weight: 600 },
      { text: "Sri Lanka · Opportunity · Trust · Support · ", lat: 0.35, fontSize: 40, color: "#184675", speed: 0.0022, weight: 700 },
      { text: "MiraiWay · Education · Sri Lanka · ", lat: 0.05, fontSize: 86, color: "#0A1F36", speed: 0.0035, weight: 800 }, 
      { text: "Japan Connection Future · Trust · Opportunity · ", lat: -0.28, fontSize: 60, color: "#102E4E", speed: 0.003, weight: 750 },
      { text: "Opportunity · Talent · Growth · Career · Community · ", lat: -0.6, fontSize: 40, color: "#184675", speed: 0.0025, weight: 700 },
      { text: "Building Bridges · Empowering People · Vision · Success · ", lat: -0.85, fontSize: 30, color: "#306191", speed: 0.002, weight: 600 },
      { text: "Sri Lanka · Japan · Connection · Learning · Future · Way · ", lat: -1.08, fontSize: 24, color: "#5482B0", speed: 0.0025, weight: 600 },
      { text: "MiraiWay · Creating Opportunities · Bright Tomorrow · ", lat: -1.28, fontSize: 18, color: "#7BA3CD", speed: 0.002, weight: 500 },
      { text: "Global Bridge · Mutual Trust · Learning · ", lat: -1.45, fontSize: 15, color: "#98BCDE", speed: 0.0015, weight: 500 },
    ];
    
    let points = [];
    let angleOffsetBase = 0;
    
    bands.forEach((band, bandIndex) => {
      ctx.font = `${band.weight} ${band.fontSize}px ${fontFamily}`;
      let str = band.text.repeat(8); 
      let y = Math.sin(band.lat) * globeRadius;
      let r = Math.cos(band.lat) * globeRadius;
      let currentX = 0;
      let tracking = band.fontSize * 0.12; 
      angleOffsetBase += 1.34; 
      
      for (let i = 0; i < str.length; i++) {
        let char = str[i];
        let charWidth = ctx.measureText(char).width;
        let charCenter = currentX + charWidth / 2;
        let angle = (charCenter / r) + angleOffsetBase;
        
        if ((charCenter / r) > Math.PI * 2) break;
        
        const angleRad = angle;
        const dirX = Math.cos(band.lat) * Math.cos(angleRad);
        const dirY = Math.sin(band.lat);
        const dirZ = Math.cos(band.lat) * Math.sin(angleRad);

        const baseColorInt = Number.parseInt(band.color.slice(1), 16);
        const cosmicColor = cosmicTypeColors[bandIndex % cosmicTypeColors.length];
        const cosmicColorInt = Number.parseInt(cosmicColor.slice(1), 16);

        points.push({
          char: char,
          angle: angle,
          baseY: y,
          baseR: r,
          lat: band.lat,
          fontSize: band.fontSize,
          color: band.color,
          baseRgb: [(baseColorInt >> 16) & 255, (baseColorInt >> 8) & 255, baseColorInt & 255],
          cosmicRgb: [(cosmicColorInt >> 16) & 255, (cosmicColorInt >> 8) & 255, cosmicColorInt & 255],
          weight: band.weight,
          speed: band.speed,
          bandIndex,
          revealDelay: Math.abs(band.lat) * 390,
          dirX, dirY, dirZ
        });
        currentX += charWidth + tracking;
      }
    });

    // Reuse projection records every frame. This avoids creating and
    // collecting thousands of short-lived objects while the planet rotates.
    const projectionItems = points.map((point) => ({
      point,
      p3d: { x: 0, y: 0, z: 0 },
      tangent: { x: 0, y: 0, z: 0 },
      up: { x: 0, y: 0, z: 0 },
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
      Tx: 0,
      Ty: 0,
      Ux: 0,
      Uy: 0,
      fontSize: point.fontSize,
      color: point.color,
      baseRgb: point.baseRgb,
      cosmicRgb: point.cosmicRgb,
      bandIndex: point.bandIndex,
      weight: point.weight,
      isBack: false,
      reveal: 1
    }));
    const renderList = projectionItems.slice();

    let time = 0;
    let isGlobeVisible = false;
    let revealStartedAt = null;
    let firstFrameRendered = false;
    let targetDisperseProgress = 0;
    let currentDisperseProgress = 0;
    let previousGlobeFrame = null;
    let lastGlobeRenderAt = 0;
    let canvasHasContent = false;
    const globeFrameInterval = globeReducedMotion.matches ? 1000 / 20 : (compactGlobe ? 1000 / 45 : 0);
    const globeElement = canvas.closest('.typography-globe');
    const hasIntegratedJourney = Boolean(document.getElementById('hero-journey-section'));

    // Canvas fillText + shadowBlur is exceptionally expensive when repeated
    // hundreds of times per frame. Rasterize each unique glyph/color once and
    // reuse the bitmap while preserving the same 3D transforms and colors.
    const glyphSpriteCache = new Map();
    const glyphMeasureCanvas = document.createElement('canvas');
    const glyphMeasureCtx = glyphMeasureCanvas.getContext('2d');
    const glyphDpr = Math.min(dpr, 1.5);
    const globeGlowCanvas = document.createElement('canvas');
    globeGlowCanvas.width = 512;
    globeGlowCanvas.height = 512;
    const globeGlowCtx = globeGlowCanvas.getContext('2d', { alpha: true });
    const globeGlowGradient = globeGlowCtx.createRadialGradient(256, 256, 8, 256, 256, 250);
    globeGlowGradient.addColorStop(0, 'rgba(116, 166, 255, 0.32)');
    globeGlowGradient.addColorStop(0.36, 'rgba(74, 126, 238, 0.2)');
    globeGlowGradient.addColorStop(0.68, 'rgba(31, 67, 154, 0.08)');
    globeGlowGradient.addColorStop(1, 'rgba(10, 26, 70, 0)');
    globeGlowCtx.fillStyle = globeGlowGradient;
    globeGlowCtx.fillRect(0, 0, 512, 512);

    function getGlyphSprite(point, variant) {
      const cacheKey = `${point.bandIndex}:${point.char}:${variant}`;
      const cached = glyphSpriteCache.get(cacheKey);
      if (cached) return cached;

      const rgb = variant === 'base' ? point.baseRgb : point.cosmicRgb;
      const color = `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`;
      const font = `${point.weight} ${point.fontSize}px ${fontFamily}`;
      glyphMeasureCtx.font = font;
      const metrics = glyphMeasureCtx.measureText(point.char);
      const glyphWidth = Math.max(2, Math.ceil(metrics.width));
      const padding = Math.ceil(point.fontSize * 0.16 + 3);
      const logicalSpriteWidth = glyphWidth + padding * 2;
      const logicalSpriteHeight = Math.ceil(point.fontSize * 1.55) + padding * 2;
      const spriteCanvas = document.createElement('canvas');
      spriteCanvas.width = Math.ceil(logicalSpriteWidth * glyphDpr);
      spriteCanvas.height = Math.ceil(logicalSpriteHeight * glyphDpr);
      const spriteCtx = spriteCanvas.getContext('2d', { alpha: true });
      spriteCtx.scale(glyphDpr, glyphDpr);
      spriteCtx.font = font;
      spriteCtx.fillStyle = color;
      spriteCtx.textAlign = 'center';
      spriteCtx.textBaseline = 'middle';
      spriteCtx.fillText(point.char, logicalSpriteWidth / 2, logicalSpriteHeight / 2);

      const sprite = {
        canvas: spriteCanvas,
        width: logicalSpriteWidth,
        height: logicalSpriteHeight
      };
      glyphSpriteCache.set(cacheKey, sprite);
      return sprite;
    }

    // Rebuild lazily once the web font has finished loading so cached glyphs
    // never remain in the fallback font.
    document.fonts?.ready.then(() => glyphSpriteCache.clear()).catch(() => {});

    window.addEventListener('scroll', () => {
      if (hasIntegratedJourney) return;
      const scrollY = window.scrollY;
      const triggerHeight = window.innerHeight * 0.48;
      targetDisperseProgress = Math.max(0, Math.min(1, scrollY / triggerHeight));
    }, { passive: true });

    function applyTilt(x, y, z, target) {
      const y1 = y * tiltCosX - z * tiltSinX;
      const z1 = y * tiltSinX + z * tiltCosX;
      target.x = x * tiltCosZ - y1 * tiltSinZ;
      target.y = x * tiltSinZ + y1 * tiltCosZ;
      target.z = z1;
      return target;
    }

    function smoothstep(min, max, val) {
      const t = Math.max(0, Math.min(1, (val - min) / (max - min)));
      return t * t * (3 - 2 * t);
    }

    function renderGlobe(timestamp = performance.now()) {
      if (!isGlobeVisible) return;

      if (globeFrameInterval > 0 && lastGlobeRenderAt && timestamp - lastGlobeRenderAt < globeFrameInterval) {
        requestAnimationFrame(renderGlobe);
        return;
      }
      lastGlobeRenderAt = timestamp;

      const globeDelta = previousGlobeFrame === null
        ? 1 / 60
        : Math.min(0.05, Math.max(0.001, (timestamp - previousGlobeFrame) / 1000));
      previousGlobeFrame = timestamp;

      if (revealStartedAt === null) {
        revealStartedAt = timestamp;
      }
      const revealElapsed = Number.POSITIVE_INFINITY;

      if (!globeReducedMotion.matches) {
        currentTiltX += (targetTiltX - currentTiltX) * 0.035;
        currentTiltZ += (targetTiltZ - currentTiltZ) * 0.035;
      }
      tiltCosX = Math.cos(currentTiltX);
      tiltSinX = Math.sin(currentTiltX);
      tiltCosZ = Math.cos(currentTiltZ);
      tiltSinZ = Math.sin(currentTiltZ);

      // Smooth progress from the integrated journey system
      const rawScrollP = Number(window.__MIRAI_SCROLL_P) || Number(window.__MIRAI_MORPH_PROGRESS) || 0;
      const rawNewPlanet = Math.max(0, Math.min(1, Number(window.__MIRAI_NEW_PLANET_PROGRESS) || 0));
      const dawnProgress = Math.max(0, Math.min(1, Number(window.__MIRAI_DAWN_PROGRESS) || 0));
      if (hasIntegratedJourney) {
        targetDisperseProgress = rawNewPlanet;
      }

      const globeFollow = 1 - Math.exp(-globeDelta * (hasIntegratedJourney ? 22 : 7));
      currentDisperseProgress += (targetDisperseProgress - currentDisperseProgress) * globeFollow;
      if (Math.abs(targetDisperseProgress - currentDisperseProgress) < 0.0001) {
        currentDisperseProgress = targetDisperseProgress;
      }
      
      const newPlanetProgress = currentDisperseProgress;
      const assemblyProgress = smoothstep(0.06, 0.9, newPlanetProgress);

      // The new planet emerges from deep cosmic space in a slow, cinematic orbit.
      const masterAlpha = hasIntegratedJourney ? smoothstep(0.005, 0.28, newPlanetProgress) : 1.0;
      if (masterAlpha <= 0.001) {
        if (canvasHasContent) {
          ctx.clearRect(0, 0, logicalWidth, logicalHeight);
          canvasHasContent = false;
        }
        if (!globeReducedMotion.matches) time += 0.02;
        requestAnimationFrame(renderGlobe);
        return;
      }
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      canvasHasContent = true;

      // One pre-rasterized radial sprite replaces hundreds of per-glyph blur
      // operations while retaining the same cosmic blue aura.
      const globeGlowAlpha = masterAlpha * (1 - dawnProgress) * (0.32 + assemblyProgress * 0.48);
      if (globeGlowAlpha > 0.002) {
        const glowSize = globeRadius * (2.55 + (1 - assemblyProgress) * 0.35);
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.globalAlpha = globeGlowAlpha;
        ctx.drawImage(
          globeGlowCanvas,
          centerX - glowSize / 2,
          centerY - glowSize / 2,
          glowSize,
          glowSize
        );
        ctx.restore();
      }

      // -------------------------------------------------------------
      // (1) 3D Points Processing
      // -------------------------------------------------------------
      const fov = 1200;

      points.forEach((p, pointIndex) => {
        const item = projectionItems[pointIndex];
        const theta = p.angle + time * p.speed;

        const gatherDistance = hasIntegratedJourney
          ? (1 - assemblyProgress) * (420 + (p.bandIndex % 4) * 78)
          : 0;
        const x = p.baseR * Math.cos(theta) + p.dirX * gatherDistance;
        const z = p.baseR * Math.sin(theta) + p.dirZ * gatherDistance;
        const y = p.baseY + p.dirY * gatherDistance;

        const Nx = x / globeRadius, Ny = y / globeRadius, Nz = z / globeRadius;
        const Tx = -Math.sin(theta), Ty = 0, Tz = Math.cos(theta);
        const Ux = Ny * Tz;
        const Uy = Nz * Tx - Nx * Tz;
        const Uz = -Ny * Tx;

        const P_tilt = applyTilt(x, y, z, item.p3d);
        const T_tilt = applyTilt(Tx, Ty, Tz, item.tangent);
        const U_tilt = applyTilt(Ux, Uy, Uz, item.up);

        const scale = fov / Math.max(10, fov + P_tilt.z);
        item.x = centerX + P_tilt.x * scale;
        item.y = centerY + P_tilt.y * scale;
        item.z = P_tilt.z;
        item.scale = scale;
        item.Tx = T_tilt.x;
        item.Ty = T_tilt.y;
        item.Ux = U_tilt.x;
        item.Uy = U_tilt.y;
        item.isBack = P_tilt.z > 0;
      });

      renderList.sort((a, b) => b.z - a.z);

      // -------------------------------------------------------------
      // (2) Blue particle convergence before the characters resolve
      // -------------------------------------------------------------
      const particleAlpha = masterAlpha * (1 - smoothstep(0.46, 0.96, newPlanetProgress)) * (1 - dawnProgress);
      if (particleAlpha > 0.004) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const particleStride = compactGlobe ? 3 : 2;
        for (let index = 0; index < renderList.length; index += particleStride) {
          const item = renderList[index];
          const twinkle = 0.58 + Math.sin(time * 0.045 + index * 1.73) * 0.28;
          const radius = 0.7 + (index % 5) * 0.18;
          ctx.globalAlpha = Math.max(0, particleAlpha * twinkle);
          ctx.fillStyle = cosmicTypeColors[item.bandIndex % cosmicTypeColors.length];
          ctx.beginPath();
          ctx.arc(item.x, item.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // -------------------------------------------------------------
      // (3) Resolve particles into typography on the same spherical surface
      // -------------------------------------------------------------
      const letterBuild = hasIntegratedJourney ? smoothstep(0.26, 0.94, newPlanetProgress) : 1;
      const colorLanding = smoothstep(0.08, 0.92, dawnProgress);
      renderList.forEach(item => {
        const p = item.point;
        if (!p.char.trim()) return;

        const tLen = Math.sqrt(item.Tx * item.Tx + item.Ty * item.Ty);
        const depthAlpha = item.isBack
          ? 0.07 * item.reveal * masterAlpha * letterBuild
          : (0.1 + 0.9 * Math.pow(tLen, 0.5)) * item.reveal * masterAlpha * letterBuild;
        if (depthAlpha <= 0.002) return;

        ctx.save();
        ctx.translate(item.x, item.y);

        let s = item.scale;
        let minLen = 0.2;
        let tScale = (tLen < minLen && tLen > 0.001) ? (minLen / tLen) : 1;

        let a = item.Tx * s * tScale;
        let b = item.Ty * s * tScale;
        let c = -item.Ux * s;
        let d = -item.Uy * s;

        const fontScale = 0.12 + assemblyProgress * 0.88;
        ctx.transform(a * fontScale, b * fontScale, c * fontScale, d * fontScale, 0, 0);

        if (colorLanding < 0.995) {
          const cosmicSprite = getGlyphSprite(p, 'cosmic');
          ctx.globalAlpha = depthAlpha * (1 - colorLanding);
          ctx.drawImage(
            cosmicSprite.canvas,
            -cosmicSprite.width / 2,
            -cosmicSprite.height / 2,
            cosmicSprite.width,
            cosmicSprite.height
          );
        }
        if (colorLanding > 0.005) {
          const baseSprite = getGlyphSprite(p, 'base');
          ctx.globalAlpha = depthAlpha * colorLanding;
          ctx.drawImage(
            baseSprite.canvas,
            -baseSprite.width / 2,
            -baseSprite.height / 2,
            baseSprite.width,
            baseSprite.height
          );
        }
        ctx.restore();
      });

      // -------------------------------------------------------------
      // (4) Orbit Rings
      // -------------------------------------------------------------
      ctx.save();
      const orbitReveal = globeReducedMotion.matches
        ? 1
        : Math.min(1, Math.max(0, (revealElapsed - 1040) / 320));
      ctx.globalAlpha = orbitReveal * masterAlpha * letterBuild;
      ctx.translate(centerX, centerY);
      ctx.rotate(currentTiltZ);
      ctx.scale(1, 0.35);
      
      ctx.beginPath();
      ctx.arc(0, 0, globeRadius + 60, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(107, 148, 192, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, globeRadius + 40, 0, Math.PI * 2);
      ctx.setLineDash([15, 25]);
      ctx.lineDashOffset = -(time * 0.2);
      ctx.strokeStyle = "rgba(107, 148, 192, 0.4)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      if (!globeReducedMotion.matches) {
        const rotationRate = hasIntegratedJourney
          ? 0.14 + assemblyProgress * 0.62
          : 1;
        time += rotationRate;
      }
      if (!firstFrameRendered) {
        firstFrameRendered = true;
        if (globeElement) globeElement.classList.add('is-globe-ready');
      }
      requestAnimationFrame(renderGlobe);
    }

    // Pause animation when out of view
    const globeObserver = new IntersectionObserver((entries) => {
      const isIntersecting = entries[0].isIntersecting;
      if (isIntersecting && !isGlobeVisible) {
        isGlobeVisible = true;
        requestAnimationFrame(renderGlobe);
      } else if (!isIntersecting) {
        isGlobeVisible = false;
      }
    }, { threshold: 0.05 });
    globeObserver.observe(canvas);
    isGlobeVisible = true;
    requestAnimationFrame(renderGlobe);
  }

  /* ---------- Interactive Scroll Path ---------- */
  const animatedPath = document.getElementById('animated-path');
  if (animatedPath) {
    const pathLength = animatedPath.getTotalLength();
    animatedPath.style.strokeDasharray = pathLength;
    animatedPath.style.strokeDashoffset = pathLength;
    
    const updatePath = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      const drawLength = pathLength * scrollPercent;
      animatedPath.style.strokeDashoffset = pathLength - drawLength;
    };
    updatePath();
    window.addEventListener('scroll', updatePath, { passive: true });
  }

  /* ---------- Glassmorphism 2.0 (Hover Spotlight) ---------- */
  document.querySelectorAll('.service-card-horizontal').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ---------- Magnetic Buttons ---------- */
  document.querySelectorAll('.btn, .btn-link-animated.magnetic').forEach(btn => {
    btn.classList.add('magnetic');
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const factor = btn.classList.contains('btn-link-animated') ? 0.1 : 0.2;
      btn.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  /* ---------- Floating Particles Canvas (Optimized) ---------- */
  const pCanvas = document.getElementById('particles-canvas');
  if (pCanvas) {
    const pCtx = pCanvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    pCanvas.width = width;
    pCanvas.height = height;

    const updateParticleCanvasSize = debounce(() => {
      width = window.innerWidth;
      height = window.innerHeight;
      pCanvas.width = width;
      pCanvas.height = height;
    }, 150);

    window.addEventListener('resize', updateParticleCanvasSize);

    const particles = [];
    const numParticles = Math.floor(width / 20);
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3 - 0.1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }

    let isParticlesVisible = false;
    let lastParticlesFrame = 0;

    function animateParticles(timestamp = performance.now()) {
      if (!isParticlesVisible) return;
      if (lastParticlesFrame && timestamp - lastParticlesFrame < 1000 / 30) {
        requestAnimationFrame(animateParticles);
        return;
      }
      lastParticlesFrame = timestamp;
      pCtx.clearRect(0, 0, width, height);
      pCtx.fillStyle = 'rgba(232, 185, 90, 0.7)';
      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        pCtx.globalAlpha = p.opacity;
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        pCtx.fill();
      });
      requestAnimationFrame(animateParticles);
    }

    const particlesObserver = new IntersectionObserver((entries) => {
      const isIntersecting = entries[0].isIntersecting;
      if (isIntersecting && !isParticlesVisible) {
        isParticlesVisible = true;
        requestAnimationFrame(animateParticles);
      } else if (!isIntersecting) {
        isParticlesVisible = false;
      }
    }, { threshold: 0.01 });
    particlesObserver.observe(pCanvas);
  }

  /* ---------- Scrollytelling Parallax ---------- */
  const parallaxImages = document.querySelectorAll('.section-photo img');
  const heroSection = document.getElementById('hero-section');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    parallaxImages.forEach(img => {
      const rect = img.parentElement.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yOffset = (rect.top - window.innerHeight / 2) * 0.12;
        img.style.setProperty('--parallax-y', `${yOffset}px`);
      }
    });

    if (heroSection && !document.getElementById('hero-journey-section')) {
      if (scrollY < window.innerHeight) {
        const opacity = 1 - (scrollY / 500);
        const scale = 1 - (scrollY / 2500);
        const yOffset = scrollY * 0.35;
        heroSection.style.opacity = Math.max(0, opacity);
        heroSection.style.transform = `translateY(${yOffset}px) scale(${Math.max(0.85, scale)})`;
        heroSection.style.willChange = 'opacity, transform';
      }
    }
  }, { passive: true });

  /* ---------- Custom Interactive Cursor ---------- */
  const customCursor = document.getElementById('custom-cursor');
  if (customCursor && matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    
    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const target = e.target;
      if (target.closest('a') || target.closest('button') || target.closest('.btn') || target.closest('.service-card-horizontal')) {
        customCursor.classList.add('hover');
      } else {
        customCursor.classList.remove('hover');
      }
    });

    const renderCursor = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      customCursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);
  }

  /* ---------- Horizontal Cinematic Journey ---------- */
  const processSection = document.getElementById('process-section');
  const processTrack = document.getElementById('process-track');
  const journeyLineFill = document.getElementById('journey-line-fill');
  const watermarkNums = document.querySelectorAll('.watermark-num');
  const processStepPanels = document.querySelectorAll('#process-track .step-panel');
  const processStaticMedia = window.matchMedia('(max-width: 1023px), (prefers-reduced-motion: reduce)');

  function calculateProcessHeight() {
    if (processSection && processTrack) {
      if (processStaticMedia.matches) {
        processSection.style.height = 'auto';
        processTrack.style.transform = 'none';
        return;
      }
      const maxTranslate = Math.max(0, processTrack.scrollWidth - window.innerWidth);
      processSection.style.height = `calc(100vh + ${maxTranslate}px + 35vh)`;
    }
  }

  if (processSection && processTrack) {
    let processFrame = null;

    function setActiveProcessStep(progress) {
      if (!processStepPanels.length) return;
      const activeIndex = Math.min(
        processStepPanels.length - 1,
        Math.max(0, Math.round(progress * (processStepPanels.length - 1)))
      );
      processStepPanels.forEach((panel, index) => {
        panel.classList.toggle('is-active', index === activeIndex);
      });
    }

    function renderProcessJourney() {
      processFrame = null;
      const rect = processSection.getBoundingClientRect();
      const dissolveOverlay = document.getElementById('dark-dissolve-overlay');

      if (processStaticMedia.matches) {
        processTrack.style.transform = 'none';
        if (journeyLineFill) journeyLineFill.style.width = '100%';
        watermarkNums.forEach(num => { num.style.transform = ''; });
        processStepPanels.forEach(panel => panel.classList.remove('is-active'));
        if (dissolveOverlay) dissolveOverlay.style.opacity = '1';
        return;
      }

      if (dissolveOverlay) {
        const revealProgress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
        dissolveOverlay.style.opacity = String(revealProgress);
      }

      const maxScroll = Math.max(1, rect.height - window.innerHeight);
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / maxScroll));
      const maxTranslate = Math.max(0, processTrack.scrollWidth - window.innerWidth);
      const translateX = -(maxTranslate * scrollProgress);

      processTrack.style.transform = `translate3d(${translateX}px, 0, 0)`;
      if (journeyLineFill) journeyLineFill.style.width = `${scrollProgress * 100}%`;

      watermarkNums.forEach(num => {
        const speed = parseFloat(num.getAttribute('data-speed') || '0.8');
        num.style.transform = `translate(-50%, -50%) translateX(${translateX * (1 - speed)}px)`;
      });

      setActiveProcessStep(scrollProgress);
    }

    function scheduleProcessRender() {
      if (processFrame === null) {
        processFrame = requestAnimationFrame(renderProcessJourney);
      }
    }

    calculateProcessHeight();
    window.addEventListener('resize', debounce(() => {
      calculateProcessHeight();
      scheduleProcessRender();
    }, 150), { passive: true });
    window.addEventListener('scroll', scheduleProcessRender, { passive: true });
    processStaticMedia.addEventListener('change', () => {
      calculateProcessHeight();
      scheduleProcessRender();
    });
    scheduleProcessRender();
  }

  /* ---------- Dynamic Background SVG Path ---------- */
  function generateDynamicPath() {
    const svg = document.getElementById('global-path-svg');
    const pathMain = document.getElementById('animated-path');
    const pathHighlight = document.getElementById('animated-path-highlight');
    if (!svg || !pathMain || !pathHighlight) return;

    setTimeout(() => {
      const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      svg.setAttribute('viewBox', `0 0 1440 ${docHeight}`);

      const startY = Math.max(window.innerHeight * 0.98, 800);
      let d = `M 985 ${startY} `;
      const endY = docHeight;
      const segments = Math.max(3, Math.floor((endY - startY) / 800));
      const stepY = (endY - startY) / segments;

      let currentX = 985;
      let currentY = startY;

      for (let i = 1; i <= segments; i++) {
        const nextY = startY + i * stepY;
        const targetX = (i % 2 !== 0) ? 200 : 1240;
        const cp1X = currentX;
        const cp1Y = currentY + stepY / 2;
        const cp2X = targetX;
        const cp2Y = currentY + stepY / 2;
        
        d += `C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${targetX} ${nextY} `;
        currentX = targetX;
        currentY = nextY;
      }

      pathMain.setAttribute('d', d);
      pathHighlight.setAttribute('d', d);
    }, 100);
  }

  window.addEventListener('resize', debounce(() => {
    calculateProcessHeight();
    generateDynamicPath();
  }, 150));

  generateDynamicPath();

  /* ---------- Contact Form Handler ---------- */
  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formAlert && submitBtn) {
    const requestedType = new URLSearchParams(window.location.search).get('type');
    const requestedOption = requestedType
      ? contactForm.querySelector(`option[data-contact-type="${CSS.escape(requestedType)}"]`)
      : null;
    if (requestedOption) {
      const contactTypeSelect = document.getElementById('contact-type');
      if (contactTypeSelect) contactTypeSelect.value = requestedOption.value;
    }

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      formAlert.style.display = 'none';
      formAlert.className = 'form-alert';

      const name = document.getElementById('contact-name')?.value.trim();
      const company = document.getElementById('contact-company')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const inquiryType = document.getElementById('contact-type')?.value;
      const message = document.getElementById('contact-message')?.value.trim();
      const privacyConsent = document.getElementById('contact-privacy')?.checked;

      // Validation
      if (!name) {
        showError('お名前を入力してください。');
        return;
      }
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        showError('有効なメールアドレスを入力してください。');
        return;
      }
      if (!message) {
        showError('お問い合わせ内容を入力してください。');
        return;
      }
      if (!privacyConsent) {
        showError('個人情報保護方針への同意が必要です。');
        return;
      }

      // UI Submitting State
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, company, email, phone, inquiryType, message })
        });
        const data = await response.json();

        if (response.ok && data.ok) {
          showSuccess(data.message || 'お問い合わせを受け付けました。');
          contactForm.reset();
        } else {
          showError(data.error || '送信に失敗しました。時間をおいて再度お試しください。');
        }
      } catch (err) {
        console.error('Submit Error:', err);
        showError('通信エラーが発生しました。ネットワーク接続を確認のうえ再度送信してください。');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });

    function showError(msg) {
      formAlert.className = 'form-alert error';
      formAlert.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${msg}`;
      formAlert.style.display = 'block';
      formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function showSuccess(msg) {
      formAlert.className = 'form-alert success';
      formAlert.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
      formAlert.style.display = 'block';
      formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(value, min = 0, max = 1) { return Math.max(min, Math.min(max, value)); }
  function smootherStep(value) {
    const x = clamp(value);
    return x * x * x * (x * (x * 6 - 15) + 10);
  }
  function normalizeCamera(camera, fallback) {
    if (!camera) return fallback;
    const center = camera.center.toArray ? camera.center.toArray() : camera.center;
    return { center, zoom: camera.zoom };
  }

  /* ---------- MapLibre GL precision scrollytelling ---------- */
  function initMapLibreSection() {
    const realMapWrapper = document.getElementById('real-map-scrolly-wrapper');
    const vectorMapContainer = document.getElementById('maplibre-vector-map');
    if (!realMapWrapper || !vectorMapContainer) return;

    if (window.realMapLibreInstance) {
      window.realMapLibreInstance.resize();
      return;
    }
    if (window.__miraiwayMapInitializing) return;
    window.__miraiwayMapInitializing = true;

    if (!window.maplibregl) {
      let attempts = 0;
      const pollTimer = setInterval(() => {
        attempts++;
        if (window.maplibregl) {
          clearInterval(pollTimer);
          window.__miraiwayMapInitializing = false;
          initMapLibreSection();
        } else if (attempts > 50) {
          clearInterval(pollTimer);
          window.__miraiwayMapInitializing = false;
          console.warn('MapLibre GL library load timeout.');
        }
      }, 100);
      return;
    }



    const sriLankaLngLat = [79.8612, 6.9271];
    const japanLngLat = [139.6503, 35.6762];
    const sriLankaBounds = [[79.45, 5.72], [82.08, 10.08]];
    const japanBounds = [[126.7, 25.3], [146.35, 45.75]];
    const routeBounds = [[76.4, 3.1], [143.1, 40.2]];
    const reduceMapMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compactMapMedia = window.matchMedia('(max-width: 900px)');
    const sriVideo = document.getElementById('srilanka-ocean-video');
    const japanVideo = document.getElementById('japan-ocean-video');
    const mapVideos = [sriVideo, japanVideo].filter(Boolean);
    let mapVideosLoaded = false;
    let isMapNearViewport = false;
    let isMapVisible = false;
    let latestVideoProgress = 0;

    const map = new maplibregl.Map({
      container: 'maplibre-vector-map',
      style: 'https://tiles.openfreemap.org/styles/positron',
      center: [80.7718, 7.8731],
      zoom: 5.8,
      interactive: false,
      attributionControl: false,
      trackResize: true,
      renderWorldCopies: false,
      fadeDuration: 0
    });

    window.realMapLibreInstance = map;

    mapVideos.forEach(video => {
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
    });

    const ensureMapVideosLoaded = () => {
      if (mapVideosLoaded || !isMapNearViewport || reduceMapMotion) return;
      mapVideosLoaded = true;
      mapVideos.forEach(video => video.load());
    };

    const syncMapVideoPlayback = (progress = latestVideoProgress) => {
      latestVideoProgress = progress;
      const canPlay = isMapVisible && document.visibilityState === 'visible' && !reduceMapMotion;
      const showSriVideo = !reduceMapMotion && progress < 0.52;
      const showJapanVideo = !reduceMapMotion && progress >= 0.48;

      if (sriVideo) {
        sriVideo.classList.toggle('is-active', showSriVideo);
        if (canPlay && showSriVideo) {
          sriVideo.play().catch(() => {});
        } else if (!sriVideo.paused) {
          sriVideo.pause();
        }
      }

      if (japanVideo) {
        japanVideo.classList.toggle('is-active', showJapanVideo);
        if (canPlay && showJapanVideo) {
          japanVideo.play().catch(() => {});
        } else if (!japanVideo.paused) {
          japanVideo.pause();
        }
      }
    };

    if ('IntersectionObserver' in window) {
      const preloadObserver = new IntersectionObserver(entries => {
        const entry = entries[0];
        isMapNearViewport = Boolean(entry?.isIntersecting);
        if (isMapNearViewport) ensureMapVideosLoaded();
      }, { rootMargin: '70% 0px', threshold: 0 });

      const visibilityObserver = new IntersectionObserver(entries => {
        const entry = entries[0];
        isMapVisible = Boolean(entry?.isIntersecting);
        if (isMapVisible) {
          isMapNearViewport = true;
          ensureMapVideosLoaded();
        }
        syncMapVideoPlayback();
      }, { threshold: [0, 0.02] });

      preloadObserver.observe(realMapWrapper);
      visibilityObserver.observe(realMapWrapper);
    } else {
      isMapNearViewport = true;
      isMapVisible = true;
      ensureMapVideosLoaded();
    }

    mapVideos.forEach(video => {
      video.addEventListener('canplay', () => syncMapVideoPlayback());
    });
    document.addEventListener('visibilitychange', () => syncMapVideoPlayback());
    window.addEventListener('pageshow', () => syncMapVideoPlayback());
    window.addEventListener('pagehide', () => {
      mapVideos.forEach(video => video.pause());
    });

    const createPulsingDOM = (isOrange = false) => {
      const el = document.createElement('div');
      el.className = 'custom-map-marker';
      const cls = isOrange ? 'marker-dot-core orange' : 'marker-dot-core';
      const pulseCls = isOrange ? 'marker-pulse-wave orange' : 'marker-pulse-wave';
      el.innerHTML = `<div class="${cls}"></div><div class="${pulseCls}"></div>`;
      return el;
    };

    new maplibregl.Marker({ element: createPulsingDOM(false) }).setLngLat(sriLankaLngLat).addTo(map);

    function generateGreatCircleCoordinates(start, end, numPoints = 240) {
      const coords = [];
      const toRadians = value => value * Math.PI / 180;
      const toDegrees = value => value * 180 / Math.PI;
      const startLng = toRadians(start[0]);
      const startLat = toRadians(start[1]);
      const endLng = toRadians(end[0]);
      const endLat = toRadians(end[1]);
      const startVector = [
        Math.cos(startLat) * Math.cos(startLng),
        Math.cos(startLat) * Math.sin(startLng),
        Math.sin(startLat)
      ];
      const endVector = [
        Math.cos(endLat) * Math.cos(endLng),
        Math.cos(endLat) * Math.sin(endLng),
        Math.sin(endLat)
      ];
      const dot = Math.max(-1, Math.min(1,
        startVector[0] * endVector[0] +
        startVector[1] * endVector[1] +
        startVector[2] * endVector[2]
      ));
      const angle = Math.acos(dot);
      const sinAngle = Math.sin(angle);

      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const startWeight = Math.sin((1 - t) * angle) / sinAngle;
        const endWeight = Math.sin(t * angle) / sinAngle;
        const x = startWeight * startVector[0] + endWeight * endVector[0];
        const y = startWeight * startVector[1] + endWeight * endVector[1];
        const z = startWeight * startVector[2] + endWeight * endVector[2];
        coords.push([toDegrees(Math.atan2(y, x)), toDegrees(Math.atan2(z, Math.hypot(x, y)))]);
      }
      return coords;
    }

    const fullArcCoords = generateGreatCircleCoordinates(sriLankaLngLat, japanLngLat);
    let isMapLoaded = false;
    let cameraKeyframes = [];

    map.on('load', () => {
      isMapLoaded = true;
      window.__miraiwayMapInitializing = false;

      try {
        const styleLayers = map.getStyle().layers || [];
        styleLayers.forEach(layer => {
          if (layer.type === 'circle' || (layer.type === 'symbol' && !layer.id.includes('country'))) {
            map.setLayoutProperty(layer.id, 'visibility', 'none');
          }

          // 海・水域は透明にし、地図下層の背景動画を海面だけに表示する。
          if (layer.id.includes('water') || layer.sourceLayer === 'water') {
            if (layer.type === 'fill') {
              map.setPaintProperty(layer.id, 'fill-opacity', 0);
            }
          }

          // 背景を透明化し、陸地系レイヤーは完全不透明にする。
          if (layer.id === 'background' || layer.id.includes('land') || layer.sourceLayer === 'landcover' || layer.sourceLayer === 'landuse') {
            if (layer.type === 'background') {
              map.setPaintProperty(layer.id, 'background-color', 'rgba(255, 255, 255, 0)');
              map.setPaintProperty(layer.id, 'background-opacity', 0);
            } else if (layer.type === 'fill') {
              map.setPaintProperty(layer.id, 'fill-color', '#e8eef2');
              map.setPaintProperty(layer.id, 'fill-opacity', 1);
            }
          }

          // 国境・行政区画線は控えめにし、島の外郭を強調しない。
          if (layer.id.includes('admin') || layer.id.includes('boundary') || layer.sourceLayer === 'boundary') {
            if (layer.type === 'line') {
              map.setPaintProperty(layer.id, 'line-color', '#aebdca');
              map.setPaintProperty(layer.id, 'line-width', 0.6);
              map.setPaintProperty(layer.id, 'line-opacity', 0.25);
            }
          }
        });
      } catch (e) {
        console.warn('Basemap layer cleanup notice:', e);
      }
      const firstBaseLayer = map.getStyle().layers.find(layer => layer.type !== 'background');

      map.addSource('world-land-src', {
        type: 'geojson',
        data: '/static/geojson/world_land_110m.json',
        tolerance: 0.25,
        buffer: 32
      });
      map.addLayer({
        id: 'world-land-fill',
        type: 'fill',
        source: 'world-land-src',
        paint: {
          'fill-color': '#e8eef2',
          'fill-opacity': 1,
          'fill-antialias': true
        }
      }, firstBaseLayer ? firstBaseLayer.id : undefined);

      map.addSource('flight-arc-src', {
        type: 'geojson',
        lineMetrics: true,
        data: { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: [] } }
      });

      map.addLayer({
        id: 'flight-arc-glow',
        type: 'line',
        source: 'flight-arc-src',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': '#38bdf8',
          'line-width': ['interpolate', ['linear'], ['zoom'], 3, 7, 6, 11],
          'line-opacity': 0.25,
          'line-blur': 3
        }
      });

      map.addLayer({
        id: 'flight-arc-core',
        type: 'line',
        source: 'flight-arc-src',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': ['interpolate', ['linear'], ['line-progress'], 0, '#0284c7', 0.52, '#f59e0b', 1, '#f97316'],
          'line-width': ['interpolate', ['linear'], ['zoom'], 3, 2.25, 6, 3.5],
          'line-opacity': 0.98
        }
      });
      calculateCameraKeyframes();
      triggerRender();
    });

    function calculateCameraKeyframes() {
      const width = vectorMapContainer.clientWidth || window.innerWidth;
      const isMobile = width < 900;
      const headerClearance = 78;
      const sidePanelSpace = Math.min(460, Math.max(360, width * 0.27));

      const sriPadding = isMobile
        ? { top: headerClearance + 60, right: 24, bottom: 120, left: 24 }
        : { top: headerClearance + 60, right: Math.max(64, width * 0.08), bottom: 100, left: Math.max(64, width * 0.08) };
      const routePadding = isMobile
        ? { top: headerClearance + 70, right: 22, bottom: 120, left: 22 }
        : { top: headerClearance + 70, right: Math.max(48, width * 0.05), bottom: 90, left: Math.max(48, width * 0.05) };
      const japanPadding = isMobile
        ? { top: headerClearance + 60, right: 24, bottom: 120, left: 24 }
        : { top: headerClearance + 60, right: Math.max(64, width * 0.08), bottom: 100, left: Math.max(64, width * 0.08) };

      const fallbackSri = { center: [80.7718, 7.8731], zoom: isMobile ? 5.1 : 5.85 };
      const fallbackRoute = { center: [109.8, 21.6], zoom: isMobile ? 2.3 : 3.05 };
      const fallbackJapan = { center: [136.5, 36.2], zoom: isMobile ? 4.3 : 5.0 };

      try {
        cameraKeyframes = [
          normalizeCamera(map.cameraForBounds(sriLankaBounds, { padding: sriPadding, maxZoom: 6.4 }), fallbackSri),
          normalizeCamera(map.cameraForBounds(routeBounds, { padding: routePadding, maxZoom: 3.4 }), fallbackRoute),
          normalizeCamera(map.cameraForBounds(japanBounds, { padding: japanPadding, maxZoom: 5.3 }), fallbackJapan)
        ];
      } catch (e) {
        cameraKeyframes = [fallbackSri, fallbackRoute, fallbackJapan];
      }
    }

    function getCameraForProgress(progress) {
      if (!cameraKeyframes || cameraKeyframes.length < 3) return null;
      const clamped = clamp(progress);
      let t = 0;
      let startCam = cameraKeyframes[0];
      let endCam = cameraKeyframes[1];

      if (clamped <= 0.5) {
        t = smootherStep(clamped / 0.5);
        startCam = cameraKeyframes[0];
        endCam = cameraKeyframes[1];
      } else {
        t = smootherStep((clamped - 0.5) / 0.5);
        startCam = cameraKeyframes[1];
        endCam = cameraKeyframes[2];
      }

      return {
        center: [
          lerp(startCam.center[0], endCam.center[0], t),
          lerp(startCam.center[1], endCam.center[1], t)
        ],
        zoom: lerp(startCam.zoom, endCam.zoom, t)
      };
    }

    let targetProgress = 0;
    let currentProgress = 0;
    let lastRenderedProgress = -1;
    let animFrameId = null;
    let previousFrameTime = performance.now();
    let lastVisibleCount = -1;

    function updateTargetProgress() {
      const rect = realMapWrapper.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const scrolled = -rect.top;
      targetProgress = clamp(scrolled / scrollableHeight);
      if (reduceMapMotion) currentProgress = targetProgress;
      triggerRender();
    }

    function renderStep(frameTime) {
      const diff = targetProgress - currentProgress;
      const deltaSeconds = Math.min(0.05, Math.max(0.001, (frameTime - previousFrameTime) / 1000));
      previousFrameTime = frameTime;

      if (!reduceMapMotion && Math.abs(diff) > 0.0002) {
        const response = 1 - Math.exp(-11.5 * deltaSeconds);
        currentProgress += diff * response;
      } else {
        currentProgress = targetProgress;
      }

      if (Math.abs(currentProgress - lastRenderedProgress) >= 0.00008) {
        lastRenderedProgress = currentProgress;
        renderMapState(currentProgress);
      }

      if (!reduceMapMotion && Math.abs(targetProgress - currentProgress) > 0.0002) {
        animFrameId = requestAnimationFrame(renderStep);
      } else {
        animFrameId = null;
      }
    }

    function renderMapState(progress) {
      const camera = getCameraForProgress(progress);
      if (camera) map.jumpTo({ center: camera.center, zoom: camera.zoom, bearing: 0, pitch: 0 });

      // 3-Step Horizontal Process Flow (Exact Port) Progress & Activation Toggles
      const lineFill = document.getElementById('step-flow-line-fill');
      const step1 = document.getElementById('step-card-1');
      const step2 = document.getElementById('step-card-2');
      const step3 = document.getElementById('step-card-3');

      let currentStep = 1;
      let fillPercent = 33.33;

      if (progress < 0.35) {
        currentStep = 1;
        fillPercent = 33.33;
      } else if (progress < 0.72) {
        currentStep = 2;
        fillPercent = 66.66;
      } else {
        currentStep = 3;
        fillPercent = 100;
      }

      if (lineFill) {
        lineFill.style.width = `${fillPercent}%`;
      }

      [step1, step2, step3].forEach((step, index) => {
        if (!step) return;
        const isCurrent = currentStep === index + 1;
        step.classList.toggle('is-active', isCurrent);
        step.setAttribute('aria-current', isCurrent ? 'step' : 'false');
        step.setAttribute('aria-hidden', String(!isCurrent && compactMapMedia.matches));
      });

      // 海面背景動画は表示中のフェーズだけ再生し、短い切り替え区間だけクロスフェードする。
      syncMapVideoPlayback(progress);

      if (progress < 0.12) {
        realMapWrapper.dataset.phase = 'sri-lanka';
        if (isMapLoaded && map.getSource('flight-arc-src') && lastVisibleCount !== 0) {
          map.getSource('flight-arc-src').setData({ type: 'Feature', geometry: { type: 'LineString', coordinates: [] } });
          lastVisibleCount = 0;
        }
      } else if (progress <= 0.86) {
        realMapWrapper.dataset.phase = 'pathway';
        const t = clamp((progress - 0.12) / 0.74);
        const visibleCount = Math.max(2, Math.round(fullArcCoords.length * smootherStep(t)));
        if (isMapLoaded && map.getSource('flight-arc-src') && visibleCount !== lastVisibleCount) {
          map.getSource('flight-arc-src').setData({
            type: 'Feature',
            properties: {},
            geometry: { type: 'LineString', coordinates: fullArcCoords.slice(0, visibleCount) }
          });
          lastVisibleCount = visibleCount;
        }
      } else {
        realMapWrapper.dataset.phase = 'japan';
        if (isMapLoaded && map.getSource('flight-arc-src') && lastVisibleCount !== fullArcCoords.length) {
          map.getSource('flight-arc-src').setData({
            type: 'Feature',
            properties: {},
            geometry: { type: 'LineString', coordinates: fullArcCoords }
          });
          lastVisibleCount = fullArcCoords.length;
        }
      }
    }

    function triggerRender() {
      if (!animFrameId) animFrameId = requestAnimationFrame(renderStep);
    }

    window.addEventListener('scroll', updateTargetProgress, { passive: true });
    window.addEventListener('resize', () => {
      map.resize();
      if (isMapLoaded) calculateCameraKeyframes();
      updateTargetProgress();
    }, { passive: true });

    // Initial Trigger
    updateTargetProgress();
  }

  // The map owns another WebGL context and used to allocate a full DPR canvas
  // while the visitor was still in the hero. Initialize it only when its
  // section approaches the viewport; the map's own observers still handle
  // video loading and playback after creation.
  function scheduleMapLibreSection() {
    const realMapWrapper = document.getElementById('real-map-scrolly-wrapper');
    if (!realMapWrapper) return;

    if (!('IntersectionObserver' in window)) {
      initMapLibreSection();
      return;
    }

    const mapInitObserver = new IntersectionObserver((entries, observerInstance) => {
      if (!entries[0]?.isIntersecting) return;
      observerInstance.disconnect();
      initMapLibreSection();
    }, { rootMargin: '20% 0px', threshold: 0 });

    mapInitObserver.observe(realMapWrapper);
  }

  scheduleMapLibreSection();

  /* ---------- Infographics Counter Animation Engine ---------- */
  const counters = document.querySelectorAll('.counter');
  const barAnimates = document.querySelectorAll('.bar-animate');

  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetEl = entry.target;
          const targetNum = parseInt(targetEl.getAttribute('data-target') || '0', 10);
          let currentNum = 0;
          const duration = 1400; // ms
          const stepTime = 20; // ms
          const steps = duration / stepTime;
          const increment = targetNum / steps;

          const timer = setInterval(() => {
            currentNum += increment;
            if (currentNum >= targetNum) {
              targetEl.textContent = targetNum.toLocaleString();
              clearInterval(timer);
            } else {
              targetEl.textContent = Math.floor(currentNum).toLocaleString();
            }
          }, stepTime);

          // Animate progress bar if in same card
          const parentCard = targetEl.closest('.infographic-card');
          if (parentCard) {
            const bar = parentCard.querySelector('.bar-animate');
            if (bar) {
              const targetWidth = bar.getAttribute('data-bar-height') || '88';
              bar.style.width = `${targetWidth}%`;
            }
          }

          observer.unobserve(targetEl);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  /* ---------- Shooting Star Canvas Animation Engine ---------- */
  const starCanvas = document.getElementById('shooting-stars-canvas');
  if (starCanvas) {
    const ctx = starCanvas.getContext('2d');
    let width = starCanvas.width = starCanvas.parentElement.clientWidth;
    let height = starCanvas.height = starCanvas.parentElement.clientHeight;

    const stars = [];
    const shootingStars = [];
    let shootingStarsVisible = false;
    let lastShootingStarsFrame = 0;

    // Background Twinkling Stars
    for (let i = 0; i < 45; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005
      });
    }

    function createShootingStar() {
      const isOrange = Math.random() > 0.4;
      shootingStars.push({
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.4,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 8 + 6,
        angle: Math.PI / 4 + (Math.random() * 0.1 - 0.05), // ~45 deg
        color: isOrange ? '#f97316' : '#38bdf8',
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 40 + 30
      });
    }

    // Periodically spawn shooting stars
    setInterval(() => {
      if (shootingStarsVisible) createShootingStar();
    }, 1800);

    function renderShootingStars(timestamp = performance.now()) {
      if (!shootingStarsVisible) return;
      if (lastShootingStarsFrame && timestamp - lastShootingStarsFrame < 1000 / 30) {
        requestAnimationFrame(renderShootingStars);
        return;
      }
      lastShootingStarsFrame = timestamp;
      ctx.clearRect(0, 0, width, height);

      // Draw Twinkling Stars
      stars.forEach(star => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0.1) star.speed = -star.speed;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(star.alpha)})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw & Update Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.life++;

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(0, ss.color);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Sparkle head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        if (ss.life > ss.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      requestAnimationFrame(renderShootingStars);
    }

    window.addEventListener('resize', () => {
      if (starCanvas.parentElement) {
        width = starCanvas.width = starCanvas.parentElement.clientWidth;
        height = starCanvas.height = starCanvas.parentElement.clientHeight;
      }
    });

    const shootingStarsObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !shootingStarsVisible) {
        shootingStarsVisible = true;
        lastShootingStarsFrame = 0;
        requestAnimationFrame(renderShootingStars);
      } else if (!entry.isIntersecting) {
        shootingStarsVisible = false;
      }
    }, { threshold: 0.05 });
    shootingStarsObserver.observe(starCanvas);
  }

  /* ---------- Card 01 Vision Globe 3D Canvas Renderer ---------- */
  const visionGlobeCanvas = document.getElementById('vision-globe-canvas');
  if (visionGlobeCanvas) {
    const ctx = visionGlobeCanvas.getContext('2d');
    let rotationY = 0;
    let autoSpeed = 0.008;
    let visionGlobeVisible = false;
    let lastVisionGlobeFrame = 0;

    // Define 3D dots for continents / sphere landmass
    const dots = [];
    const numDots = 280;
    for (let i = 0; i < numDots; i++) {
      const y = 1 - (i / (numDots - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = i * 2.3999632; // Golden ratio angle
      dots.push({
        x: Math.cos(theta) * radius,
        y: y,
        z: Math.sin(theta) * radius,
        isHighlight: i % 7 === 0
      });
    }

    // Key Hub coordinates (Sri Lanka & Japan)
    const colombo = { lat: 6.92 * (Math.PI / 180), lon: 79.86 * (Math.PI / 180) };
    const tokyo = { lat: 35.67 * (Math.PI / 180), lon: 139.65 * (Math.PI / 180) };

    function latLonTo3D(lat, lon, rad, rot) {
      const cosLat = Math.cos(lat);
      const effLon = lon + rot;
      return {
        x: rad * cosLat * Math.sin(effLon),
        y: rad * -Math.sin(lat),
        z: rad * cosLat * Math.cos(effLon)
      };
    }

    function drawVisionGlobe(timestamp = performance.now()) {
      if (!visionGlobeVisible) return;
      if (lastVisionGlobeFrame && timestamp - lastVisionGlobeFrame < 1000 / 30) {
        requestAnimationFrame(drawVisionGlobe);
        return;
      }
      lastVisionGlobeFrame = timestamp;
      const w = visionGlobeCanvas.width;
      const h = visionGlobeCanvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const R = 145;

      ctx.clearRect(0, 0, w, h);

      // Atmosphere Outer Halo Gradient
      const atmosphereGrad = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.25);
      atmosphereGrad.addColorStop(0, 'rgba(2, 132, 199, 0.25)');
      atmosphereGrad.addColorStop(0.5, 'rgba(2, 132, 199, 0.12)');
      atmosphereGrad.addColorStop(1, 'rgba(2, 132, 199, 0)');
      ctx.fillStyle = atmosphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Globe Shading Base Sphere
      const globeGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 10, cx, cy, R);
      globeGrad.addColorStop(0, '#1e3a8a');
      globeGrad.addColorStop(0.5, '#0f2b5c');
      globeGrad.addColorStop(1, '#0b192e');
      ctx.fillStyle = globeGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // Globe Outline Circle Glow
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 2;
      ctx.stroke();

      rotationY += autoSpeed;

      // Draw Lat/Lon Grid Wireframe Lines
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
      for (let latDeg = -60; latDeg <= 60; latDeg += 30) {
        const rLat = R * Math.cos(latDeg * Math.PI / 180);
        const yLat = cy - R * Math.sin(latDeg * Math.PI / 180);
        ctx.beginPath();
        ctx.ellipse(cx, yLat, rLat, rLat * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Render 3D Dots by Z-depth
      dots.forEach(dot => {
        const cosR = Math.cos(rotationY);
        const sinR = Math.sin(rotationY);
        const rx = dot.x * cosR - dot.z * sinR;
        const rz = dot.x * sinR + dot.z * cosR;

        if (rz > -0.2) {
          const px = cx + rx * R;
          const py = cy + dot.y * R;
          const alpha = Math.max(0.1, (rz + 0.3) / 1.3);
          const size = dot.isHighlight ? 2.6 : 1.5;

          ctx.fillStyle = dot.isHighlight
            ? `rgba(245, 158, 11, ${alpha})`
            : `rgba(186, 230, 253, ${alpha * 0.75})`;
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Calculate Colombo & Tokyo 3D positions
      const pColombo = latLonTo3D(colombo.lat, colombo.lon, R, rotationY);
      const pTokyo = latLonTo3D(tokyo.lat, tokyo.lon, R, rotationY);

      // Draw Sri Lanka -> Japan Connection Arc if visible
      if (pColombo.z > -0.2 && pTokyo.z > -0.2) {
        const cX1 = cx + pColombo.x;
        const cY1 = cy + pColombo.y;
        const cX2 = cx + pTokyo.x;
        const cY2 = cy + pTokyo.y;
        const midX = (cX1 + cX2) / 2;
        const midY = (cY1 + cY2) / 2 - 45;

        // Arc stroke
        const arcGrad = ctx.createLinearGradient(cX1, cY1, cX2, cY2);
        arcGrad.addColorStop(0, '#f59e0b');
        arcGrad.addColorStop(0.5, '#ffffff');
        arcGrad.addColorStop(1, '#38bdf8');

        ctx.strokeStyle = arcGrad;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cX1, cY1);
        ctx.quadraticCurveTo(midX, midY, cX2, cY2);
        ctx.stroke();

        // Traveling Pulse Light along Arc
        const t = (Date.now() % 2200) / 2200;
        const pulseX = (1 - t) * (1 - t) * cX1 + 2 * (1 - t) * t * midX + t * t * cX2;
        const pulseY = (1 - t) * (1 - t) * cY1 + 2 * (1 - t) * t * midY + t * t * cY2;

        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 4.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Colombo Pin
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(cX1, cY1, 5, 0, Math.PI * 2);
        ctx.fill();

        // Tokyo Pin
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(cX2, cY2, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(drawVisionGlobe);
    }

    visionGlobeCanvas.addEventListener('mouseenter', () => { autoSpeed = 0.02; });
    visionGlobeCanvas.addEventListener('mouseleave', () => { autoSpeed = 0.008; });

    const visionGlobeObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visionGlobeVisible) {
        visionGlobeVisible = true;
        lastVisionGlobeFrame = 0;
        requestAnimationFrame(drawVisionGlobe);
      } else if (!entry.isIntersecting) {
        visionGlobeVisible = false;
      }
    }, { threshold: 0.05 });
    visionGlobeObserver.observe(visionGlobeCanvas);
  }

})();
