// ==========================================
// WEATHER CONDITION
// ==========================================

// ==========================================
// WEATHER CONDITION - MULTILINGUAL
// ==========================================

function getWeatherCondition(code, lang = "en") {

    const t = translations[lang] || translations.en;

    if (code === 0)
        return {
            text: t.clearSky || "Clear Sky",
            icon: "wb_sunny",
            color: "text-[#ffa536]"
        };

    if (code === 1 || code === 2)
        return {
            text: t.partlyCloudy || "Partly Cloudy",
            icon: "partly_cloudy_day",
            color: "text-stone-500"
        };

    if (code === 3)
        return {
            text: t.overcast || "Overcast",
            icon: "cloud",
            color: "text-stone-500"
        };

    if ([45, 48].includes(code))
        return {
            text: t.foggy || "Foggy",
            icon: "foggy",
            color: "text-stone-400"
        };

    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
        return {
            text: t.rainy || "Rainy",
            icon: "rainy",
            color: "text-blue-500"
        };

    if ([71, 73, 75, 85, 86].includes(code))
        return {
            text: t.snowy || "Snowy",
            icon: "ac_unit",
            color: "text-blue-200"
        };

    if ([95, 96, 99].includes(code))
        return {
            text: t.thunderstorm || "Thunderstorm",
            icon: "thunderstorm",
            color: "text-blue-700"
        };

    return {
        text: t.mostlySunny || "Mostly Sunny",
        icon: "light_mode",
        color: "text-[#ffa536]"
    };
}
  // ==========================================
// FETCH LIVE WEATHER
// ==========================================

