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

        if (typeof renderDashboard === "function") renderDashboard();
        console.log("✅ Dashboard rendered");

        if (typeof renderCropHealth === "function") renderCropHealth();
        console.log("✅ Crop Health rendered");

        if (typeof renderMarket === "function") renderMarket();
        console.log("✅ Market rendered");

        if (typeof renderSubsidies === "function") renderSubsidies();
        console.log("✅ Subsidies rendered");

        if (typeof renderAIAssistant === "function") renderAIAssistant();
        console.log("✅ AI Assistant rendered");

        if (typeof renderCalculator === "function") renderCalculator();
        console.log("✅ Calculator rendered");

        if (typeof renderProfile === "function") renderProfile();
        console.log("✅ Profile rendered");

        if (typeof renderAccount === "function") renderAccount();
        console.log("✅ Account rendered");

        if (typeof renderLogin === "function") renderLogin();
        console.log("✅ Login rendered");

        if (typeof renderLanguage === "function") renderLanguage();
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

        const user = typeof auth !== "undefined" ? auth.currentUser : null;
        const localPhone = localStorage.getItem("phone");
        const localUser = localStorage.getItem("userName");

        console.log(
            "👤 Current Firebase user:",
            user
        );


        // ----------------------------------
        // USER LOGGED IN
        // ----------------------------------

        if (user || localPhone || localUser) {

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

function navigateTo(page) {

    console.log("Navigating to:", page);

    // --------------------------------------
    // Dynamic re-render
    // --------------------------------------

    if (page === "dashboard" && typeof renderDashboard === "function") {
        renderDashboard();
    }

    if (page === "profile" && typeof renderProfile === "function") {
        renderProfile();
    }

    if (page === "account" && typeof renderAccount === "function") {
        renderAccount();
    }

    if (page === "subsidies" && typeof renderSubsidies === "function") {
        renderSubsidies();
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

function showAppNavigation() {
    const topNav = document.getElementById("topnav");
    const sideNav = document.getElementById("sidenav");

    if (topNav) topNav.style.display = "flex";
    if (sideNav) sideNav.style.display = "flex";
}

function hideAppNavigation() {
    const topNav = document.getElementById("topnav");
    const sideNav = document.getElementById("sidenav");

    if (topNav) topNav.style.display = "none";
    if (sideNav) sideNav.style.display = "none";
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

function checkUserProfile(user) {
    const savedVillage = localStorage.getItem("village");
    const savedState = localStorage.getItem("state");

    if (savedVillage && savedState) {
        showAppNavigation();
        updateAppHeader();
        navigateTo("dashboard");
    } else {
        hideAppNavigation();
        navigateTo("profile");
    }
}

function logout() {
    console.log("🚪 Logging out...");

    if (typeof auth !== "undefined" && auth.signOut) {
        auth.signOut().catch((err) => console.warn("Firebase signout omitted:", err));
    }

    localStorage.removeItem("userName");
    localStorage.removeItem("phone");
    localStorage.removeItem("avatar");
    localStorage.removeItem("loginMethod");
    localStorage.removeItem("village");
    localStorage.removeItem("district");
    localStorage.removeItem("state");
    localStorage.removeItem("crops");

    const navName = document.getElementById("nav-user-name");
    if (navName) navName.textContent = "Farmer";

    const sidebarName = document.getElementById("sidebar-user-name");
    if (sidebarName) sidebarName.textContent = "Farmer";

    const navAvatar = document.getElementById("nav-user-avatar");
    if (navAvatar) {
        navAvatar.src = "https://ui-avatars.com/api/?name=Farmer&background=2d5a27&color=fff&bold=true";
    }

    hideAppNavigation();
    navigateTo("login");
}

window.logout = logout;
window.logoutUser = logout;