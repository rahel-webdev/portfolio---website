/* =========================================================
   Rahel Mekonnen — Portfolio
   Vanilla JavaScript: theme toggle, nav behavior, scroll
   reveal animations, skill bars, and contact form validation.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbarScroll();
  initSmoothScrollSpy();
  initMobileNavClose();
  initRevealAnimations();
  initSkillBars();
  initBackToTop();
  initContactForm();
});

/* ---------- Theme toggle (light/dark) ---------- */
function initThemeToggle() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const icon = toggleBtn.querySelector('i');
  const STORAGE_KEY = 'rahel-portfolio-theme';

  const stored = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  toggleBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
  }
}

/* ---------- Sticky navbar shadow on scroll ---------- */
function initNavbarScroll() {
  const nav = document.getElementById('siteNavbar');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Scroll-spy active nav link ---------- */
function initSmoothScrollSpy() {
  const sections = Array.from(document.querySelectorAll('section[id], header[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-links .nav-link'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Close mobile nav after clicking a link ---------- */
function initMobileNavClose() {
  const navMenu = document.getElementById('navMenu');
  const links = navMenu.querySelectorAll('.nav-link, .btn-accent');

  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('show')) {
        const collapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        collapse.hide();
      }
    });
  });
}

/* ---------- Fade/slide-in reveal animations on scroll ---------- */
function initRevealAnimations() {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => entry.target.classList.add('visible'), Number(delay));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ---------- Animated skill proficiency bars ---------- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-progress .progress-bar');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          bar.style.width = `${width}%`;
          bar.setAttribute('aria-valuenow', width);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.4 },
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* ---------- Back to top floating button ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('visible', window.scrollY > 480);
    },
    { passive: true },
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Contact form client-side validation ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccess');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // No backend is connected yet — this simulates a successful submission.
    // To send messages for real, wire this form up to a server endpoint
    // (e.g. PHP mail(), a Node.js/Express route, or a Python/Flask route).
    successMessage.classList.remove('d-none');
    form.reset();
    form.classList.remove('was-validated');

    setTimeout(() => successMessage.classList.add('d-none'), 5000);
  });
}

