document.addEventListener("DOMContentLoaded", function () {

    const languageBtn = document.getElementById("languageBtn");
    const languageSelector = document.getElementById("languageSelector");

    if (!languageBtn || !languageSelector) return;

    // ==========================================
    // CREATE LANGUAGE DROPDOWN
    // ==========================================

    const languageMenu = document.createElement("div");

    languageMenu.id = "languageMenu";

    languageMenu.style.display = "none";
    languageMenu.style.position = "absolute";
    languageMenu.style.top = "calc(100% + 8px)";
    languageMenu.style.right = "0";
    languageMenu.style.width = "150px";
    languageMenu.style.background = "white";
    languageMenu.style.border = "1px solid #e5e7eb";
    languageMenu.style.borderRadius = "10px";
    languageMenu.style.padding = "6px";
    languageMenu.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
    languageMenu.style.zIndex = "9999";
    languageMenu.style.flexDirection = "column";

    languageMenu.innerHTML = `
        <button class="language-option" data-lang="en">English</button>
        <button class="language-option" data-lang="hi">हिन्दी</button>
        <button class="language-option" data-lang="mr">मराठी</button>
        <button class="language-option" data-lang="pa">ਪੰਜਾਬੀ</button>
        <button class="language-option" data-lang="te">తెలుగు</button>
        <button class="language-option" data-lang="gu">ગુજરાતી</button>
    `;

    languageSelector.appendChild(languageMenu);


    // ==========================================
    // OPEN / CLOSE DROPDOWN
    // ==========================================

    languageBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        if (languageMenu.style.display === "none") {
            languageMenu.style.display = "flex";
        } else {
            languageMenu.style.display = "none";
        }

    });


    // ==========================================
    // LANGUAGE SELECTION
    // ==========================================

    const languageOptions =
        document.querySelectorAll(".language-option");

    languageOptions.forEach(function (option) {

        option.addEventListener("click", function (event) {

            event.stopPropagation();

            
            const selectedLanguage = this.textContent.trim();
            const selectedLangCode = this.dataset.lang;

            currentLanguage = selectedLangCode;

            localStorage.setItem("selectedLanguage", selectedLangCode);

            // Update language button immediately
            languageBtn.textContent = selectedLanguage + " ▼";

            languageMenu.style.display = "none";

            applyLanguage(selectedLangCode);

            languageMenu.style.display = "none";

    

        });

    });


    // ==========================================
    // APPLY LANGUAGE
    // ==========================================

    function applyLanguage(lang) {

        if (!translations[lang]) return;


            // CROP HEALTH LANGUAGE
            if (typeof applyCropHealthLanguage === "function") {


            // AI ASSISTANT LANGUAGE
            if (typeof renderAIAssistant === "function") {
                renderAIAssistant();
            }  
                applyCropHealthLanguage(lang);
            }
            // MARKET LANGUAGE
            if (typeof applyMarketLanguage === "function") {
                applyMarketLanguage(lang);
            }
            // MARKET LANGUAGE
            if (typeof applyMarketLanguage === "function") {
                applyMarketLanguage(lang);
            }




        // ==========================================
        // UPDATE LANGUAGE BUTTON
        // ==========================================

        const languageNames = {
            en: "English",
            hi: "हिन्दी",
            mr: "मराठी",
            pa: "ਪੰਜਾਬੀ",
            te: "తెలుగు",
            gu: "ગુજરાતી"
        };

        if (languageBtn) {
            languageBtn.textContent =
                (languageNames[lang] || "English") + " ▼";
        }


        // ==========================================
        // TOP NAVIGATION
        // ==========================================

        const topLinks =
            document.querySelectorAll(".nav-top-link");

        topLinks.forEach(function (link) {

            const page = link.dataset.page;

            if (page === "dashboard") {
                link.textContent =
                    translations[lang].dashboard;
            }

            if (page === "crop-health") {
                link.textContent =
                    translations[lang].cropHealth;
            }

            if (page === "market") {
                link.textContent =
                    translations[lang].marketTrends;
            }

            if (page === "ai-assistant") {
                link.textContent =
                    translations[lang].aiAssistant;
            }

        });


        // ==========================================
        // SIDEBAR
        // ==========================================

        const sideLinks =
            document.querySelectorAll(".side-nav-link");

        sideLinks.forEach(function (link) {

            const page = link.dataset.page;

            if (page === "dashboard") {
                link.lastChild.textContent =
                    " " + translations[lang].dashboard;
            }

            if (page === "crop-health") {
                link.lastChild.textContent =
                    " " + translations[lang].cropHealth;
            }

            if (page === "market") {
                link.lastChild.textContent =
                    " " + translations[lang].marketTrends;
            }

            if (page === "ai-assistant") {
                link.lastChild.textContent =
                    " " + translations[lang].aiAssistant;
            }

            if (page === "calculator") {
                link.lastChild.textContent =
                    " " + translations[lang].pesticideCalc;
            }

        });


        // ==========================================
        // SEARCH BOX
        // ==========================================

        const searchBox =
            document.getElementById("global-search");

        if (searchBox) {
            searchBox.placeholder =
                translations[lang].search;
        }


        // ==========================================
        // SETTINGS & SUPPORT
        // ==========================================

        const sideNavLinks =
            document.querySelectorAll(
                "#sidenav > div:last-child .side-nav-link"
            );

        if (sideNavLinks.length >= 2) {

            sideNavLinks[0].lastChild.textContent =
                " " + translations[lang].settings;

            sideNavLinks[1].lastChild.textContent =
                " " + translations[lang].support;

        }


        // ==========================================
        // HELP TEXT
        // ==========================================

        const helpText =
            document.querySelector(
                "#sidenav .text-xs.opacity-80"
            );

        if (helpText) {
            helpText.textContent =
                translations[lang].help;
        }


        // ==========================================
        // HELP CENTER BUTTON
        // ==========================================

        const helpButton =
            document.querySelector("#sidenav button");

        if (helpButton) {
            helpButton.textContent =
                translations[lang].helpCenter;


            // ==========================================
            // DASHBOARD LANGUAGE
            // ==========================================

            if (typeof applyDashboardLanguage === "function") {
                applyDashboardLanguage(lang);
            }
            if (typeof applyCropHealthLanguage === "function") {
                applyCropHealthLanguage(lang);
            }



        }
        // ==========================================
        // USER GREETING & PARTNER TEXT
        // ==========================================

        const greetingText =
            document.querySelector("#sidenav .text-stone-500.font-medium");

        if (greetingText) {
            greetingText.textContent =
                translations[lang].greeting;
        }


        const partnerText =
            document.querySelector("#sidenav .text-\\[10px\\]");

        if (partnerText) {
            partnerText.textContent =
                translations[lang].farmerPartner;
        }


        // ==========================================
        // LOGOUT BUTTON
        // ==========================================

        const logoutButton =
            document.querySelector("#user-area button");

        if (logoutButton) {
            logoutButton.textContent =
                translations[lang].logout;
        }

        // ==========================================
        // REFRESH DASHBOARD AFTER LANGUAGE CHANGE
        // ==========================================

        if (typeof renderDashboard === "function") {
            renderDashboard();
        }

        // REFRESH MARKET AFTER LANGUAGE CHANGE

        if (typeof renderMarket === "function") {
            renderMarket();
        }

        if (typeof applyMarketLanguage === "function") {
            applyMarketLanguage(lang);
        }

            }

        });