// ==========================================
// WEATHER HELPER (Open-Meteo API)
// ==========================================

// Maps WMO weather codes to Google Material Symbols & text descriptions
function getWeatherCondition(code) {
  if (code === 0) return { text: "Clear Sky", icon: "wb_sunny", color: "text-[#ffa536]" };
  if (code === 1 || code === 2) return { text: "Partly Cloudy", icon: "partly_cloudy_day", color: "text-stone-500" };
  if (code === 3) return { text: "Overcast", icon: "cloud", color: "text-stone-500" };
  if ([45, 48].includes(code)) return { text: "Foggy", icon: "foggy", color: "text-stone-400" };
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return { text: "Rainy", icon: "rainy", color: "text-blue-500" };
  if ([71, 73, 75, 85, 86].includes(code)) return { text: "Snowy", icon: "ac_unit", color: "text-blue-200" };
  if ([95, 96, 99].includes(code)) return { text: "Thunderstorm", icon: "thunderstorm", color: "text-blue-700" };
  return { text: "Mostly Sunny", icon: "light_mode", color: "text-[#ffa536]" };
}

// Fetch live weather using Open-Meteo
// ==========================================
// ROBUST WEATHER FETCHER (Open-Meteo)
// ==========================================

async function fetchLiveWeather(district, state, village) {
  const tempEl = document.getElementById("weather-temp");
  const descEl = document.getElementById("weather-desc");
  const iconEl = document.getElementById("weather-icon");
  const humidityEl = document.getElementById("weather-humidity");
  const windEl = document.getElementById("weather-wind");
  const forecastEl = document.getElementById("weather-forecast-list");

  // Fallback function to display an error state cleanly
  function setWeatherError(msg) {
    if (tempEl) tempEl.textContent = "--°C";
    if (descEl) descEl.textContent = msg || "Unavailable";
    if (forecastEl) forecastEl.innerHTML = `<span class="text-xs text-stone-400 p-2">Forecast unavailable</span>`;
  }

  try {
    // List search queries in order of precision: District -> Village -> State -> Default
    const queriesToTry = [district, village, state, "New Delhi"].filter(Boolean);
    let latitude = null;
    let longitude = null;

    // 1. Try finding coordinates using Geocoding API
    for (const query of queriesToTry) {
      try {
        const cleanQuery = query.replace(/East|West|North|South/gi, "").trim() || query;
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=1&language=en&format=json`
        );
        const geoData = await geoRes.json();

        if (geoData.results && geoData.results.length > 0) {
          latitude = geoData.results[0].latitude;
          longitude = geoData.results[0].longitude;
          break; // Found valid coordinates!
        }
      } catch (e) {
        console.warn(`Geocoding failed for query: ${query}`);
      }
    }

    // Default coordinates if nothing matched (e.g. Center of India)
    if (!latitude || !longitude) {
      latitude = 20.5937;
      longitude = 78.9629;
    }

    // 2. Fetch live weather & forecast
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max&timezone=auto`
    );
    const weatherData = await weatherRes.json();

    if (!weatherData.current) {
      setWeatherError("Data error");
      return;
    }

    const current = weatherData.current;
    const condition = getWeatherCondition(current.weather_code);

    // 3. Update DOM with live data
    if (tempEl) tempEl.textContent = `${Math.round(current.temperature_2m)}°C`;
    if (descEl) descEl.textContent = condition.text;
    if (iconEl) {
      iconEl.textContent = condition.icon;
      iconEl.className = `material-symbols-outlined text-6xl ${condition.color}`;
    }
    if (humidityEl) humidityEl.textContent = `${current.relative_humidity_2m}%`;
    if (windEl) windEl.textContent = `${Math.round(current.wind_speed_10m)} km/h`;

    // 4. Update forecast
    if (forecastEl && weatherData.daily && weatherData.daily.time) {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      let forecastHtml = "";

      for (let i = 1; i <= 4; i++) {
        if (!weatherData.daily.time[i]) break;
        const date = new Date(weatherData.daily.time[i]);
        const dayName = days[date.getDay()];
        const dayCode = weatherData.daily.weather_code[i];
        const dayTemp = Math.round(weatherData.daily.temperature_2m_max[i]);
        const dayCondition = getWeatherCondition(dayCode);

        forecastHtml += `
          <div class="flex flex-col items-center p-3 min-w-[70px]">
            <span class="text-xs font-bold text-stone-400 mb-2 uppercase">${dayName}</span>
            <span class="material-symbols-outlined ${dayCondition.color} mb-2">${dayCondition.icon}</span>
            <span class="text-sm font-bold text-stone-700">${dayTemp}°</span>
          </div>
        `;
      }
      forecastEl.innerHTML = forecastHtml;
    }
  } catch (err) {
    console.error("Failed to fetch weather data:", err);
    setWeatherError("Connection error");
  }
}

// ==========================================
// DASHBOARD PAGE RENDER
// ==========================================

function renderDashboard() {
  const el = document.getElementById("page-dashboard");

  // Read saved address
  const savedVillage = localStorage.getItem("village");
  const savedDistrict = localStorage.getItem("district");
  const savedState = localStorage.getItem("state");

  let userAddress = "Location not set";
  if (savedVillage && savedDistrict && savedState) {
    userAddress = `${savedVillage}, ${savedDistrict}, ${savedState}`;
  } else if (savedDistrict && savedState) {
    userAddress = `${savedDistrict}, ${savedState}`;
  } else if (savedState) {
    userAddress = savedState;
  }

  el.innerHTML = `
    <div class="mb-8">
      <h2 class="font-[Lexend] text-2xl font-medium text-[#191c1c] mb-1">Field Overview</h2>
      <p class="text-[#42493e]">Last updated: Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      
      <!-- Live Weather Widget -->
      <section class="md:col-span-12 lg:col-span-8 bg-white rounded-xl p-6 border border-stone-100 shadow-sm overflow-hidden relative">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h3 class="font-[Lexend] text-xl font-medium text-green-900 flex items-center gap-2">
              <span class="material-symbols-outlined">cloud_sync</span> Weather Forecast
            </h3>
            <p id="dashboard-user-address" class="text-stone-500 text-sm font-semibold">${userAddress}</p>
          </div>
          <div class="flex items-center gap-4 bg-stone-50 px-4 py-2 rounded-full border border-stone-100">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-500">humidity_low</span>
              <span id="weather-humidity" class="font-bold">--%</span>
            </div>
            <div class="w-px h-4 bg-stone-300"></div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-orange-500">air</span>
              <span id="weather-wind" class="font-bold">-- km/h</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div class="md:col-span-2 flex items-center gap-4 bg-green-50/50 p-4 rounded-2xl border border-green-100/50">
            <span id="weather-icon" class="material-symbols-outlined text-6xl text-[#ffa536]" style="font-variation-settings:'FILL' 1;">light_mode</span>
            <div>
              <span id="weather-temp" class="text-4xl font-bold text-stone-900">--°C</span>
              <p id="weather-desc" class="text-stone-600 font-medium">Fetching...</p>
            </div>
          </div>
          <div id="weather-forecast-list" class="md:col-span-3 flex justify-between items-center gap-2 overflow-x-auto pb-2">
            <div class="text-xs text-stone-400 p-3">Loading forecast...</div>
          </div>
        </div>
      </section>

      <!-- Market Rates Widget -->
      <section class="md:col-span-12 lg:col-span-4 bg-white rounded-xl p-6 border border-stone-100 shadow-sm">
        <h3 class="font-[Lexend] text-xl font-medium text-green-900 mb-6 flex items-center gap-2">
          <span class="material-symbols-outlined">trending_up</span> Top Market Rates
        </h3>
        <div class="space-y-4">
          ${[
            { name: "Wheat", price: "₹2,125", change: "+2.4%", up: true, color: "amber" },
            { name: "Rice", price: "₹1,940", change: "-0.8%", up: false, color: "blue" },
            { name: "Corn", price: "₹1,850", change: "+1.2%", up: true, color: "yellow" }
          ]
            .map(
              (c) => `
            <div class="flex justify-between items-center p-3 hover:bg-stone-50 rounded-xl transition-colors border border-transparent hover:border-stone-100 cursor-pointer">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-${c.color}-100 rounded-full flex items-center justify-center text-${c.color}-800 font-bold">${c.name[0]}</div>
                <div><p class="font-bold text-sm">${c.name}</p><p class="text-xs text-stone-500">Per Quintal</p></div>
              </div>
              <div class="text-right">
                <p class="font-bold text-sm">${c.price}</p>
                <p class="text-xs ${c.up ? "text-green-600" : "text-red-500"} flex items-center justify-end gap-1">
                  <span class="material-symbols-outlined text-[14px]">${c.up ? "arrow_upward" : "arrow_downward"}</span>${c.change}
                </p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
        <button onclick="navigateTo('market')" class="w-full mt-6 py-2 text-stone-500 font-semibold text-sm hover:text-green-800 flex items-center justify-center gap-2 group">
          View All Markets <span class="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
        </button>
      </section>

      <!-- Crop Health Section -->
      <section class="md:col-span-12">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-[Lexend] text-xl font-medium text-green-900 flex items-center gap-2">
            <span class="material-symbols-outlined">potted_plant</span> Current Crop Health
          </h3>
          <button class="bg-[#2d5a27] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg shadow-green-900/20 active:scale-95 transition-transform">
            <span class="material-symbols-outlined text-sm">add</span> Add Field
          </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${[
            { name: "Winter Wheat", field: "Field A-1", date: "Oct 12, 2023", status: "OPTIMAL", statusColor: "green", stage: "Tillering", progress: 65, ph: "6.8", moisture: "42%", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDNHgsvKjJnHE2PQ1WcJQuqnrqNiW3AzaXv0VtuAkzkecJXF_pK3rf39P7RCleq2tpXA3ARcSeegvFBL3Ywxr5nPfrn4WXQXsX3vsnjp9XLOLwW1_2tLVIWnzQFmsLDRkolj6Urq7yrvvoCKBkX331ViwxBVVI5I1xcuj4t8_0Niqu3HEFhUmTdMtnE1YvLOWrYVlVuFK_18qdFGThP1DECqgAma0ZEZLtH9FCmyjd6weW1P1z-ZjJp1HVyozTPjA5wYJo6HznOHFV" },
            { name: "Yellow Maize", field: "Field B-4", date: "Nov 05, 2023", status: "ATTENTION", statusColor: "amber", stage: "Vegetative", progress: 30, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmPr5e3RvSJqNeK2hHoKx7gLXfJYmukYLpjsR2n_JAzWhZJAPxN1YZQlICOnZUqHgL_Rhws5v1r9L03cVetLiyEhcCjobgXZTy66fbpEOMBO6exXZGYBID1WihGWzvjFYR3nf4r6Dn1Dwmf4ebHzRWIisqQc1ZKY9PmqMwl01wNnoCkdUK1aqpTAGsgdIxPp5Nc3l5Ld-qAv5HWN9IrRwwlycdwHrwX4g0EbMZcMgjNGhuylFCM9cctwkNzyvK1rGWprB8J2HjbOg4", warning: "Low nitrogen levels detected. Fertilization recommended." }
          ]
            .map(
              (crop) => `
            <div class="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden group">
              <div class="h-32 bg-stone-200 relative overflow-hidden">
                <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="${crop.img}" alt="${crop.name}"/>
                <div class="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-green-800 uppercase tracking-wider">${crop.field}</div>
              </div>
              <div class="p-5">
                <div class="flex justify-between items-start mb-4">
                  <div><h4 class="font-bold text-lg">${crop.name}</h4><p class="text-xs text-stone-500">Sown: ${crop.date}</p></div>
                  <div class="bg-${crop.statusColor}-100 text-${crop.statusColor}-800 px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1">
                    <span class="w-1.5 h-1.5 bg-${crop.statusColor}-600 rounded-full"></span>${crop.status}
                  </div>
                </div>
                <div class="space-y-4">
                  <div>
                    <div class="flex justify-between text-xs mb-1"><span class="text-stone-500">Growth Stage</span><span class="font-bold">${crop.stage}</span></div>
                    <div class="w-full h-2 bg-stone-100 rounded-full overflow-hidden"><div class="h-full bg-[#ffa536] rounded-full" style="width:${crop.progress}%"></div></div>
                  </div>
                  ${crop.ph ? `<div class="grid grid-cols-2 gap-4"><div class="bg-stone-50 p-2 rounded-lg text-center"><p class="text-[10px] text-stone-400 uppercase font-bold">Soil pH</p><p class="text-sm font-bold text-stone-700">${crop.ph}</p></div><div class="bg-stone-50 p-2 rounded-lg text-center"><p class="text-[10px] text-stone-400 uppercase font-bold">Moisture</p><p class="text-sm font-bold text-stone-700">${crop.moisture}</p></div></div>` : ""}
                  ${crop.warning ? `<div class="bg-[#ffdad6]/30 border border-[#ffdad6] p-3 rounded-lg flex items-start gap-2"><span class="material-symbols-outlined text-[#ba1a1a] text-lg">warning</span><p class="text-[11px] text-[#93000a] font-medium">${crop.warning}</p></div>` : ""}
                </div>
              </div>
            </div>
          `
            )
            .join("")}
          <div onclick="navigateTo('crop-health')" class="bg-white rounded-2xl border border-stone-100 shadow-sm border-dashed flex flex-col items-center justify-center min-h-[300px] text-stone-400 hover:text-green-800 hover:bg-green-50/50 transition-all cursor-pointer">
            <span class="material-symbols-outlined text-4xl mb-2">add_circle</span>
            <p class="font-bold">Add New Crop Field</p>
            <p class="text-xs">Monitor health and soil analytics</p>
          </div>
        </div>
      </section>
    </div>
  `;

  // Fetch and display live weather for saved district/state
  fetchLiveWeather(savedDistrict || savedVillage, savedState);
}