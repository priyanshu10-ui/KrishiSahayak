// Krishi Sahayak - Main App Controller

// Initialize Firebase (if configured)
function initFirebase() {
  try {
    if (typeof firebase !== 'undefined' && FIREBASE_CONFIG && FIREBASE_CONFIG.apiKey !== "PASTE_YOUR_FIREBASE_API_KEY_HERE") {
      firebase.initializeApp(FIREBASE_CONFIG);
      console.log('✅ Firebase initialized successfully');
    } else {
      console.log('ℹ️ Firebase not configured yet. App works fine without it.');
    }
  } catch (e) {
    console.log('ℹ️ Firebase setup skipped:', e.message);
  }
}

// Initialize all pages
function initApp() {
  initFirebase();
  renderDashboard();
  renderCropHealth();
  renderMarket();
  renderAIAssistant();
  renderCalculator();
  navigateTo('dashboard');
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
