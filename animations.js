/* ============================================================
   AJINKYA FURANGE — MULTI-LIBRARY CREATIVE ANIMATION ENGINE
   Three.js · GSAP ScrollTrigger · Anime.js · Animate.css
   ============================================================ */
(function () {
  'use strict';

  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── wait for GSAP + plugins ── */
  gsap.registerPlugin(ScrollTrigger);

  /* ============================================================
     1. THREE.JS — HERO PARTICLE FIELD
     ============================================================ */
  function initThree() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

    /* Particle cloud */
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 12;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ size: 0.012, color: 0xc8f135, transparent: true, opacity: 0.55 });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* Wireframe icosahedron */
    const icoGeo = new THREE.IcosahedronGeometry(1.1, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0xc8f135, wireframe: true, transparent: true, opacity: 0.06 });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    /* Mouse parallax */
    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 0.6;
      my = (e.clientY / window.innerHeight - 0.5) * 0.6;
    });

    /* Scroll-linked rotation via GSAP */
    if (!RM) {
      gsap.to(points.rotation, {
        y: Math.PI * 2,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });
      gsap.to(ico.rotation, {
        y: Math.PI,
        x: Math.PI * 0.5,
        ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 2 }
      });
    }

    function animate() {
      requestAnimationFrame(animate);
      if (!RM) {
        points.rotation.y += 0.0003;
        points.rotation.x += mx * 0.01;
        points.rotation.y += my * 0.005;
        ico.rotation.y    += 0.002;
      }
      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    });
  }

  /* ============================================================
     2. TERMINAL BOOT LOADER
     ============================================================ */
  function initLoader(onDone) {
    const loader   = document.getElementById('boot-loader');
    const terminal = document.getElementById('boot-terminal');
    if (!loader) { onDone(); return; }

    if (RM) { loader.style.display = 'none'; onDone(); return; }

    const lines = [
      '> Initializing core systems...',
      '> Loading AI modules .............. [OK]',
      '> Mounting full-stack engine ....... [OK]',
      '> Connecting to Mumbai node ........ [OK]',
      '> AJINKYA.DEV — ONLINE',
    ];
    let li = 0, ci = 0;
    function nextLine() {
      if (li >= lines.length) {
        setTimeout(() => {
          gsap.to(loader, { opacity: 0, duration: 0.7, ease: 'power2.out',
            onComplete: () => { loader.style.display = 'none'; onDone(); }
          });
        }, 300);
        return;
      }
      const p = document.createElement('p');
      p.className = 'boot-line' + (lines[li].includes('ONLINE') ? ' boot-accent' : '');
      terminal.appendChild(p);
      ci = 0;
      function typeChar() {
        if (ci < lines[li].length) { p.textContent += lines[li][ci++]; setTimeout(typeChar, 24); }
        else { li++; setTimeout(nextLine, 90); }
      }
      typeChar();
    }
    nextLine();
  }

  /* ============================================================
     3. ANIME.JS — HERO TEXT CHARACTER REVEAL
     ============================================================ */
  function heroTextReveal() {
    /* Wrap each character in a span, keeping words together to prevent mid-word linebreaks */
    const nameEl = document.getElementById('hero-name-text');
    if (!nameEl) return;
    const txt = nameEl.textContent.trim();
    const words = txt.split(' ');
    nameEl.innerHTML = words.map(word => {
      const charsHtml = word.split('').map(c =>
        `<span class="c" style="display:inline-block;opacity:0;transform:translateY(60px)">${c}</span>`
      ).join('');
      return `<span style="display:inline-block;white-space:nowrap;">${charsHtml}</span>`;
    }).join('<span>&nbsp;</span>');

    if (RM) {
      nameEl.querySelectorAll('.c').forEach(c => { c.style.opacity=1; c.style.transform='none'; });
      return;
    }

    anime({
      targets: '#hero-name-text .c',
      opacity:   [0, 1],
      translateY:[60, 0],
      easing:    'cubicBezier(0.16,1,0.3,1)',
      duration:  900,
      delay:     anime.stagger(35, { from: 'first' }),
    });
  }

  /* GSAP hero subtitle/cta */
  function heroGSAP() {
    const tl = gsap.timeline({ delay: 0.1 });
    tl.from('#hero-eyebrow',  { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
      .from('#hero-role',     { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .from('#hero-ctas .btn',{ y: 20, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15 }, '-=0.3');
  }

  /* ============================================================
     4. GSAP SCROLLTRIGGER — HORIZONTAL PROJECT SCROLL
     ============================================================ */
  function initHorizontalProjects() {
    const section = document.getElementById('projects-scroll');
    const track   = document.getElementById('projects-track');
    if (!section || !track || window.innerWidth < 768) return;

    const cards = track.querySelectorAll('.project-card');
    const trackW = cards.length * (380 + 24); // card width + gap
    track.style.width = trackW + 'px';

    gsap.to(track, {
      x: -(trackW - window.innerWidth + 96),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: 'top top',
        end: () => `+=${trackW}`,
        scrub: 1,
        anticipatePin: 1,
      }
    });

    /* Stagger card reveals as they enter horizontal viewport */
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: () => `top top+=${i * 120}`,
          toggleActions: 'play none none reverse',
          scrub: false,
        }
      });
    });
  }

  /* ============================================================
     5. GSAP SCROLLTRIGGER — SECTION CLIP REVEALS
     ============================================================ */
  function initSectionReveals() {
    /* Clip-line: each .clip-inner slides up when section enters */
    gsap.utils.toArray('.clip-inner').forEach(el => {
      if (RM) { el.style.transform = 'none'; return; }
      gsap.from(el, {
        yPercent: 110,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el.closest('section') || el,
          start: 'top 80%',
        }
      });
    });

    /* Fade-up: anything with data-anim-type="fade" */
    gsap.utils.toArray('[data-anim-type="fade"]').forEach(el => {
      if (RM) return;
      gsap.from(el, {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: 'power3.out',
        delay: parseFloat(el.dataset.animDelay || 0) / 1000,
        scrollTrigger: { trigger: el, start: 'top 82%' }
      });
    });
  }

  /* ============================================================
     6. ANIME.JS — SECTION HEADINGS STAGGER + COUNTERS
     ============================================================ */
  function initAnimeReveals() {
    /* Section headings word-by-word */
    document.querySelectorAll('.anim-heading').forEach(el => {
      const words = el.textContent.trim().split(' ');
      el.innerHTML = words.map(w =>
        `<span class="word-wrap" style="overflow:hidden;display:inline-block;"><span class="word-inner" style="display:inline-block;">${w}</span></span>`
      ).join(' ');

      ScrollTrigger.create({
        trigger: el,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          if (RM) { el.querySelectorAll('.word-inner').forEach(w => w.style.transform='none'); return; }
          anime({
            targets: el.querySelectorAll('.word-inner'),
            translateY: ['100%', '0%'],
            opacity:    [0, 1],
            easing:     'cubicBezier(0.16,1,0.3,1)',
            duration:   800,
            delay:      anime.stagger(80),
          });
        }
      });
    });

    /* Counters via Anime.js */
    document.querySelectorAll('[data-anim-type="counter"]').forEach(el => {
      const target = parseInt(el.dataset.target || 0);
      const suffix = el.dataset.suffix || '';
      el.textContent = '0' + suffix;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          if (RM) { el.textContent = target + suffix; return; }
          anime({
            targets: { val: 0 },
            val: target,
            round: 1,
            easing: 'easeOutCubic',
            duration: 1600,
            update: function(anim) {
              el.textContent = Math.round(anim.animations[0].currentValue) + suffix;
            }
          });
        }
      });
    });
  }

  /* ============================================================
     7. ANIMATE.CSS — ADD CLASSES ON SCROLL
     ============================================================ */
  function initAnimateCSS() {
    const map = {
      '.achievements-table tr': 'animate__fadeInLeft',
      '.timeline-item':          'animate__fadeInUp',
      '.stat-card':               'animate__zoomIn',
      '.skill-tag':               'animate__fadeIn',
      '.contact-link':            'animate__fadeInLeft',
    };

    Object.entries(map).forEach(([sel, cls]) => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.style.opacity = '0';
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            setTimeout(() => {
              el.style.opacity = '';
              el.classList.add('animate__animated', cls);
              el.style.setProperty('--animate-duration', '0.6s');
              el.style.setProperty('--animate-delay', `${i * 60}ms`);
            }, i * 60);
          }
        });
      });
    });
  }

  /* ============================================================
     8. GSAP PARALLAX — HERO BG TEXT + SCROLL INDICATOR
     ============================================================ */
  function initParallax() {
    gsap.to('.hero-bg-index', {
      y: -200,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    gsap.to('.hero-scroll', {
      opacity: 0,
      scrollTrigger: { trigger: '#hero', start: 'center center', end: 'bottom top', scrub: true }
    });

    /* Section labels slide in from left */
    gsap.utils.toArray('.section-label').forEach(el => {
      gsap.from(el, {
        x: -40, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    /* Section rules draw from left */
    gsap.utils.toArray('.section-rule').forEach(el => {
      gsap.from(el, {
        scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
  }

  /* ============================================================
     9. MAGNETIC BUTTONS (Anime.js spring)
     ============================================================ */
  function initMagnetic() {
    if (RM || window.innerWidth < 1024) return;
    document.querySelectorAll('[data-magnetic]').forEach(btn => {
      const s = parseFloat(btn.dataset.magnetic || 0.3);
      let anim;
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width/2)  * s;
        const y = (e.clientY - r.top  - r.height/2) * s;
        if (anim) anim.pause();
        anim = anime({ targets: btn, translateX: x, translateY: y, duration: 300, easing: 'easeOutElastic(1,0.5)' });
      });
      btn.addEventListener('mouseleave', () => {
        if (anim) anim.pause();
        anim = anime({ targets: btn, translateX: 0, translateY: 0, duration: 600, easing: 'easeOutElastic(1,0.4)' });
      });
    });
  }

  /* ============================================================
     10. CUSTOM CURSOR
     ============================================================ */
  function initCursor() {
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring || window.innerWidth <= 1024) return;
    let mx=0, my=0, rx=0, ry=0;
    document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', () => gsap.to(ring, { scale: 2.5, borderColor: '#c8f135', duration: 0.25 }));
      el.addEventListener('mouseleave', () => gsap.to(ring, { scale: 1, borderColor: '', duration: 0.35 }));
    });
    (function loop() {
      rx += (mx-rx)*0.1; ry += (my-ry)*0.1;
      dot.style.left=mx+'px';  dot.style.top=my+'px';
      ring.style.left=rx+'px'; ring.style.top=ry+'px';
      requestAnimationFrame(loop);
    })();
  }

  /* ============================================================
     11. NAV SCRAMBLE (Anime.js)
     ============================================================ */
  function initNavScramble() {
    if (RM) return;
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&';
    document.querySelectorAll('[data-scramble]').forEach(el => {
      const orig = el.textContent.trim();
      el.addEventListener('mouseenter', () => {
        let i = 0;
        const iv = setInterval(() => {
          el.textContent = orig.split('').map((c, j) =>
            j < i ? c : CHARS[Math.floor(Math.random()*CHARS.length)]
          ).join('');
          if (++i > orig.length) { el.textContent = orig; clearInterval(iv); }
        }, 35);
      });
    });
  }

  /* ============================================================
     12. MOBILE NAV
     ============================================================ */
  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const mob    = document.getElementById('nav-mobile');
    const close  = document.getElementById('nav-close');
    if (!toggle || !mob || !close) return;
    const open = () => { mob.classList.add('open'); toggle.setAttribute('aria-expanded','true'); };
    const shut = () => { mob.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); };
    toggle.addEventListener('click', open);
    close.addEventListener('click', shut);
    mob.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));
    document.addEventListener('keydown', e => { if(e.key==='Escape') shut(); });
    window.closeNav = shut;
  }

  /* ============================================================
     13. ACTIVE NAV
     ============================================================ */
  function initActiveNav() {
    const links = document.querySelectorAll('.nav-links a');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(a => a.classList.remove('active'));
          const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
          if (a) a.classList.add('active');
        }
      });
    }, { threshold: 0.4 });
    document.querySelectorAll('section[id]').forEach(s => io.observe(s));
  }

  /* ============================================================
     14. MARQUEE (GSAP ticker)
     ============================================================ */
  function initMarquee() {
    document.querySelectorAll('.marquee-track').forEach(track => {
      track.innerHTML += track.innerHTML;
      if (RM) return;
      const speed = parseFloat(track.dataset.speed || 0.6);
      let x = 0;
      const half = () => track.scrollWidth / 2;
      gsap.ticker.add(() => {
        x -= speed;
        if (Math.abs(x) >= half()) x = 0;
        gsap.set(track, { x });
      });
    });
  }

  /* ============================================================
     BOOT & INIT
     ============================================================ */
  window.addEventListener('load', () => {
    initThree();
    initCursor();
    initMobileNav();
    initActiveNav();
    initNavScramble();
    initMarquee();

    initLoader(() => {
      heroTextReveal();
      heroGSAP();
      // init scroll-based after boot so ScrollTrigger recalcs correctly
      initHorizontalProjects();
      initSectionReveals();
      initAnimeReveals();
      initParallax();
      initAnimateCSS();
      initMagnetic();
      ScrollTrigger.refresh();
    });
  });

})();
