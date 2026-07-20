(function () {
  'use strict';

  // Apply theme immediately to prevent flash of wrong colour
  const _storedTheme = localStorage.getItem('preferred-theme');
  const _initTheme = _storedTheme ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', _initTheme);
  console.log('[debug] page load on', location.pathname, '| localStorage preferred-theme =', JSON.stringify(_storedTheme), '| preferred-lang =', JSON.stringify(localStorage.getItem('preferred-lang')));

  const LANGS = [
    { code: 'en', label: 'EN', htmlLang: 'en' },
    { code: 'zh', label: '中文', htmlLang: 'zh-CN' },
    { code: 'id', label: 'ID', htmlLang: 'id' },
    { code: 'fr', label: 'FR', htmlLang: 'fr' }
  ];

  // ── Shared components ──────────────────────────────────
  const langButtons = (extraClass) => LANGS.map(l =>
    `<button class="lang-btn${extraClass || ''}" data-lang="${l.code}" onclick="setLang('${l.code}')">${l.label}</button>`
  ).join('');

  const NAV_HTML = `
<nav class="nav" style="position:relative">
  <div class="nav-inner">
    <div class="nav-links">
      <a href="index.html" class="nav-link" data-en="Home" data-zh="首页" data-id="Beranda" data-fr="Accueil">Home</a>
      <a href="about.html" class="nav-link" data-en="About" data-zh="关于" data-id="Tentang" data-fr="À propos">About</a>
      <a href="experience.html" class="nav-link" data-en="Experience" data-zh="经历" data-id="Pengalaman" data-fr="Expérience">Experience</a>
      <a href="projects.html" class="nav-link" data-en="Projects" data-zh="项目" data-id="Proyek" data-fr="Projets">Projects</a>
      <a href="aerie.html" class="nav-link" data-en="Aerie" data-zh="Aerie" data-id="Aerie" data-fr="Aerie">Aerie</a>
      <a href="education.html" class="nav-link" data-en="Education" data-zh="教育" data-id="Pendidikan" data-fr="Formation">Education</a>
      <a href="certificates.html" class="nav-link" data-en="Certificates" data-zh="证书" data-id="Sertifikasi" data-fr="Certificats">Certificates</a>
      <a href="resume.html" class="nav-link" data-en="Resume" data-zh="简历" data-id="Resume" data-fr="CV">Resume</a>
    </div>
    <div class="nav-right">
      <div class="lang-toggle">${langButtons()}</div>
      <div class="lang-toggle">
        <button class="lang-btn theme-light-btn" onclick="setTheme('light')" data-en="Light" data-zh="浅色" data-id="Terang" data-fr="Clair">Light</button>
        <button class="lang-btn theme-dark-btn" onclick="setTheme('dark')" data-en="Dark" data-zh="深色" data-id="Gelap" data-fr="Sombre">Dark</button>
      </div>
      <button class="nav-hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
  <div class="nav-mobile">
    <a href="index.html" class="nav-link" data-en="Home" data-zh="首页" data-id="Beranda" data-fr="Accueil">Home</a>
    <a href="about.html" class="nav-link" data-en="About" data-zh="关于" data-id="Tentang" data-fr="À propos">About</a>
    <a href="experience.html" class="nav-link" data-en="Experience" data-zh="经历" data-id="Pengalaman" data-fr="Expérience">Experience</a>
    <a href="projects.html" class="nav-link" data-en="Projects" data-zh="项目" data-id="Proyek" data-fr="Projets">Projects</a>
    <a href="aerie.html" class="nav-link" data-en="Aerie" data-zh="Aerie" data-id="Aerie" data-fr="Aerie">Aerie</a>
    <a href="education.html" class="nav-link" data-en="Education" data-zh="教育" data-id="Pendidikan" data-fr="Formation">Education</a>
    <a href="certificates.html" class="nav-link" data-en="Certificates" data-zh="证书" data-id="Sertifikasi" data-fr="Certificats">Certificates</a>
    <a href="resume.html" class="nav-link" data-en="Resume" data-zh="简历" data-id="Resume" data-fr="CV">Resume</a>
    <div class="nav-mobile-toggles">
      <div class="lang-toggle">${langButtons()}</div>
      <div class="lang-toggle">
        <button class="lang-btn theme-light-btn" onclick="setTheme('light')" data-en="Light" data-zh="浅色" data-id="Terang" data-fr="Clair">Light</button>
        <button class="lang-btn theme-dark-btn" onclick="setTheme('dark')" data-en="Dark" data-zh="深色" data-id="Gelap" data-fr="Sombre">Dark</button>
      </div>
    </div>
  </div>
</nav>`;

  const FOOTER_HTML = `
<footer>
  <div class="footer-inner">
    <p class="footer-copy" data-en="© 2026 Albertus Erwin Susanto" data-zh="© 2026 阎余文" data-id="© 2026 Albertus Erwin Susanto" data-fr="© 2026 Albertus Erwin Susanto">© 2026 Albertus Erwin Susanto</p>
    <div class="footer-links">
      <a href="https://www.linkedin.com/in/albertus-erwin-s/" target="_blank" rel="noopener" class="footer-link">LinkedIn</a>
      <a href="https://github.com/aerwins-yyw" target="_blank" rel="noopener" class="footer-link">GitHub</a>
      <a href="https://www.instagram.com/aubert_erwin/" target="_blank" rel="noopener" class="footer-link">Instagram</a>
      <a href="mailto:erwinyen.data@gmail.com" class="footer-link">Email</a>
    </div>
  </div>
</footer>`;

  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // ── Theme toggle ──────────────────────────────────────
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('preferred-theme', theme);
      console.log('[debug] saved preferred-theme =', theme, '| readback =', localStorage.getItem('preferred-theme'));
    } catch (err) {
      console.error('[debug] localStorage.setItem(preferred-theme) threw:', err);
    }
    document.querySelectorAll('.theme-light-btn').forEach(b => b.classList.toggle('active', theme === 'light'));
    document.querySelectorAll('.theme-dark-btn').forEach(b => b.classList.toggle('active', theme === 'dark'));
  }
  window.setTheme = setTheme;

  // ── Language toggle ──────────────────────────────────────
  function setLang(lang) {
    try {
      localStorage.setItem('preferred-lang', lang);
      console.log('[debug] saved preferred-lang =', lang, '| readback =', localStorage.getItem('preferred-lang'));
    } catch (err) {
      console.error('[debug] localStorage.setItem(preferred-lang) threw:', err);
    }
    applyLang(lang);
  }

  function applyLang(lang) {
    const meta = LANGS.find(l => l.code === lang) || LANGS[0];
    document.documentElement.lang = meta.htmlLang;

    document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === meta.code);
    });

    document.querySelectorAll('[data-en]').forEach(el => {
      const val = el.dataset[meta.code];
      if (val !== undefined) el.textContent = val;
    });
  }

  window.setLang = setLang;

  // ── Active nav link ──────────────────────────────────────
  function setActiveNav() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = (link.getAttribute('href') || '').split('#')[0];
      const isHome = (current === '' || current === 'index.html') && href === 'index.html';
      link.classList.toggle('active', href === current || isHome);
    });
  }

  // ── Scroll fade-in ───────────────────────────────────────
  function initFadeIn() {
    const items = document.querySelectorAll('.fade-in');
    if (!items.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    items.forEach(el => obs.observe(el));
  }

  // ── Mobile hamburger ─────────────────────────────────────
  function initHamburger() {
    const btn = document.querySelector('.nav-hamburger');
    const menu = document.querySelector('.nav-mobile');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => menu.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) menu.classList.remove('open');
    });
  }

  // ── Init ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('preferred-lang') || 'en';
    applyLang(lang);
    setTheme(document.documentElement.getAttribute('data-theme') || 'light');
    setActiveNav();
    initFadeIn();
    initHamburger();
  });
})();
