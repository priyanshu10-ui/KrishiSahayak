// Krishi Sahayak - Main App Controller

// Initialize all pages
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

    // Check saved language
    const savedLanguage = localStorage.getItem("language");

    if (savedLanguage) {
        navigateTo("dashboard");
    } else {
        navigateTo("language");
    }
}

// Page Navigation
function navigateTo(page) {

    // Hide all pages
    document.querySelectorAll(".page-content").forEach(p => {
        p.classList.remove("active");
    });

    // Show selected page
    const target = document.getElementById("page-" + page);
    if (target) {
        target.classList.add("active");
    }

    // Top Navigation
    document.querySelectorAll(".nav-top-link").forEach(link => {
        link.classList.toggle("active", link.dataset.page === page);
    });

    // Side Navigation
    document.querySelectorAll(".side-nav-link").forEach(link => {
        if (link.dataset.page) {

            link.classList.toggle("active", link.dataset.page === page);

            const icon = link.querySelector(".material-symbols-outlined");

            if (icon) {
                icon.style.fontVariationSettings =
                    link.dataset.page === page ? "'FILL' 1" : "'FILL' 0";
            }
        }
    });

    // Bottom Navigation
    document.querySelectorAll(".bottom-nav-link").forEach(link => {

        link.classList.toggle("active", link.dataset.page === page);

        const icon = link.querySelector(".material-symbols-outlined");

        if (icon) {
            icon.style.fontVariationSettings =
                link.dataset.page === page ? "'FILL' 1" : "'FILL' 0";
        }
    });

    // Floating AI Button
    const fab = document.getElementById("fab-ai");

    if (fab) {
        fab.style.display = page === "ai-assistant" ? "none" : "flex";
    }

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Start App
document.addEventListener("DOMContentLoaded", initApp);