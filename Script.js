document.addEventListener('DOMContentLoaded', () => {
   
    const toggleBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark');
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            body.classList.toggle('dark');
            localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
        });
    });


    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            
            mobileMenu.classList.toggle('active'); 
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
              
                mobileMenu.classList.remove('active'); 
            });
        });
    }
});


(function () {
  'use strict';

  const observers = new Map();
  const cached = {};
  const listeners = [];

  function createObserver(name, callback, options = {}) {
    const obs = new IntersectionObserver(callback, { threshold: 0.1, ...options });
    observers.set(name, obs);
    return obs;
  }

  function addListener(target, event, handler, options = false) {
    target.addEventListener(event, handler, options);
    listeners.push({ target, event, handler, options });
  }

  function cleanup() {
    observers.forEach(obs => obs.disconnect());
    listeners.forEach(({ target, event, handler, options }) => {
      target.removeEventListener(event, handler, options);
    });
  }


  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href && href.endsWith('.html') && !href.startsWith('http')) {
      e.preventDefault();
      document.body.style.transition = 'opacity 0.25s ease';
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 260);
    }
  });

  function initReveal() {
    try {
      const selectors = [
        'h1','h2','h3',
        '.project-card', '[class*="card"]',
        '.skill-item', '[class*="skill"]',
        'section > div > p',
        'form', 'input', 'textarea',
        '.cert-card', '.edu-card',
        '[class*="course"]','[class*="badge"]',
      ];
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          if (!el.classList.contains('reveal') && !el.closest('.reveal')) {
            el.classList.add('reveal');
          }
        });
      });

      const observer = createObserver('reveal', (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, i * 70);
            observer.unobserve(entry.target);
          }
        });
      });

      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    } catch (err) { console.error('initReveal error:', err); }
  }

  function initUnderlines() {
    try {
      document.querySelectorAll('h2, h3').forEach(el => {
        el.classList.add('mc-underline');
      });

      const ulObserver = createObserver('underlines', (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            ulObserver.unobserve(e.target);
          }
        });
      }, { threshold: 0.5 });

      document.querySelectorAll('.mc-underline').forEach(el => ulObserver.observe(el));
    } catch (err) { console.error('initUnderlines error:', err); }
  }

  function initNavShrink() {
    try {
      cached.nav = cached.nav || document.querySelector('nav, .navbar, header');
      if (!cached.nav) return;
      addListener(window, 'scroll', () => {
        cached.nav.classList.toggle('scrolled', window.scrollY > 50);
      }, { passive: true });
    } catch (err) { console.error('initNavShrink error:', err); }
  }

  function initActiveNav() {
    try {
      cached.navLinks = cached.navLinks || document.querySelectorAll('nav a, .navbar a, .desktop-menu a');
      const current = window.location.pathname.split('/').pop() || 'Index.html';
      cached.navLinks.forEach(link => {
        const href = (link.getAttribute('href') || '').split('/').pop();
        if (href === current || (current === '' && href === 'Index.html')) {
          link.classList.add('active');
        }
      });
    } catch (err) { console.error('initActiveNav error:', err); }
  }

  function initParticles() {
    try {
      if (window.innerWidth < 768) return;
      
      const container = document.createElement('div');
      container.id = 'mc-particles';
      document.body.prepend(container);

      const count = window.innerWidth < 1200 ? 8 : 15;
      const colors = ['rgba(59,130,246,0.5)', 'rgba(168,85,247,0.4)', 'rgba(0,212,255,0.5)'];

      for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'mc-particle';
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
          left: ${Math.random() * 100}%;
          width: ${size}px;
          height: ${size}px;
          background: ${colors[Math.floor(Math.random() * colors.length)]};
          animation-duration: ${Math.random() * 12 + 8}s;
          animation-delay: ${Math.random() * -15}s;
        `;
        container.appendChild(p);
      }
    } catch (err) { console.error('initParticles error:', err); }
  }

  function initCursor() {
    try {
      if (window.matchMedia('(pointer: coarse)').matches) return;

      const cursor = document.createElement('div');
      cursor.id = 'mc-cursor';
      document.body.appendChild(cursor);

      let mouseX = -100, mouseY = -100;
      let curX = -100, curY = -100;
      let rafId;

      addListener(document, 'mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }, { passive: true });

      function animateCursor() {
        curX += (mouseX - curX) * 0.18;
        curY += (mouseY - curY) * 0.18;
        cursor.style.left = curX + 'px';
        cursor.style.top  = curY + 'px';
        rafId = requestAnimationFrame(animateCursor);
      }
      animateCursor();

      const toggleExpanded = (e) => {
        cursor.classList.toggle('expanded', e.type === 'mouseenter');
      };
      
      document.addEventListener('mouseenter', toggleExpanded, true);
      document.addEventListener('mouseleave', toggleExpanded, true);
      listeners.push({ target: document, event: 'mouseenter', handler: toggleExpanded, options: true });
      listeners.push({ target: document, event: 'mouseleave', handler: toggleExpanded, options: true });
    } catch (err) { console.error('initCursor error:', err); }
  }

  function initHeroEntrance() {
    try {
      cached.heroContent = cached.heroContent || document.querySelector(
        '.hero-content, .hero > div, section:first-of-type > div'
      );
      if (!cached.heroContent) return;
      [...cached.heroContent.children].forEach((child, i) => {
        child.classList.add('hero-animate');
        child.style.animationDelay = (i * 0.1 + 0.05) + 's';
      });
    } catch (err) { console.error('initHeroEntrance error:', err); }
  }

  function initTypewriter() {
    try {
      cached.typewriterTargets = cached.typewriterTargets || document.querySelectorAll(
        '[data-typewriter], .text-gradient, .hero-subtitle span, .typewriter-text'
      );
      cached.typewriterTargets.forEach(el => {
        if (!el.classList.contains('typewriter-text')) {
          el.classList.add('typewriter-text');
        }
      });
    } catch (err) { console.error('initTypewriter error:', err); }
  }

  function initSkillBars() {
    try {
      cached.bars = cached.bars || document.querySelectorAll('[data-width], .skill-fill, [style*="width"]');
      if (!cached.bars.length) return;
      const barObserver = createObserver('skillbars', (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target;
            const w = el.dataset.width || el.style.width;
            el.style.width = '0';
            setTimeout(() => { el.style.width = w; }, 100);
            barObserver.unobserve(el);
          }
        });
      }, { threshold: 0.3 });
      cached.bars.forEach(b => barObserver.observe(b));
    } catch (err) { console.error('initSkillBars error:', err); }
  }

  function initImageShimmer() {
    try {
      document.querySelectorAll('img').forEach(img => {
        if (!img.complete) {
          img.classList.add('mc-shimmer');
          const handler = () => img.classList.remove('mc-shimmer');
          addListener(img, 'load', handler);
        }
      });
    } catch (err) { console.error('initImageShimmer error:', err); }
  }

  function initFormEffects() {
    try {
      cached.formInputs = cached.formInputs || document.querySelectorAll('input, textarea');
      cached.formInputs.forEach(el => {
        const label = el.previousElementSibling;
        if (label && label.tagName === 'LABEL') {
          addListener(el, 'focus', () => {
            label.style.transition = 'color 0.25s';
            label.style.color = '#3b82f6';
          });
          addListener(el, 'blur', () => {
            label.style.color = '';
          });
        }
      });
    } catch (err) { console.error('initFormEffects error:', err); }
  }

  function initCounters() {
    try {
      cached.counters = cached.counters || document.querySelectorAll('[data-count]');
      const counterObserver = createObserver('counters', (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const el = e.target;
            const target = parseInt(el.dataset.count, 10);
            let start = 0;
            const step = target / 60;
            const timer = setInterval(() => {
              start += step;
              if (start >= target) { el.textContent = target; clearInterval(timer); }
              else el.textContent = Math.floor(start);
            }, 16);
            counterObserver.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      cached.counters.forEach(el => counterObserver.observe(el));
    } catch (err) { console.error('initCounters error:', err); }
  }

  function init() {
    initReveal();
    initUnderlines();
    initNavShrink();
    initActiveNav();
    initParticles();
    initCursor();
    initHeroEntrance();
    initTypewriter();
    initSkillBars();
    initImageShimmer();
    initFormEffects();
    initCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.addEventListener('beforeunload', cleanup);

})();
