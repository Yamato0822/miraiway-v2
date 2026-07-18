/* MiraiWay — frontend interactions */
(function () {
  'use strict';

  /* Helper: Debounce */
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  /* Force scroll to top on fresh load — clear any hash & override browser restore */
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  if (window.location.hash) {
    history.replaceState('', document.title, window.location.pathname + window.location.search);
  }

  const pageLoader = document.getElementById('page-loader');
  const loadingScreen = document.getElementById('loading-screen');
  const loaderBar = document.getElementById('loader-bar-fill');
  
  function hidePageLoader() {
    if (pageLoader) pageLoader.classList.add('is-loaded');
    if (loadingScreen) loadingScreen.classList.add('fade-out');
    document.body.classList.remove('is-loading');
    setTimeout(() => {
      if (pageLoader) pageLoader.style.display = 'none';
      if (loadingScreen) loadingScreen.style.display = 'none';
    }, 850);
  }

  if (document.readyState === 'complete') {
    setTimeout(hidePageLoader, 400);
  } else {
    window.addEventListener('load', () => setTimeout(hidePageLoader, 400));
    // Fallback timer to ensure page is unblocked after max 1.2s
    setTimeout(hidePageLoader, 1200);
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
          requestAnimationFrame(() => {
            pageLoader.classList.remove('is-loaded');
          });
        }
        setTimeout(() => {
          window.location.href = href;
        }, 400);
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
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.className = mobileNav.classList.contains('open') ? 'fas fa-xmark' : 'fas fa-bars';
      }
    });
    mobileNav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      })
    );
  }

  /* ---------- Scroll reveal & Split Text ---------- */
  document.querySelectorAll('h2, .hero-title').forEach(el => {
    if (el.querySelector('.char')) return;
    const text = el.innerHTML;
    const tokens = text.split(/(<br[^>]*>)/i);
    el.innerHTML = '';
    tokens.forEach(token => {
      if (token.toLowerCase().startsWith('<br')) {
        el.innerHTML += token;
      } else {
        const chars = Array.from(token);
        chars.forEach(char => {
          if (char === ' ' || char === '\n') {
            el.innerHTML += char;
          } else {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char;
            el.appendChild(span);
          }
        });
      }
    });
    el.classList.add('reveal-split');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          
          if (e.target.classList.contains('reveal-split')) {
            const chars = e.target.querySelectorAll('.char');
            chars.forEach((char, i) => {
              char.style.transitionDelay = `${i * 0.035}s`;
            });
          }
          
          // Counter Animation
          if (e.target.classList.contains('counter')) {
            const target = parseInt(e.target.getAttribute('data-target'), 10);
            const duration = 1500; // ms
            const stepTime = Math.abs(Math.floor(duration / target));
            let current = 0;
            const timer = setInterval(() => {
              current += 1;
              e.target.textContent = current;
              if (current >= target) {
                e.target.textContent = target;
                clearInterval(timer);
              }
            }, stepTime);
          }

          // Bar chart grow animation
          if (e.target.classList.contains('bar-animate')) {
            const targetHeight = e.target.getAttribute('data-bar-height');
            setTimeout(() => {
              e.target.style.height = targetHeight + '%';
            }, 300);
          }

          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal, .reveal-split, .counter, .bar-animate, .reveal-glow').forEach((el) => observer.observe(el));

  /* ---------- Canvas 3D Typography Globe Engine (Optimized with IntersectionObserver) ---------- */
  const canvas = document.getElementById('typography-globe-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
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

    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetTiltZ = baseTiltZ + (x * 0.2);
      targetTiltX = baseTiltX + (y * 0.2);
    });
    const fontFamily = "'Outfit', 'Noto Sans JP', sans-serif";
    
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
    
    bands.forEach((band) => {
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
        
        points.push({
          char: char,
          angle: angle,
          baseY: y,
          baseR: r,
          fontSize: band.fontSize,
          color: band.color,
          weight: band.weight,
          speed: band.speed
        });
        currentX += charWidth + tracking;
      }
    });

    let time = 0;
    let isGlobeVisible = false;

    function applyTilt(v) {
      let y1 = v.y * Math.cos(currentTiltX) - v.z * Math.sin(currentTiltX);
      let z1 = v.y * Math.sin(currentTiltX) + v.z * Math.cos(currentTiltX);
      let x2 = v.x * Math.cos(currentTiltZ) - y1 * Math.sin(currentTiltZ);
      let y2 = v.x * Math.sin(currentTiltZ) + y1 * Math.cos(currentTiltZ);
      return { x: x2, y: y2, z: z1 };
    }

    function renderGlobe() {
      if (!isGlobeVisible) return;

      currentTiltX += (targetTiltX - currentTiltX) * 0.05;
      currentTiltZ += (targetTiltZ - currentTiltZ) * 0.05;

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);
      
      let bgGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, globeRadius);
      bgGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      bgGrad.addColorStop(0.6, "rgba(240, 246, 252, 0.35)");
      bgGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, globeRadius, 0, Math.PI * 2);
      ctx.fillStyle = bgGrad;
      ctx.fill();

      let renderList = [];
      points.forEach(p => {
        let theta = p.angle + time * p.speed;
        let x = p.baseR * Math.cos(theta);
        let z = p.baseR * Math.sin(theta);
        let y = p.baseY;
        
        let Nx = x / globeRadius, Ny = y / globeRadius, Nz = z / globeRadius;
        let Tx = -Math.sin(theta), Ty = 0, Tz = Math.cos(theta);
        let Ux = Ny * Tz;
        let Uy = Nz * Tx - Nx * Tz;
        let Uz = -Ny * Tx;

        let P_tilt = applyTilt({x, y, z});
        let T_tilt = applyTilt({x: Tx, y: Ty, z: Tz});
        let U_tilt = applyTilt({x: Ux, y: Uy, z: Uz});

        const fov = 1200;
        const scale = fov / (fov + P_tilt.z);
        
        renderList.push({
          char: p.char,
          x: centerX + P_tilt.x * scale,
          y: centerY + P_tilt.y * scale,
          z: P_tilt.z,
          scale: scale,
          Tx: T_tilt.x, Ty: T_tilt.y,
          Ux: U_tilt.x, Uy: U_tilt.y,
          fontSize: p.fontSize,
          color: p.color,
          weight: p.weight,
          isBack: P_tilt.z > 0
        });
      });

      renderList.sort((a, b) => b.z - a.z);

      renderList.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        let s = p.scale;
        let tLen = Math.sqrt(p.Tx*p.Tx + p.Ty*p.Ty);
        let minLen = 0.2; 
        let tScale = 1;
        if (tLen < minLen && tLen > 0.001) {
          tScale = minLen / tLen;
        }

        let a = p.Tx * s * tScale;
        let b = p.Ty * s * tScale;
        let c = -p.Ux * s;
        let d = -p.Uy * s;

        if (p.isBack) {
          ctx.globalAlpha = 0.07; 
          ctx.transform(a, b, c, d, 0, 0);
        } else {
          ctx.globalAlpha = 0.1 + 0.9 * Math.pow(tLen, 0.5); 
          ctx.transform(a, b, c, d, 0, 0);
        }

        ctx.font = `${p.weight} ${p.fontSize}px ${fontFamily}`;
        ctx.fillStyle = p.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.fillText(p.char, 0, 0);
        ctx.restore();
      });

      // Orbit Rings
      ctx.save();
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

      time += 1;
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

  /* ---------- Scrollytelling Engine for Services ---------- */
  const serviceItems = document.querySelectorAll('.service-showcase-item');
  const svgPaths = [];

  serviceItems.forEach((item) => {
    const strokes = item.querySelectorAll('.dynamic-svg-stroke');
    const itemData = {
      el: item,
      textEl: item.querySelector('.service-text'),
      strokes: []
    };
    strokes.forEach((stroke) => {
      const length = stroke.getTotalLength ? stroke.getTotalLength() : 400;
      const seq = parseInt(stroke.getAttribute('data-seq') || '0', 10);
      stroke.style.strokeDasharray = length;
      stroke.style.strokeDashoffset = length;
      
      itemData.maxSeq = Math.max(itemData.maxSeq || 0, seq);
      itemData.strokes.push({
        el: stroke,
        length: length,
        seq: seq,
        currentOffset: length,
        targetOffset: length
      });
    });
    
    if (itemData.textEl) {
      itemData.textEl.style.opacity = 0;
      itemData.textEl.style.transform = 'translateY(40px)';
      itemData.currentTextProgress = 0;
      itemData.targetTextProgress = 0;
    }

    svgPaths.push(itemData);
  });

  function renderScrollytelling() {
    const windowHeight = window.innerHeight;
    
    svgPaths.forEach(data => {
      const rect = data.el.getBoundingClientRect();
      const startTrigger = windowHeight * 0.85;
      const endTrigger = windowHeight * 0.35;
      
      let rawProgress = 0;
      if (rect.top > startTrigger) {
        rawProgress = 0;
      } else if (rect.top < endTrigger) {
        rawProgress = 1;
      } else {
        rawProgress = 1 - ((rect.top - endTrigger) / (startTrigger - endTrigger));
      }
      
      data.targetTextProgress = rawProgress;
      const maxSeq = data.maxSeq || 0;
      const stepSize = 1 / (maxSeq + 1);

      data.strokes.forEach(strokeData => {
        let pathProgress = rawProgress;
        if (maxSeq > 0) {
          const strokeStart = strokeData.seq * stepSize;
          const strokeEnd = (strokeData.seq + 1) * stepSize;
          if (rawProgress <= strokeStart) {
            pathProgress = 0;
          } else if (rawProgress >= strokeEnd) {
            pathProgress = 1;
          } else {
            pathProgress = (rawProgress - strokeStart) / stepSize;
          }
        }
        strokeData.targetOffset = strokeData.length * (1 - pathProgress);
      });
      
      if (data.textEl) {
        data.currentTextProgress += (data.targetTextProgress - data.currentTextProgress) * 0.1;
        data.textEl.style.opacity = data.currentTextProgress;
        const yOffset = 40 * (1 - data.currentTextProgress);
        data.textEl.style.transform = `translateY(${yOffset}px)`;
      }

      data.strokes.forEach(strokeData => {
        strokeData.currentOffset += (strokeData.targetOffset - strokeData.currentOffset) * 0.1;
        strokeData.el.style.strokeDashoffset = strokeData.currentOffset;
      });
    });
    
    requestAnimationFrame(renderScrollytelling);
  }
  
  if (svgPaths.length > 0) {
    renderScrollytelling();
  }

  /* ---------- Floating Particles Canvas (Optimized) ---------- */
  const pCanvas = document.getElementById('particles-canvas');
  if (pCanvas) {
    const pCtx = pCanvas.getContext('2d');
    let width = window.innerWidth;
    let height = document.body.scrollHeight || 4000;
    pCanvas.width = width;
    pCanvas.height = height;

    const updateParticleCanvasSize = debounce(() => {
      width = window.innerWidth;
      height = document.body.scrollHeight;
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

    function animateParticles() {
      if (!isParticlesVisible) return;
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

    if (heroSection) {
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
  const parallaxBgs = document.querySelectorAll('.parallax-bg');
  const watermarkNums = document.querySelectorAll('.watermark-num');
  const parallaxCards = document.querySelectorAll('.parallax-card');

  function calculateProcessHeight() {
    if (processSection && processTrack) {
      const maxTranslate = processTrack.scrollWidth - window.innerWidth;
      processSection.style.height = `calc(100vh + ${maxTranslate}px + 50vh)`;
    }
  }

  if (processSection && processTrack) {
    let panelCache = [];
    function cachePanels() {
      panelCache = [];
      parallaxCards.forEach(card => {
        const panel = card.parentElement;
        panelCache.push({
          card: card,
          left: panel.offsetLeft,
          width: panel.offsetWidth
        });
      });
    }
    
    calculateProcessHeight();
    cachePanels();
    
    window.addEventListener('resize', debounce(() => {
      calculateProcessHeight();
      cachePanels();
    }, 150), { passive: true });

    window.addEventListener('scroll', () => {
      const rect = processSection.getBoundingClientRect();
      const dissolveOverlay = document.getElementById('dark-dissolve-overlay');

      if (dissolveOverlay) {
        if (rect.top > window.innerHeight) {
          dissolveOverlay.style.opacity = 0;
        } else if (rect.top <= 0) {
          dissolveOverlay.style.opacity = 1;
        } else {
          dissolveOverlay.style.opacity = 1 - (rect.top / window.innerHeight);
        }
      }

      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const maxScroll = rect.height - window.innerHeight;
        const currentScroll = Math.abs(rect.top);
        const scrollPercent = currentScroll / maxScroll;
        
        const maxTranslate = processTrack.scrollWidth - window.innerWidth;
        const translateX = -(maxTranslate * scrollPercent);
        processTrack.style.transform = `translateX(${translateX}px)`;

        if (journeyLineFill) {
          journeyLineFill.style.width = `${Math.min(100, scrollPercent * 110)}%`;
        }

        watermarkNums.forEach(num => {
          const speed = parseFloat(num.getAttribute('data-speed') || '0.8');
          num.style.transform = `translate(-50%, -50%) translateX(${translateX * (1 - speed)}px)`;
        });

        panelCache.forEach(data => {
          data.card.style.transform = 'scale(1)';
          data.card.style.opacity = '1';
        });

      } else if (rect.top > 0) {
        processTrack.style.transform = `translateX(0px)`;
        if (journeyLineFill) journeyLineFill.style.width = '0%';
      } else if (rect.bottom < window.innerHeight) {
        const maxTranslate = processTrack.scrollWidth - window.innerWidth;
        processTrack.style.transform = `translateX(${-maxTranslate}px)`;
        if (journeyLineFill) journeyLineFill.style.width = '100%';
      }
    }, { passive: true });
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

  /* ---------- FAQ Tab Filter ---------- */
  const faqTabs = document.querySelectorAll('.faq-tab-btn');
  const faqCards = document.querySelectorAll('.faq-card-item');

  if (faqTabs.length > 0 && faqCards.length > 0) {
    faqTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = tab.getAttribute('data-category');
        faqTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        faqCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (cat === 'all' || cardCat === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

})();
