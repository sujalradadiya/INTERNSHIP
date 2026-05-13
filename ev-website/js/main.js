/* ═══════════════════════════════════════════
   VoltGrid — Main JavaScript
   ═══════════════════════════════════════════ */

'use strict';

/* ── 1. LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 2000);
});

/* ── 2. NAVBAR: sticky + hamburger ── */
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── 3. SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* ── 4. SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
  .forEach(el => revealObserver.observe(el));

/* ── 5. COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const steps = 60;
  const step = target / steps;
  let current = 0;
  let count = 0;

  const timer = setInterval(() => {
    count++;
    current = Math.min(Math.round(step * count), target);
    el.textContent = formatNumber(current) + suffix;
    el.classList.add('counting');
    setTimeout(() => el.classList.remove('counting'), 300);
    if (current >= target) clearInterval(timer);
  }, duration / steps);
}

function formatNumber(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]')
  .forEach(el => counterObserver.observe(el));

/* ── 6. TESTIMONIAL SLIDER ── */
(function initSlider() {
  const track  = document.getElementById('tsTrack');
  const dotsWrap = document.getElementById('tsDots');
  if (!track) return;

  const cards = track.querySelectorAll('.ts-card');
  let current = 0;
  let autoTimer;

  // Build dots
  cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'ts-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(idx) {
    current = (idx + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap.querySelectorAll('.ts-dot').forEach((d, i) =>
      d.classList.toggle('active', i === current));
  }

  function autoSlide() {
    autoTimer = setInterval(() => goTo(current + 1), 5000);
  }

  document.getElementById('tsNext').addEventListener('click', () => {
    clearInterval(autoTimer);
    goTo(current + 1);
    autoSlide();
  });
  document.getElementById('tsPrev').addEventListener('click', () => {
    clearInterval(autoTimer);
    goTo(current - 1);
    autoSlide();
  });

  autoSlide();
})();

/* ── 7. DARK / LIGHT MODE TOGGLE ── */
const themeBtn = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('vg-theme') || 'light';
body.className = savedTheme + '-mode';
updateThemeIcon();

themeBtn.addEventListener('click', () => {
  const isDark = body.classList.contains('dark-mode');
  body.className = isDark ? 'light-mode' : 'dark-mode';
  localStorage.setItem('vg-theme', isDark ? 'light' : 'dark');
  updateThemeIcon();
});

function updateThemeIcon() {
  const icon = themeBtn.querySelector('i');
  icon.className = body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
}

/* ── 8. TYPEWRITER ── */
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const phrases = ['Future of Electric', 'Electric Mobility', 'Green Revolution', 'Cleaner Tomorrow'];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let waiting = false;

  function tick() {
    const phrase = phrases[phraseIdx];

    if (!deleting) {
      el.textContent = phrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === phrase.length) {
        waiting = true;
        deleting = true;
        setTimeout(tick, 2000);
        return;
      }
    } else {
      el.textContent = phrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 60 : 100);
  }

  tick();
})();

/* ── 9. HERO CHARGE BAR ANIMATION ── */
(function initHeroCharge() {
  const fill = document.getElementById('heroChargeFill');
  if (!fill) return;
  let pct = 0;
  const target = 74;
  const pctEl = document.querySelector('.cbw-pct');
  setTimeout(() => {
    const t = setInterval(() => {
      pct = Math.min(pct + 1, target);
      fill.style.width = pct + '%';
      if (pctEl) pctEl.textContent = pct + '%';
      if (pct >= target) clearInterval(t);
    }, 30);
  }, 2200);
})();

/* ── 10. FORM SUBMISSION ── */
function submitForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  const orig = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #22C55E, #16A34A)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = orig;
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 3000);
}

/* ── 11. SEARCH STATIONS (UI only) ── */
function searchStations() {
  const query = document.getElementById('stationSearch').value.trim();
  if (!query) return;
  const list = document.getElementById('stationList');
  // Flash feedback
  list.style.opacity = '0.5';
  setTimeout(() => { list.style.opacity = '1'; list.style.transition = 'opacity .4s'; }, 400);
}