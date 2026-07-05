function renderLanguage() {

    const page = document.getElementById("page-language");

    page.innerHTML = `

    <div class="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">

        <div class="text-center">

            <h1 class="text-3xl font-bold text-green-700">

                🌾 Krishi Sahayak

            </h1>

            <p class="mt-3 text-gray-600">

                Select Your Language

            </p>

            <p class="text-gray-500">

                अपनी भाषा चुनें

            </p>

        </div>

        <div class="grid gap-4 mt-8">

            <button onclick="selectLanguage('English')" class="border rounded-lg p-4 hover:bg-green-50">
                🇬🇧 English
            </button>

            <button onclick="selectLanguage('Hindi')" class="border rounded-lg p-4 hover:bg-green-50">
                🇮🇳 हिन्दी
            </button>

            <button onclick="selectLanguage('Marathi')" class="border rounded-lg p-4 hover:bg-green-50">
                🇮🇳 मराठी
            </button>

            <button onclick="selectLanguage('Gujarati')" class="border rounded-lg p-4 hover:bg-green-50">
                🇮🇳 ગુજરાતી
            </button>

        </div>

    </div>

    `;

}

function selectLanguage(language){

    localStorage.setItem("language", language);

    navigateTo("login");

}