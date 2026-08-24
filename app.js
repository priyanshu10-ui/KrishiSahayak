// ==========================================
// Krishi Sahayak - Main App Controller
// ==========================================

// ==========================================
// 1. INITIALIZE ALL PAGES
// ==========================================

// ==========================================
// KRISHI SAHAYAK - APP STARTUP
// ==========================================

function initApp() {

    console.log("🚀 Krishi Sahayak starting...");

    // --------------------------------------
    // STEP 1: Show splash immediately
    // --------------------------------------

    navigateTo("splash");

    console.log("🌱 Splash screen displayed");


    // --------------------------------------
    // STEP 2: Render application pages
    // --------------------------------------

    try {

        renderDashboard();
        console.log("✅ Dashboard rendered");

        renderCropHealth();
        console.log("✅ Crop Health rendered");

        renderMarket();
        console.log("✅ Market rendered");

        renderAIAssistant();
        console.log("✅ AI Assistant rendered");

        renderCalculator();
        console.log("✅ Calculator rendered");

        renderProfile();
        console.log("✅ Profile rendered");

        renderLogin();
        console.log("✅ Login rendered");

        renderLanguage();
        console.log("✅ Language rendered");



        // Apply saved language after all pages are rendered
        const savedLanguage =
            localStorage.getItem("selectedLanguage") || "en";

        console.log("🌐 Applying saved language:", savedLanguage);

        if (typeof applyLanguage === "function") {
            applyLanguage(savedLanguage);
        }

    } catch (error) {

        console.error(
            "❌ Page rendering error:",
            error
        );

        // Even if another page has an error,
        // don't let the app get stuck on splash.
    }


    // --------------------------------------
    // STEP 3: Finish splash after 2 seconds
    // --------------------------------------

    setTimeout(() => {

        console.log("⏰ Splash timer finished");

        splashFinished = true;

        console.log(
            "splashFinished =",
            splashFinished
        );


        // ----------------------------------
        // Check Firebase user
        // ----------------------------------

        const user = auth.currentUser;

        console.log(
            "👤 Current Firebase user:",
            user
        );


        // ----------------------------------
        // USER LOGGED IN
        // ----------------------------------

        if (user) {

            console.log(
                "👤 Existing user found"
            );

            checkUserProfile(user);

        }


        // ----------------------------------
        // USER NOT LOGGED IN
        // ----------------------------------

        else {

            console.log(
                "🔐 No user found → Login"
            );

            hideAppNavigation();

            navigateTo("login");

        }

    }, 2000);
}


// ==========================================
// START APP
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    initApp
);

// ==========================================
// 2. PAGE NAVIGATION
// ==========================================

// ==========================================
// 2. PAGE NAVIGATION
// ==========================================

function navigateTo(page) {

    console.log("Navigating to:", page);

    // --------------------------------------
    // Dynamic re-render
    // --------------------------------------

    if (page === "dashboard") {
        renderDashboard();
    }

    if (page === "profile") {
        renderProfile();
    }

    // --------------------------------------
    // Hide ALL pages
    // --------------------------------------

    document.querySelectorAll(".page-content").forEach((p) => {
        p.classList.remove("active");
        p.style.display = "none";
    });

    // --------------------------------------
    // Show requested page
    // --------------------------------------

    const target = document.getElementById("page-" + page);

    if (!target) {
        console.error("❌ Page not found:", "page-" + page);
        return;
    }

    target.classList.add("active");
    target.style.display = "block";

    // --------------------------------------
    // Splash screen
    // --------------------------------------

    const splash = document.getElementById("page-splash");

    if (splash) {
        if (page === "splash") {
            splash.style.display = "flex";
        } else {
            splash.style.display = "none";
        }
    }

    // --------------------------------------
    // Top Navigation
    // --------------------------------------

    document.querySelectorAll(".nav-top-link").forEach((link) => {

        link.classList.toggle(
            "active",
            link.dataset.page === page
        );

    });

    // --------------------------------------
    // Side Navigation
    // --------------------------------------

    document.querySelectorAll(".side-nav-link").forEach((link) => {

        if (link.dataset.page) {

            const isActive = link.dataset.page === page;

            link.classList.toggle("active", isActive);

            const icon = link.querySelector(
                ".material-symbols-outlined"
            );

            if (icon) {
                icon.style.fontVariationSettings =
                    isActive
                        ? "'FILL' 1"
                        : "'FILL' 0";
            }
        }

    });

    // --------------------------------------
    // Bottom Navigation
    // --------------------------------------

    document.querySelectorAll(".bottom-nav-link").forEach((link) => {

        const isActive = link.dataset.page === page;

        link.classList.toggle("active", isActive);

        const icon = link.querySelector(
            ".material-symbols-outlined"
        );

        if (icon) {
            icon.style.fontVariationSettings =
                isActive
                    ? "'FILL' 1"
                    : "'FILL' 0";
        }

    });

    // ======================================
    // FLOATING AI BUTTON
    // ======================================

    const fab = document.getElementById("fab-ai");

    if (fab) {

        const hiddenPages = [
            "splash",
            "loading",
            "language",
            "login",
            "profile"
        ];

        if (
            hiddenPages.includes(page) ||
            page === "ai-assistant"
        ) {
            fab.style.display = "none";
        } else {
            fab.style.display = "flex";
        }

    }

    // --------------------------------------
    // Scroll to top
    // --------------------------------------

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ==========================================
// 5. START APPLICATION
// ==========================================

document.addEventListener("DOMContentLoaded", initApp);

function showAppNavigation() {
  const topNav = document.getElementById("topnav");
  const sideNav = document.getElementById("sidenav");
  const bottomNav = document.getElementById("bottomnav");

  if (topNav) topNav.style.display = "flex";
  if (sideNav) sideNav.style.display = "flex";
  if (bottomNav) bottomNav.style.display = "flex";
}

function hideAppNavigation() {
  const topNav = document.getElementById("topnav");
  const sideNav = document.getElementById("sidenav");
  const bottomNav = document.getElementById("bottomnav");

  if (topNav) topNav.style.display = "none";
  if (sideNav) sideNav.style.display = "none";
  if (bottomNav) bottomNav.style.display = "none";
}

function updateAppHeader() {
  const currentName = localStorage.getItem("userName") || "Farmer";
  const currentAvatar = localStorage.getItem("avatar");

  // Sidebar Greeting
  const sidebarGreeting = document.getElementById("sidebar-user-name");
  if (sidebarGreeting) {
    sidebarGreeting.textContent = currentName;
  }

  // Top Navbar Farmer Name
  const navUserName = document.getElementById("nav-user-name");
  if (navUserName) {
    navUserName.textContent = currentName;
  }

  // Top Navbar Avatar (with fallback generator)
  const navAvatar = document.getElementById("nav-user-avatar");
  if (navAvatar) {
    navAvatar.src = currentAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentName)}&background=2d5a27&color=fff&bold=true`;
  }
}