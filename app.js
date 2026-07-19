// Krishi Sahayak - Main App Controller

// Initialize all pages
function initApp() {

    renderDashboard();

    renderCropHealth();

    renderMarket();

    renderAIAssistant();

    renderCalculator();

    renderProfile();

    renderLogin();

    renderLanguage();

    const savedLanguage = localStorage.getItem("language");

    if (savedLanguage) {

         navigateTo("login");

    } else {

        navigateTo("language");

    }

    }

// Page Navigation
function navigateTo(page) {
  document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  document.querySelectorAll('.nav-top-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });

  document.querySelectorAll('.side-nav-link').forEach(l => {
    if (l.dataset.page) {
      l.classList.toggle('active', l.dataset.page === page);
      const icon = l.querySelector('.material-symbols-outlined');
      if (icon) icon.style.fontVariationSettings = l.dataset.page === page ? "'FILL' 1" : "'FILL' 0";
    }
  });

  document.querySelectorAll('.bottom-nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
    const icon = l.querySelector('.material-symbols-outlined');
    if (icon) icon.style.fontVariationSettings = l.dataset.page === page ? "'FILL' 1" : "'FILL' 0";
  });

  const fab = document.getElementById('fab-ai');
  if (fab) fab.style.display = page === 'ai-assistant' ? 'none' : 'flex';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', initApp);
