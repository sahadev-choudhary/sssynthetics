// ─── S S SYNTHETICS — script.js ────────────────────────

// ── 1. NAVBAR: scroll behaviour ──────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
    navbar.classList.remove('hero-nav');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── 2. MOBILE HAMBURGER ───────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ── 3. SCROLL REVEAL ─────────────────────────────────────
const revealEls = document.querySelectorAll(
  '.cat-card, .feature-card, .testimonial-card, .about-card, .section-header'
);
revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  // Stagger delay inside parent containers
  const siblings = Array.from(el.parentElement.children);
  const idx = siblings.indexOf(el);
  if (idx > 0) el.classList.add(`reveal-delay-${Math.min(idx, 6)}`);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── 4. SMOOTH ANCHOR SCROLL ───────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── 5. FLOATING WA BUTTON — hide on CTA section ──────────
const floatBtn = document.getElementById('floatWhatsapp');
const ctaBanner = document.getElementById('contact');
const floatObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    floatBtn.style.opacity = entry.isIntersecting ? '0' : '1';
    floatBtn.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
  });
}, { threshold: 0.5 });
if (ctaBanner) floatObserver.observe(ctaBanner);

// ── 6. ACTIVE NAV LINK on scroll ─────────────────────────
const sections = document.querySelectorAll('section[id], div[id]');
const navAnchs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.getAttribute('id');
  });
  navAnchs.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--clr-gold)';
    }
  });
}, { passive: true });
