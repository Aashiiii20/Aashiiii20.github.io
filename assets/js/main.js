/* Aashiya Bi portfolio interactions */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- sticky nav state ---- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    nav.classList.toggle('is-stuck', window.scrollY > 12);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- mobile menu ---- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  var closeMenu = function () {
    links.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---- scroll reveal ---- */
  var revealables = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = Array.prototype.slice.call(el.parentElement.children);
        var idx = siblings.filter(function (s) { return s.classList.contains('reveal'); }).indexOf(el);
        el.style.transitionDelay = Math.min(Math.max(idx, 0), 6) * 70 + 'ms';
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  }

  /* ---- animated stat counters ---- */
  var formatNum = function (n) {
    return n >= 1000 ? n.toLocaleString('en-US') : String(n);
  };
  var runCount = function (el) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = formatNum(target) + suffix; return; }
    var duration = 1400;
    var start = null;
    var step = function (ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = formatNum(Math.round(target * eased)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  var counters = document.querySelectorAll('[data-count]');
  if (!('IntersectionObserver' in window)) {
    counters.forEach(runCount);
  } else {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCount(entry.target);
        co.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---- card cursor glow ---- */
  if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* ---- active section in nav ---- */
  var sectionIds = ['about', 'services', 'work', 'experience', 'skills', 'research'];
  var navMap = {};
  sectionIds.forEach(function (id) {
    var a = document.querySelector('.nav__links a[href="#' + id + '"]');
    if (a) navMap[id] = a;
  });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var a = navMap[entry.target.id];
        if (!a) return;
        if (entry.isIntersecting) {
          Object.keys(navMap).forEach(function (k) { navMap[k].style.color = ''; });
          a.style.color = 'var(--accent-2)';
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sectionIds.forEach(function (id) {
      var s = document.getElementById(id);
      if (s) so.observe(s);
    });
  }
})();
