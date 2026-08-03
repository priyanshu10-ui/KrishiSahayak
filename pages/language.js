let currentLanguage = localStorage.getItem("language") || "en";

function applyLanguage(language) {

    currentLanguage = language;

    localStorage.setItem("language", language);

    document.documentElement.lang = language;

    document.querySelectorAll("[data-key]").forEach(element => {

        const key = element.dataset.key;

        if (translations[language] && translations[language][key]) {

            element.textContent = translations[language][key];

        }

    });

    document.querySelectorAll("[data-placeholder]").forEach(input => {

        const key = input.dataset.placeholder;

        if (translations[language] && translations[language][key]) {

            input.placeholder = translations[language][key];

        }

    });

}

function changeLanguage(language) {

    applyLanguage(language);
    renderDashboard();
    renderCropHealth();
    renderMarket();
    renderAIAssistant();
    renderCalculator();
    renderProfile();
    renderLogin();
    renderLanguage();

}
document.addEventListener("DOMContentLoaded", () => {

    const lang = localStorage.getItem("language") || "en";

    const select = document.getElementById("languageSelect");

    if (select) {
        select.value = lang;
    }

    applyLanguage(lang);

});