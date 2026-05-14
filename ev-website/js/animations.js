/* ═══════════════════════════════════════════
   VoltGrid — Animations JavaScript
   ═══════════════════════════════════════════ */

'use strict';

/* ── Parallax hero orbs on mouse move ── */
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;

    const orb1 = hero.querySelector('.orb-1');
    const orb2 = hero.querySelector('.orb-2');
    const orb3 = hero.querySelector('.orb-3');

    if (orb1) orb1.style.transform = `translate(${x * 30}px, ${y * 20}px)`;
    if (orb2) orb2.style.transform = `translate(${x * -20}px, ${y * 30}px)`;
    if (orb3) orb3.style.transform = `translate(${x * 15}px, ${y * -15}px)`;
  });
}

/* ── Stagger service cards reveal delay ── */
document.querySelectorAll('.service-card.reveal-up').forEach((card, i) => {
  card.style.setProperty('--delay', `${i * 0.08}s`);
});

/* ── Tilt effect on service cards ── */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform .5s ease';
  });
});

/* ── Price card tilt ── */
document.querySelectorAll('.price-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Navbar active link highlight ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.style.color = '';
    a.style.background = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--green-dark)';
      a.style.background = 'rgba(74,222,128,.1)';
    }
  });
}, { passive: true });

/* ── Custom Cursor Tracking ── */
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // Make it pop when hovering over links/buttons
  document.querySelectorAll('a, button, input, textarea, select, .map-pin').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering-link'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering-link'));
  });
}