async function fetchLiveWeather(district, state, village) {

    const tempEl = document.getElementById("weather-temp");
    const descEl = document.getElementById("weather-desc");
    const iconEl = document.getElementById("weather-icon");
    const humidityEl = document.getElementById("weather-humidity");
    const windEl = document.getElementById("weather-wind");
    const forecastEl = document.getElementById("weather-forecast-list");

    function setWeatherError(message) {

        if (tempEl)
            tempEl.textContent = "--°C";

        if (descEl)
            descEl.textContent = message || "Unavailable";

        if (forecastEl)
            forecastEl.innerHTML =
                `<span class="text-xs text-stone-400 p-2">
                    Forecast unavailable
                </span>`;
    }

    try {

        // Location search
        const queriesToTry = [
            district,
            village,
            state,
            "New Delhi"
        ].filter(Boolean);

        let latitude = null;
        let longitude = null;

        // Find coordinates
        for (const query of queriesToTry) {

            try {

                const cleanQuery =
                    query
                        .replace(/East|West|North|South/gi, "")
                        .trim() || query;

                const geoRes = await fetch(
                    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=1&language=en&format=json`
                );

                const geoData = await geoRes.json();

                if (
                    geoData.results &&
                    geoData.results.length > 0
                ) {

                    latitude =
                        geoData.results[0].latitude;

                    longitude =
                        geoData.results[0].longitude;

                    break;
                }

            } catch (error) {

                console.warn(
                    "Geocoding failed:",
                    query
                );
            }
        }

        // Default India location
        if (
            latitude === null ||
            longitude === null
        ) {

            latitude = 20.5937;
            longitude = 78.9629;
        }

        // Fetch weather
        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max&timezone=auto`
        );

        const weatherData =
            await weatherRes.json();

        if (!weatherData.current) {

            setWeatherError("Data error");
            return;
        }

        const current =
            weatherData.current;

        // Current selected language
        const activeLanguage =
            typeof currentLanguage !== "undefined"
                ? currentLanguage
                : localStorage.getItem("selectedLanguage") || "en";

        const condition =
            getWeatherCondition(
                current.weather_code,
                activeLanguage
            );

        // Temperature
        if (tempEl) {

            tempEl.textContent =
                `${Math.round(current.temperature_2m)}°C`;
        }

        // Weather description
        if (descEl) {

            descEl.textContent =
                condition.text;
        }

        // Weather icon
        if (iconEl) {

            iconEl.textContent =
                condition.icon;

            iconEl.className =
                `material-symbols-outlined text-6xl ${condition.color}`;
        }

        // Humidity
        if (humidityEl) {

            humidityEl.textContent =
                `${current.relative_humidity_2m}%`;
        }

        // Wind
        if (windEl) {

            windEl.textContent =
                `${Math.round(current.wind_speed_10m)} km/h`;
        }

        // ==========================================
        // 4 DAY FORECAST
        // ==========================================

        if (
            forecastEl &&
            weatherData.daily &&
            weatherData.daily.time
        ) {

            const activeLanguage =
                typeof currentLanguage !== "undefined"
                    ? currentLanguage
                    : localStorage.getItem("selectedLanguage") || "en";

            const dayNames = {

                en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],

                hi: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],

                mr: ["रवि", "सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"],

                pa: ["ਐਤ", "ਸੋਮ", "ਮੰਗਲ", "ਬੁੱਧ", "ਵੀਰ", "ਸ਼ੁੱਕਰ", "ਸ਼ਨੀ"],

                te: ["ఆది", "సోమ", "మంగళ", "బుధ", "గురు", "శుక్ర", "శని"],

                gu: ["રવિ", "સોમ", "મંગળ", "બુધ", "ગુરુ", "શુક્ર", "શનિ"],

                ta: ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"]
            };

            const days =
                dayNames[activeLanguage] || dayNames.en;

            let forecastHTML = "";

            for (let i = 1; i <= 4; i++) {

                if (!weatherData.daily.time[i])
                    break;

                const date =
                    new Date(
                        weatherData.daily.time[i]
                    );

                const dayName =
                    days[date.getDay()];

                const dayCode =
                    weatherData.daily.weather_code[i];

                const dayTemp =
                    Math.round(
                        weatherData.daily.temperature_2m_max[i]
                    );

                const dayCondition =
                    getWeatherCondition(
                        dayCode,
                        activeLanguage
                    );

                forecastHTML += `
                    <div class="flex flex-col items-center p-3 min-w-[70px]">

                        <span class="text-xs font-bold text-stone-400 mb-2 uppercase">
                            ${dayName}
                        </span>

                        <span class="material-symbols-outlined ${dayCondition.color} mb-2">
                            ${dayCondition.icon}
                        </span>

                        <span class="text-sm font-bold text-stone-700">
                            ${dayTemp}°
                        </span>

                    </div>
                `;
            }

            forecastEl.innerHTML =
                forecastHTML;
        }

    } catch (error) {

        console.error(
            "Failed to fetch weather:",
            error
        );

        setWeatherError(
            "Connection error"
        );
    }
}


// ==========================================
// DASHBOARD RENDER
// ==========================================

