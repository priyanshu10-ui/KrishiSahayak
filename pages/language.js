function renderLanguage() {
    document.getElementById("page-language").innerHTML = `
        <div class="flex flex-col items-center justify-center min-h-[80vh]">

            <h1 class="text-4xl font-bold text-green-700 mb-3">
                Welcome to Krishi Sahayak
            </h1>

            <p class="text-gray-600 mb-8">
                Please select your language
            </p>

            <div class="grid gap-4 w-72">

                <button onclick="selectLanguage('English')"
                    class="bg-green-700 text-white py-3 rounded-lg">
                    English
                </button>

                <button onclick="selectLanguage('Hindi')"
                    class="bg-green-700 text-white py-3 rounded-lg">
                    हिन्दी
                </button>

                <button onclick="selectLanguage('Marathi')"
                    class="bg-green-700 text-white py-3 rounded-lg">
                    मराठी
                </button>
                <button onclick="selectLanguage('Punjabi')"
                    class="bg-green-700 text-white py-3 rounded-lg">
                    ਪੰਜਾਬੀ
                </button>

                <button onclick="selectLanguage('Gujarati')"
                    class="bg-green-700 text-white py-3 rounded-lg">
                    ગુજરાતી
                </button>

                <button onclick="selectLanguage('Telugu')"
                    class="bg-green-700 text-white py-3 rounded-lg">
                    తెలుగు
                </button>

            </div>

        </div>
    `;
}

function selectLanguage(language) {

    localStorage.setItem("language", language);

    navigateTo("loading");

    setTimeout(() => {

        navigateTo("dashboard");

    }, 2000);

}
