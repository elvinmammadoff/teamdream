/* TeamDream v2.0 — main.js */

/* ── Dark Mode Toggle ── */
(function () {
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var html = document.documentElement;
      var isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      toggle.innerHTML = isDark
        ? '<i class="mdi mdi-weather-night"></i>'
        : '<i class="mdi mdi-white-balance-sunny"></i>';
    });
  }
}());

/* ── Department Filter Tabs ── */
(function () {
  var filterBtns = document.querySelectorAll('[data-filter]');
  if (!filterBtns.length) { return; }

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dep = btn.getAttribute('data-filter');

      document.querySelectorAll('[data-department]').forEach(function (el) {
        var match = dep === 'all' || el.getAttribute('data-department') === dep;
        el.style.display = match ? '' : 'none';
      });

      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });
  });
}());

/* ── Card Entrance Animation (IntersectionObserver) ── */
(function () {
  var cards = document.querySelectorAll('.td-card');
  if (!cards.length) { return; }

  if (!('IntersectionObserver' in window)) {
    cards.forEach(function (c) {
      c.style.opacity = '1';
      c.style.transform = 'none';
    });
    return;
  }

  cards.forEach(function (c) {
    c.style.opacity = '0';
    c.style.transform = 'translateY(20px)';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('td-visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  cards.forEach(function (c) { observer.observe(c); });
}());
