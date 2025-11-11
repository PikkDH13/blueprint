// --- INTELLIGENT THEME SWITCHER ---
const themeButton = document.getElementById('theme');
const docElement = document.documentElement;

const applyTheme = (theme) => {
  docElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
};

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

applyTheme(initialTheme);

themeButton?.addEventListener('click', () => {
  const currentTheme = docElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(newTheme);
});


// --- DYNAMIC FOOTER ---
const legalElement = document.getElementById('legal');
if (legalElement) {
  const currentYear = new Date().getFullYear();
  legalElement.textContent = `© ${currentYear} Dream Hive. Released CC BY 4.0. No cookies. No trackers.`;
}


// --- SHARE BUTTONS LOGIC ---
const copyLinkButton = document.getElementById('copy-link-btn');
const copyIcon = document.getElementById('copy-icon');
const checkIcon = document.getElementById('check-icon');

copyLinkButton?.addEventListener('click', () => {
  navigator.clipboard.writeText(window.location.href).then(() => {
    copyIcon.classList.add('hidden');
    checkIcon.classList.remove('hidden');
    setTimeout(() => {
      copyIcon.classList.remove('hidden');
      checkIcon.classList.add('hidden');
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy link: ', err);
  });
});


// --- VITA: MINDFUL SCROLL ANIMATION ---
const revealElements = document.querySelectorAll('.reveal');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1 // Trigger when 10% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: stop observing the element once it's visible
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach(el => {
  observer.observe(el);
});