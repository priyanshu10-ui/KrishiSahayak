// ==========================================
// Krishi Sahayak - Main App Controller
// ==========================================


// ==========================================
// 1. INITIALIZE ALL PAGES
// ==========================================

function initApp() {

    // Render all pages
    renderDashboard();
    renderCropHealth();
    renderMarket();
    renderAIAssistant();
    renderCalculator();
    renderProfile();
    renderLogin();
    renderLanguage();

    // Show loading screen first.
    // Firebase auth.js will decide where to go next.
    navigateTo("splash");

setTimeout(() => {
    splashFinished = true;
    navigateTo("loading");
}, 2000); // Show splash for 2 seconds
}


// ==========================================
// 2. PAGE NAVIGATION
// ==========================================

function navigateTo(page) {

    // --------------------------------------
    // Hide all pages
    // --------------------------------------

    document.querySelectorAll(".page-content").forEach((p) => {
        p.classList.remove("active");
    });


    // --------------------------------------
    // Show requested page
    // --------------------------------------

    const target = document.getElementById("page-" + page);

    if (target) {

        target.classList.add("active");

    } else {

        console.error("Page not found:", page);
        return;
    }

const splash = document.getElementById("page-splash");

if (page === "splash") {
    splash.style.display = "flex";
} else {
    splash.style.display = "none";
}
    // --------------------------------------
    // Top Navigation Active State
    // --------------------------------------

    document.querySelectorAll(".nav-top-link").forEach((link) => {

        link.classList.toggle(
            "active",
            link.dataset.page === page
        );

    });


    // --------------------------------------
    // Side Navigation Active State
    // --------------------------------------

    document.querySelectorAll(".side-nav-link").forEach((link) => {

        if (link.dataset.page) {

            const isActive =
                link.dataset.page === page;

            link.classList.toggle(
                "active",
                isActive
            );

            const icon =
                link.querySelector(
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
    // Bottom Navigation Active State
    // --------------------------------------

    document.querySelectorAll(".bottom-nav-link").forEach((link) => {

        const isActive =
            link.dataset.page === page;

        link.classList.toggle(
            "active",
            isActive
        );

        const icon =
            link.querySelector(
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
    // 3. FLOATING AI BUTTON
    // ======================================

    const fab =
        document.getElementById("fab-ai");

    if (fab) {

        // Pages where AI button must NOT appear
        const hiddenPages = [
            "splash",
            "loading",
            "language",
            "login",
            "profile"
        ];

        if (hiddenPages.includes(page)) {

            fab.style.display = "none";

        } else if (page === "ai-assistant") {

            // Don't show AI button while already
            // on AI Assistant page
            fab.style.display = "none";

        } else {

            fab.style.display = "flex";
        }
    }


    // ======================================
    // 4. SCROLL TO TOP
    // ======================================

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// 5. START APPLICATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    initApp
);