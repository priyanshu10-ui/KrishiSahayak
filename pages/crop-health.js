// Crop Health & Diagnosis Page
function renderCropHealth() {

  const lang = localStorage.getItem("language") || "en";
  const t = translations[lang];

  const el = document.getElementById('page-crop-health');
  el.innerHTML = `
    <section class="mb-10">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 class="font-[Lexend] text-2xl font-medium text-[#154212] mb-2">${t.cropManagement}</h2>
          <p class="text-[#42493e] max-w-xl">${t.cropManagementDesc}</p>
        </div>
        <div class="relative w-full md:w-80">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#72796e]">search</span>
          <input class="w-full pl-10 pr-4 py-3 bg-white border border-[#c2c9bb] rounded-xl focus:ring-2 focus:ring-[#154212] outline-none transition-all shadow-sm" placeholder="${t.searchCropDiseases}" type="text"/>
        </div>
      </div>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Upload Zone -->
      <div class="lg:col-span-8 group relative overflow-hidden bg-white border border-stone-100 rounded-[2rem] shadow-sm transition-all hover:shadow-md h-[400px]">
        <div class="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent"></div>
        <div id="upload-zone" class="relative h-full flex flex-col items-center justify-center p-8 border-4 border-dashed border-stone-100 m-4 rounded-[1.5rem] group-hover:border-[#2d5a27]/20 transition-colors">
          <div class="w-24 h-24 bg-[#bcf0ae] rounded-full flex items-center justify-center text-[#154212] mb-6 shadow-inner">
            <span class="material-symbols-outlined text-5xl">add_a_photo</span>
          </div>
          <h3 class="font-[Lexend] text-xl font-medium text-[#191c1c] mb-2">${t.uploadCropPhoto}</h3>
          <p class="text-[#42493e] text-center max-w-sm mb-8">Drag and drop your image here, or browse from your device. For best results, use high-quality close-ups of leaves.</p>
          <div class="flex gap-4">
            <button onclick="document.getElementById('file-input').click()" class="bg-[#2d5a27] text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-[#2d5a27]/20 active:scale-95 transition-transform">${t.browseGallery}</button>
            <button class="bg-white border-2 border-[#2d5a27] text-[#2d5a27] px-8 py-3 rounded-xl font-semibold active:scale-95 transition-transform">${t.openCamera}</button>
          </div>
          <input id="file-input" type="file" accept="image/*" class="hidden" onchange="handleImageUpload(event)"/>
        </div>
      </div>

      <!-- Health Stats -->
      <div class="lg:col-span-4 flex flex-col gap-6">
        <div class="flex-1 bg-[#ffa536] p-6 rounded-[2rem] text-[#2c1700] shadow-sm">
          <div class="flex justify-between items-start mb-4">
            <div class="p-2 bg-white/30 rounded-lg"><span class="material-symbols-outlined">health_and_safety</span></div>
            <span class="text-xs font-bold uppercase tracking-wider opacity-70">${t.weeklyStatus}</span>
          </div>
          <h4 class="font-[Lexend] text-xl font-medium mb-1">${t.healthScore}</h4>
          <div class="text-4xl font-extrabold mb-4">84%</div>
          <div class="h-2 w-full bg-white/20 rounded-full overflow-hidden mb-2"><div class="h-full bg-white w-[84%]"></div></div>
          <p class="text-sm opacity-80">Your crops are generally healthy. 2 alerts need attention.</p>
        </div>
        <div class="flex-1 bg-white border border-stone-100 p-6 rounded-[2rem] shadow-sm">
          <h4 class="font-semibold text-sm mb-4">${t.weatherImpact}</h4>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center text-[#895100]">
              <span class="material-symbols-outlined text-3xl">partly_cloudy_day</span>
            </div>
            <div><div class="font-bold text-lg">32°C</div><div class="text-xs text-[#42493e]">High Humidity Detected</div></div>
          </div>
          <div class="mt-4 p-3 bg-[#ffdad6] text-[#93000a] rounded-xl text-xs flex gap-2">
            <span class="material-symbols-outlined text-sm">warning</span> Fungal risk elevated for tomato crops.
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Diagnoses -->
    <section class="mt-16">
      <div class="flex items-center justify-between mb-8">
        <h3 class="font-[Lexend] text-xl font-medium text-[#154212]">${t.recentDiagnoses}</h3>
        <button class="text-[#2d5a27] font-semibold flex items-center gap-1 hover:underline">${t.viewHistory} <span class="material-symbols-outlined text-sm">arrow_forward</span></button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          {name:'Tomato (Roma)',disease:'Early Blight (Fungal)',time:'2h ago',badge:'Critical',badgeColor:'bg-[#ba1a1a]',diseaseColor:'text-[#ba1a1a]',desc:'Affects foliage and fruit. Spreads quickly in warm, humid weather. Immediate treatment required.',btn:'View Solution',icon:'medical_services',
           img:'https://lh3.googleusercontent.com/aida-public/AB6AXuD08YZk0mgAvvRiMF5GmyFxFYJhip8f4eNlQWGIg_z23nXBmk5R8hdJaM1sWNSIaly1vV25pWEEYZkvoNw8S15StZKeF7j7Avg_vIWSTUhwsmUHzAUWqS1kSFVsCR33YIhMMULRngZ5-TeleDjda54Wi3uuHQewINfAhav5KtlOwGvJkj4k4lzj0j8W7tMTsApmaBr7Yzgf-ijax4nm4DD3Lo7wD2KMlng30Qtlw4UKDFl5fS8cT7_ojuMYhYVw8N7fflOg_W1ajnJS'},
          {name:'Maize (Sweet Corn)',disease:'No Pathogens Detected',time:'Yesterday',badge:'Healthy',badgeColor:'bg-[#2d5a27]',diseaseColor:'text-[#2d5a27]',desc:'Crop shows optimal nitrogen levels and strong vigor. Continue current irrigation schedule.',btn:'Detailed Report',icon:'description',
           img:'https://lh3.googleusercontent.com/aida-public/AB6AXuBizTY3Ni0nLs6Nd_58ktaEORKIzB4gt_FNBmXTNAmnyZN0uMSK5Bg-wG7S8uUR4AHdQyj0Wn9rKGLIith9GT4JmNB4Zum9lJw4hYWamkB5z7ChycziOBwsGQclcxt9sRM8Nn6s_bmEz9xZg4FkUvEkSbXcROM9ytgt7b4QWfEjIrL-fe-N5tDHhFKkAIKuOhAOPnLGobuDHgpyO6ryTcqrtF-sPSw7bry6NS-g_PejFDvB9rQBq1Q0e5CExoA46FNUeKVLTFvPMFOQ'},
          {name:'Wheat (Durum)',disease:'Leaf Rust (Moderate)',time:'3 days ago',badge:'Warning',badgeColor:'bg-[#ffa536]',diseaseColor:'text-[#895100]',desc:'Signs of P. triticina found on lower leaves. Monitor spreading to upper canopy.',btn:'View Solution',icon:'medical_services',
           img:'https://lh3.googleusercontent.com/aida-public/AB6AXuB1O2tD8jWF7wptZo0fwlmx1okmwa8iT3AntGFRV32dgh53fmRrnu0QRbXkN8htQo4QD6Gr7UQ2RARjTc8B5NVSzHbKIJH-LYUQGNVnXi2Y25fuN2eYHTnp80GCLwiiSpj1vCORxPsMlx4ww0AJ3Wq4NglRnkIjoDUwzyPY6urv4fjmTrT4-7yWB9po8dOXZcEsGE3LKtxh2XOVro8IFBUNuYO9yHGXuNXE9vE1zZsjEmJrHAXceN-Z8N_siGHk3lQccOgPaRiMgVrU'}
        ].map(d => `
          <div class="bg-white border border-stone-100 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div class="relative h-48">
              <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${d.img}" alt="${d.name}"/>
              <div class="absolute top-3 right-3 ${d.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">${d.badge}</div>
            </div>
            <div class="p-5">
              <div class="flex justify-between items-start mb-2">
                <div><h4 class="font-bold text-lg">${d.name}</h4><p class="${d.diseaseColor} font-medium text-sm">${d.disease}</p></div>
                <span class="text-xs text-[#72796e]">${d.time}</span>
              </div>
              <p class="text-xs text-[#42493e] mb-6 line-clamp-2">${d.desc}</p>
              <button class="w-full bg-stone-50 border border-stone-200 text-[#2d5a27] py-2.5 rounded-xl font-bold hover:bg-[#2d5a27] hover:text-white transition-colors flex items-center justify-center gap-2">
                ${d.btn} <span class="material-symbols-outlined text-lg">${d.icon}</span>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- AI Promo -->
    <section class="mt-16 mb-10 bg-[#2d5a27] rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div class="flex-1 text-center md:text-left">
          <h3 class="font-[Lexend] text-3xl md:text-4xl font-semibold mb-4">${t.unsureSymptom}</h3>
          <p class="text-[#9dd090] text-lg mb-8 opacity-90">Chat with Krishi AI to get instant expert advice on soil health, pest management, and local weather patterns.</p>
          <button onclick="navigateTo('ai-assistant')" class="bg-white text-[#2d5a27] px-10 py-4 rounded-full font-extrabold text-lg shadow-xl active:scale-95 transition-transform">${t.startAIChat}</button>
        </div>
        <div class="w-48 h-48 bg-white/20 rounded-[2rem] flex items-center justify-center backdrop-blur-md border border-white/30">
          <span class="material-symbols-outlined text-[80px] text-white" style="font-variation-settings:'FILL' 1;">smart_toy</span>
        </div>
      </div>
    </section>
  `;
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const zone = document.getElementById('upload-zone');
  const reader = new FileReader();
  reader.onload = function(e) {
    zone.innerHTML = `
      <img src="${e.target.result}" class="max-h-64 rounded-xl shadow-lg mb-4" alt="Uploaded crop"/>
      <p class="text-green-800 font-bold text-lg mb-2">Image Uploaded Successfully!</p>
      <p class="text-stone-500 text-sm mb-4">AI is analyzing your crop image...</p>
      <div class="flex gap-2"><span class="typing-dot w-2 h-2 rounded-full bg-green-600"></span><span class="typing-dot w-2 h-2 rounded-full bg-green-600"></span><span class="typing-dot w-2 h-2 rounded-full bg-green-600"></span></div>
    `;
    setTimeout(() => {
      zone.innerHTML += `
        <div class="mt-6 p-4 bg-[#ffdad6]/30 border border-[#ffdad6] rounded-xl text-left w-full max-w-md">
          <h4 class="font-bold text-[#93000a] mb-1">⚠️ Possible: Early Blight Detected</h4>
          <p class="text-sm text-[#42493e]">Confidence: 87%. Consider applying Mancozeb fungicide. Consult AI Assistant for detailed treatment plan.</p>
          <button onclick="navigateTo('ai-assistant')" class="mt-3 bg-[#2d5a27] text-white px-6 py-2 rounded-lg font-bold text-sm">Ask Krishak AI</button>
        </div>`;
    }, 3000);
  };
  reader.readAsDataURL(file);
}