function renderDashboard() {

    const el = document.getElementById("page-dashboard");

    if (!el) {
        console.error("Dashboard element not found!");
        return;
    }

    // Current language
    const activeLanguage =
        localStorage.getItem("selectedLanguage") || "en";

    const t =
        translations[activeLanguage] ||
        translations.en;

    // ==========================================
    // SAVED LOCATION
    // ==========================================

    const savedVillage =
        localStorage.getItem("village");

    const savedDistrict =
        localStorage.getItem("district");

    const savedState =
        localStorage.getItem("state");

    let userAddress =
        t.locationNotSet || "Location not set";

    if (
        savedVillage &&
        savedDistrict &&
        savedState
    ) {

        userAddress =
            `${savedVillage}, ${savedDistrict}, ${savedState}`;

    } else if (
        savedDistrict &&
        savedState
    ) {

        userAddress =
            `${savedDistrict}, ${savedState}`;

    } else if (savedState) {

        userAddress = savedState;
    }

    // ==========================================
    // DASHBOARD HTML
    // ==========================================

    el.innerHTML = `

        <!-- HEADER -->
        <div class="mb-8">

            <h2 class="font-[Lexend] text-2xl font-medium text-[#191c1c] mb-1">
                ${t.fieldOverview}
            </h2>

            <p class="text-[#42493e]">
                ${t.lastUpdated}
                ${t.today}
                ${t.weatherForecast}
            </p>

        </div>


        <!-- MAIN GRID -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">


            <!-- ================================== -->
            <!-- WEATHER -->
            <!-- ================================== -->

            <section
                class="md:col-span-12 lg:col-span-8 bg-white rounded-xl p-6 border border-stone-100 shadow-sm"
            >

                <div
                    class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
                >

                    <div>

                        <h3
                            class="font-[Lexend] text-xl font-medium text-green-900 flex items-center gap-2"
                        >

                            <span class="material-symbols-outlined">
                                cloud_sync
                            </span>

                            ${t.weatherForecast}

                        </h3>

                        <p
                            id="dashboard-user-address"
                            class="text-stone-500 text-sm font-semibold"
                        >
                            ${userAddress}
                        </p>

                    </div>


                    <!-- HUMIDITY + WIND -->

                    <div
                        class="flex items-center gap-4 bg-stone-50 px-4 py-2 rounded-full border border-stone-100"
                    >

                        <div class="flex items-center gap-2">

                            <span class="material-symbols-outlined text-blue-500">
                                humidity_low
                            </span>

                            <span
                                id="weather-humidity"
                                class="font-bold"
                            >
                                --%
                            </span>

                        </div>


                        <div class="w-px h-4 bg-stone-300"></div>


                        <div class="flex items-center gap-2">

                            <span class="material-symbols-outlined text-orange-500">
                                air
                            </span>

                            <span
                                id="weather-wind"
                                class="font-bold"
                            >
                                -- km/h
                            </span>

                        </div>

                    </div>

                </div>


                <!-- CURRENT WEATHER + FORECAST -->

                <div class="grid grid-cols-1 md:grid-cols-5 gap-6">


                    <!-- CURRENT WEATHER -->

                    <div
                        class="md:col-span-2 flex items-center gap-4 bg-green-50/50 p-4 rounded-2xl border border-green-100/50"
                    >

                        <span
                            id="weather-icon"
                            class="material-symbols-outlined text-6xl text-[#ffa536]"
                            style="font-variation-settings:'FILL' 1;"
                        >
                            light_mode
                        </span>


                        <div>

                            <span
                                id="weather-temp"
                                class="text-4xl font-bold text-stone-900"
                            >
                                --°C
                            </span>

                            <p
                                id="weather-desc"
                                class="text-stone-600 font-medium"
                            >
                                Loading...
                            </p>

                        </div>

                    </div>


                    <!-- FORECAST -->

                    <div
                        id="weather-forecast-list"
                        class="md:col-span-3 flex justify-between items-center gap-2 overflow-x-auto pb-2"
                    >

                        <div
                            class="text-xs text-stone-400 p-3"
                        >
                            Loading forecast...
                        </div>

                    </div>

                </div>

            </section>



            <!-- ================================== -->
            <!-- MARKET RATES -->
            <!-- ================================== -->

            <section
                class="md:col-span-12 lg:col-span-4 bg-white rounded-xl p-6 border border-stone-100 shadow-sm"
            >

                <h3
                    class="font-[Lexend] text-xl font-medium text-green-900 mb-6 flex items-center gap-2"
                >

                    <span class="material-symbols-outlined">
                        trending_up
                    </span>

                    ${t.topMarketRates}

                </h3>


                <div class="space-y-4">


                    <!-- WHEAT -->

                    <div
                        class="flex justify-between items-center p-3 rounded-xl border border-transparent hover:bg-stone-50"
                    >

                        <div class="flex items-center gap-3">

                            <div
                                class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 font-bold"
                            >
                                W
                            </div>

                            <div>

                                <p class="font-bold text-sm">
                                    Wheat
                                </p>

                                <p class="text-xs text-stone-500">
                                    ${t.perQuintal}
                                </p>

                            </div>

                        </div>


                        <div class="text-right">

                            <p class="font-bold text-sm">
                                ₹2,125
                            </p>

                            <p class="text-xs text-green-600">
                                ↑ +2.4%
                            </p>

                        </div>

                    </div>



                    <!-- RICE -->

                    <div
                        class="flex justify-between items-center p-3 rounded-xl border border-transparent hover:bg-stone-50"
                    >

                        <div class="flex items-center gap-3">

                            <div
                                class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold"
                            >
                                R
                            </div>

                            <div>

                                <p class="font-bold text-sm">
                                    Rice
                                </p>

                                <p class="text-xs text-stone-500">
                                    ${t.perQuintal}
                                </p>

                            </div>

                        </div>


                        <div class="text-right">

                            <p class="font-bold text-sm">
                                ₹1,940
                            </p>

                            <p class="text-xs text-red-500">
                                ↓ -0.8%
                            </p>

                        </div>

                    </div>



                    <!-- CORN -->

                    <div
                        class="flex justify-between items-center p-3 rounded-xl border border-transparent hover:bg-stone-50"
                    >

                        <div class="flex items-center gap-3">

                            <div
                                class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-800 font-bold"
                            >
                                C
                            </div>

                            <div>

                                <p class="font-bold text-sm">
                                    Corn
                                </p>

                                <p class="text-xs text-stone-500">
                                    ${t.perQuintal}
                                </p>

                            </div>

                        </div>


                        <div class="text-right">

                            <p class="font-bold text-sm">
                                ₹1,850
                            </p>

                            <p class="text-xs text-green-600">
                                ↑ +1.2%
                            </p>

                        </div>

                    </div>

                </div>


                <!-- VIEW ALL -->

                <button
                    onclick="navigateTo('market')"
                    class="w-full mt-6 py-2 text-stone-500 font-semibold text-sm hover:text-green-800 flex items-center justify-center gap-2"
                >

                    ${t.viewAllMarkets}

                    <span class="material-symbols-outlined text-sm">
                        arrow_forward
                    </span>

                </button>

            </section>



            <!-- ================================== -->
            <!-- CROP HEALTH -->
            <!-- ================================== -->

            <section class="md:col-span-12">

                <div
                    class="flex justify-between items-center mb-6"
                >

                    <h3
                        class="font-[Lexend] text-xl font-medium text-green-900 flex items-center gap-2"
                    >

                        <span class="material-symbols-outlined">
                            potted_plant
                        </span>

                        ${t.currentCropHealth}

                    </h3>


                    <button
                        class="bg-[#2d5a27] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2"
                    >

                        <span class="material-symbols-outlined text-sm">
                            add
                        </span>

                        ${t.addField}

                    </button>

                </div>


                <div
                    class="bg-white rounded-2xl border border-stone-100 shadow-sm p-6"
                >

                    <div class="grid grid-cols-2 gap-4">

                        <div
                            class="bg-stone-50 p-4 rounded-xl text-center"
                        >

                            <p class="text-xs text-stone-400 uppercase font-bold">
                                ${t.growthStage}
                            </p>

                            <p class="font-bold mt-2">
                                Tillering
                            </p>

                        </div>


                        <div
                            class="bg-stone-50 p-4 rounded-xl text-center"
                        >

                            <p class="text-xs text-stone-400 uppercase font-bold">
                                ${t.soilPH}
                            </p>

                            <p class="font-bold mt-2">
                                6.8
                            </p>

                        </div>


                        <div
                            class="bg-stone-50 p-4 rounded-xl text-center"
                        >

                            <p class="text-xs text-stone-400 uppercase font-bold">
                                ${t.moisture}
                            </p>

                            <p class="font-bold mt-2">
                                42%
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    `;


    // ==========================================
    // START LIVE WEATHER
    // ==========================================

    fetchLiveWeather(
        savedDistrict,
        savedState,
        savedVillage
    );

}