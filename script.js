document.addEventListener('DOMContentLoaded', function () {
  const nav = document.getElementById('mainNav');
  const links = Array.from(document.querySelectorAll('#navbarNav .nav-link'));
  const sections = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  // Frosted navbar once the page is scrolled
  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  // Highlight the nav link of the section currently in view
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (section) { observer.observe(section); });
  }

  // Light / dark theme toggle
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  function syncToggle() {
    const dark = root.getAttribute('data-bs-theme') === 'dark';
    toggle.innerHTML = '<i class="fas ' + (dark ? 'fa-sun' : 'fa-moon') + '"></i>';
    toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  }
  syncToggle();
  toggle.addEventListener('click', function () {
    const next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-bs-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    syncToggle();
  });

  // Close the mobile menu after choosing a link
  const menu = document.getElementById('navbarNav');
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      if (menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
});
