/* MiraiWay — frontend interactions */
(function () {
  'use strict';

  /* ---------- Header scroll shadow ---------- */
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      icon.className = mobileNav.classList.contains('open') ? 'fas fa-xmark' : 'fas fa-bars';
    });
    mobileNav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.querySelector('i').className = 'fas fa-bars';
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
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  /* ---------- Word Globe (rotating word sphere) ---------- */
  const globe = document.getElementById('word-globe');
  if (globe) {
    const WORDS = [
      'MiraiWay', 'Japan', 'Connection', 'Future', 'Sri Lanka', 'Career',
      'Bridge', 'Talent', 'Growth', 'Support', 'Matching', 'Education',
      'Opportunity', 'Global', 'Trust', 'Team', 'Skill', 'Dream',
      'Tokyo', 'Colombo', 'People', 'Work', 'Culture', 'Journey',
      'Success', 'Partner', 'Value', 'Vision', 'Hope', 'Link',
      'Community', 'Learning', 'Passion', 'Unity', 'Progress', 'Way'
    ];
    const FEATURED = { MiraiWay: 2.1, 'Japan': 1.7, 'Connection': 1.6, 'Future': 1.5 };

    const items = [];
    const N = WORDS.length;
    // Fibonacci sphere distribution
    const golden = Math.PI * (3 - Math.sqrt(5));
    WORDS.forEach((word, i) => {
      const el = document.createElement('span');
      el.className = 'globe-word';
      el.textContent = word;
      const scale = FEATURED[word] || (0.7 + Math.random() * 0.5);
      el.dataset.scale = scale;
      globe.appendChild(el);

      const y = 1 - (i / (N - 1)) * 2; // -1..1
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      items.push({
        el,
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
        scale
      });
    });

    let angle = 0;
    let radius = globe.offsetWidth / 2;
    window.addEventListener('resize', () => { radius = globe.offsetWidth / 2; }, { passive: true });

    function render() {
      angle += 0.0035;
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);
      const tilt = 0.35;
      const sinT = Math.sin(tilt);
      const cosT = Math.cos(tilt);

      for (const it of items) {
        // rotate around Y axis
        let x = it.x * cos - it.z * sin;
        let z = it.x * sin + it.z * cos;
        // slight tilt around X axis
        let y = it.y * cosT - z * sinT;
        z = it.y * sinT + z * cosT;

        const depth = (z + 2) / 3; // 0.33..1
        const px = x * radius * 0.86;
        const py = y * radius * 0.86;
        const s = it.scale * (0.55 + depth * 0.6);
        it.el.style.transform =
          'translate(-50%, -50%) translate(' + px + 'px,' + py + 'px) scale(' + s + ')';
        it.el.style.opacity = (0.18 + depth * 0.82).toFixed(2);
        it.el.style.fontSize = '15px';
        it.el.style.zIndex = Math.round(depth * 100);
        it.el.style.color = it.scale > 1.4 ? '#16324f' : 'rgba(22,50,79,' + (0.35 + depth * 0.5) + ')';
        it.el.style.fontWeight = it.scale > 1.4 ? 800 : 600;
      }
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  /* ---------- Contact form ---------- */
  const form = document.getElementById('contact-form');
  if (form) {
    const result = document.getElementById('cf-result');
    const submitBtn = document.getElementById('cf-submit');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      result.textContent = '';
      result.className = '';

      const payload = {
        name: document.getElementById('cf-name').value.trim(),
        company: document.getElementById('cf-company').value.trim(),
        email: document.getElementById('cf-email').value.trim(),
        message: document.getElementById('cf-message').value.trim()
      };

      if (!payload.name || !payload.email || !payload.message) {
        result.textContent = '必須項目をご入力ください。';
        result.className = 'ng';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
      try {
        const res = await axios.post('/api/contact', payload);
        if (res.data && res.data.ok) {
          result.textContent = res.data.message;
          result.className = 'ok';
          form.reset();
        } else {
          result.textContent = (res.data && res.data.error) || '送信に失敗しました。';
          result.className = 'ng';
        }
      } catch (err) {
        const msg =
          err.response && err.response.data && err.response.data.error
            ? err.response.data.error
            : '送信に失敗しました。時間をおいて再度お試しください。';
        result.textContent = msg;
        result.className = 'ng';
      } finally {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
      }
    });
  }
})();
