/* ========== Portfolio interactions ========== */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* Custom cursor */
  const dot = $('.cursor-dot');
  const ring = $('.cursor-ring');
  const glow = $('.mouse-glow');
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
    if (glow) { glow.style.left = mx + 'px'; glow.style.top = my + 'px'; }
  });
  const loop = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    if (ring) { ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; }
    requestAnimationFrame(loop);
  };
  loop();
  $$('a, button, input, textarea, .chip, .project, .skill-card, .stat, .social-link')
    .forEach(el => {
      el.addEventListener('mouseenter', () => ring?.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring?.classList.remove('hover'));
    });

  /* Scroll progress */
  const bar = $('.scroll-progress');
  addEventListener('scroll', () => {
    const h = document.documentElement;
    const p = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (bar) bar.style.width = p + '%';
    $('.nav')?.classList.toggle('scrolled', scrollY > 30);
  });

  /* Active nav link on scroll */
  const sections = $$('section[id]');
  const links = $$('.nav-link');
  addEventListener('scroll', () => {
    const y = scrollY + 200;
    let cur = '';
    sections.forEach(s => { if (s.offsetTop <= y) cur = s.id; });
    links.forEach(l => l.classList.toggle('active', l.dataset.target === cur));
  });

  /* Smooth scroll for nav links */
  links.forEach(l => l.addEventListener('click', e => {
    e.preventDefault();
    const t = document.getElementById(l.dataset.target);
    if (t) {
      window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
      $('.nav-links')?.classList.remove('open');
    }
  }));
  $$('[data-scroll]').forEach(b => b.addEventListener('click', () => {
    const t = document.getElementById(b.dataset.scroll);
    if (t) window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' });
  }));

  /* Mobile nav */
  $('.nav-mobile-toggle')?.addEventListener('click',
    () => $('.nav-links')?.classList.toggle('open'));

  /* Theme toggle */
  const toggle = $('.theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') document.body.classList.add('light');
  const setIcon = () => toggle.textContent = document.body.classList.contains('light') ? '☀' : '☾';
  setIcon();
  toggle?.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
    setIcon();
  });

  /* Reveal on scroll */
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));

  /* Contact form */
  $('#contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target;
    const subject = encodeURIComponent(`Portfolio contact from ${f.name.value}`);
    const body = encodeURIComponent(`${f.message.value}\n\n— ${f.name.value} (${f.email.value})`);
    location.href = `mailto:likith.reddy.dev@gmail.com?subject=${subject}&body=${body}`;
  });
})();
