const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.main-nav ul');
const body = document.body;

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    })
  );
}

const currentPage = body.dataset.page;
if (currentPage) {
  document
    .querySelectorAll(`.main-nav a[data-nav="${currentPage}"]`)
    .forEach((link) => link.classList.add('active'));
}

const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const animatedElements = document.querySelectorAll('[data-animate]');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay;
          if (delay) {
            entry.target.style.transitionDelay = `${delay}ms`;
          }
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  animatedElements.forEach((el) => observer.observe(el));
} else {
  animatedElements.forEach((el) => el.classList.add('visible'));
}
