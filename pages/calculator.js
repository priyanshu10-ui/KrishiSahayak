// Pesticide Calculator Page
function renderCalculator() {
  const el = document.getElementById('page-calculator');
  el.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 space-y-6">
        <!-- Calculation Input -->
        <section class="bg-white rounded-xl p-6 border border-[#c2c9bb] shadow-sm">
          <div class="flex items-center gap-3 mb-6">
            <div class="bg-[#2d5a27] p-2 rounded-lg"><span class="material-symbols-outlined text-white">biotech</span></div>
            <h2 class="font-[Lexend] text-2xl font-medium text-[#154212]">Calculation Input</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="font-semibold text-sm text-[#42493e] px-1">Land Area</label>
              <div class="relative">
                <input id="calc-area" class="w-full p-3 bg-[#f8faf9] border border-[#c2c9bb] rounded-lg focus:ring-2 focus:ring-[#2d5a27] outline-none transition-all" placeholder="Enter value" type="number"/>
                <select id="calc-unit" class="absolute right-2 top-1.5 bg-[#e7e8e7] border-none rounded px-2 py-1.5 font-semibold text-sm focus:ring-0">
                  <option>Acres</option><option>Hectares</option>
                </select>
              </div>
            </div>
            <div class="space-y-2">
              <label class="font-semibold text-sm text-[#42493e] px-1">Crop Type</label>
              <div class="relative">
                <select id="calc-crop" class="w-full p-3 bg-[#f8faf9] border border-[#c2c9bb] rounded-lg focus:ring-2 focus:ring-[#2d5a27] outline-none appearance-none transition-all">
                  <option disabled selected value="">Select crop</option>
                  <option>Rice / Paddy</option><option>Wheat</option><option>Cotton</option><option>Maize</option><option>Sugarcane</option>
                </select>
                <span class="material-symbols-outlined absolute right-3 top-3 text-[#42493e] pointer-events-none">expand_more</span>
              </div>
            </div>
            <div class="md:col-span-2 space-y-2">
              <label class="font-semibold text-sm text-[#42493e] px-1">Target Pest / Disease</label>
              <div class="relative">
                <input id="calc-pest" class="w-full p-3 bg-[#f8faf9] border border-[#c2c9bb] rounded-lg focus:ring-2 focus:ring-[#2d5a27] outline-none transition-all" placeholder="e.g. Stem Borer, Leaf Blight" type="text"/>
                <span class="material-symbols-outlined absolute right-3 top-3 text-[#42493e]">search</span>
              </div>
            </div>
          </div>
          <button onclick="calculatePesticide()" class="w-full mt-8 bg-[#2d5a27] text-white py-4 rounded-xl font-[Lexend] text-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all">
            <span class="material-symbols-outlined">calculate</span> Calculate Requirements
          </button>
        </section>

        <!-- Results -->
        <section id="calc-results" class="bg-white rounded-xl border border-[#c2c9bb] shadow-sm overflow-hidden hidden">
          <div class="bg-[#154212]/5 p-6 border-b border-[#c2c9bb] flex justify-between items-center">
            <div>
              <h2 class="font-[Lexend] text-2xl font-medium text-[#154212]">Calculation Results</h2>
              <p class="text-[#42493e] text-xs" id="calc-summary">Generated for 5.0 Acres of Rice</p>
            </div>
            <div class="flex gap-2">
              <button class="p-2 bg-white border border-[#c2c9bb] rounded-lg hover:bg-stone-50 transition-colors shadow-sm"><span class="material-symbols-outlined text-[#2d5a27]" style="font-variation-settings:'FILL' 1;">share</span></button>
              <button class="p-2 bg-white border border-[#c2c9bb] rounded-lg hover:bg-stone-50 transition-colors shadow-sm"><span class="material-symbols-outlined text-[#2d5a27]" style="font-variation-settings:'FILL' 1;">bookmark</span></button>
            </div>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div class="bg-[#f3f4f3] p-4 rounded-xl border border-stone-100">
                <p class="font-semibold text-sm text-[#42493e] mb-1">Recommended Pesticide</p>
                <p class="font-[Lexend] text-xl font-medium text-[#154212]" id="res-pesticide">Monocrotophos 36% SL</p>
              </div>
              <div class="bg-[#f3f4f3] p-4 rounded-xl border border-stone-100">
                <p class="font-semibold text-sm text-[#42493e] mb-1">Total Dosage</p>
                <p class="font-[Lexend] text-xl font-medium text-[#154212]" id="res-dosage">2.5 Liters</p>
                <p class="text-xs text-[#42493e] mt-1" id="res-per-acre">(0.5 Liters per Acre)</p>
              </div>
              <div class="bg-[#f3f4f3] p-4 rounded-xl border border-stone-100 md:col-span-2">
                <p class="font-semibold text-sm text-[#42493e] mb-1">Water for Dilution</p>
                <div class="flex items-end gap-2">
                  <p class="font-[Lexend] text-xl font-medium text-[#154212]" id="res-water">1,000 Liters</p>
                  <p class="text-[#42493e] mb-0.5" id="res-water-rate">@ 200L / Acre</p>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <h3 class="font-semibold text-sm uppercase tracking-wider">Safety & PPE Recommendations</h3>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                ${['masks,Face Mask','front_hand,Gloves','visibility,Goggles','water_full,Boots'].map(i => {
                  const [icon,name] = i.split(',');
                  return `<div class="flex flex-col items-center p-3 rounded-lg border border-[#c2c9bb] bg-stone-50 text-center">
                    <span class="material-symbols-outlined text-[#895100] mb-1">${icon}</span>
                    <span class="text-xs font-bold">${name}</span>
                  </div>`;
                }).join('')}
              </div>
              <div class="bg-[#ffdad6]/30 p-4 rounded-lg border-l-4 border-[#ba1a1a] mt-4">
                <div class="flex gap-3">
                  <span class="material-symbols-outlined text-[#ba1a1a]">warning</span>
                  <p class="text-[#93000a] text-sm">Do not spray against the wind direction. Keep children and livestock away from the treated area for 48 hours.</p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button class="flex items-center justify-center gap-2 py-3 border-2 border-[#2d5a27] text-[#2d5a27] font-bold rounded-xl hover:bg-green-50 transition-colors">
                <span class="material-symbols-outlined">save</span> Save Calculation
              </button>
              <button class="flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:opacity-90 shadow-md">
                <span class="material-symbols-outlined">chat</span> Share to WhatsApp
              </button>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column -->
      <div class="lg:col-span-4 space-y-6">
        <section class="bg-[#e7e8e7] rounded-xl p-6 border border-[#c2c9bb]">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-[Lexend] text-xl font-medium">Recent Activity</h3>
            <button class="text-[#2d5a27] font-semibold text-sm hover:underline">View All</button>
          </div>
          <div class="space-y-3">
            ${[
              {name:'Cotton Field A',detail:'2.5 Ac • 2 days ago',icon:'grass',color:'secondary-fixed,secondary'},
              {name:'Wheat Plot 4',detail:'10.0 Ac • 1 week ago',icon:'agriculture',color:'tertiary-fixed,tertiary'},
              {name:'Sugarcane Block',detail:'1.2 Ac • 15 Oct',icon:'eco',color:'stone-200,stone-600',faded:true}
            ].map(h => `
              <div class="bg-white p-3 rounded-lg border border-stone-200 flex items-center gap-3 ${h.faded?'opacity-70':''}">
                <div class="bg-[${h.color.includes('secondary')?'#ffdcbc':h.color.includes('tertiary')?'#cbebc3':'#e7e5e4'}] text-[${h.color.includes('secondary')?'#895100':h.color.includes('tertiary')?'#253f23':'#57534e'}] p-2 rounded-lg">
                  <span class="material-symbols-outlined">${h.icon}</span>
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-sm">${h.name}</p>
                  <p class="text-xs text-[#42493e]">${h.detail}</p>
                </div>
                <span class="material-symbols-outlined text-[#42493e]">chevron_right</span>
              </div>
            `).join('')}
          </div>
        </section>

        <div class="relative overflow-hidden rounded-xl h-64 group">
          <img class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEXFAvOrpBOukQSDesxopKAsO1OF9hKNrwBazT2akICXQNlqQTw10YWjBoz4nUfOfMktotpU-aYfbXnuaxr-K5QIa-L3PDA9da-Th9ToIvF9GQ-SYV9uiPeLR0Xnv1P_Wm88c9M9EUVcDcqmPrHHP6i3g2uXbveBGHAfTjt0rLm1xwvPCtYR-jbfH90-6zJql-9HZxJqEpn56s__XEFwUm6RAzwvIbQK2TOnPdDHckWWlU__554IPNqULQ_hDTaaQRHKdsquozVDXr" alt="Guide"/>
          <div class="absolute inset-0 bg-gradient-to-t from-[#154212]/90 to-transparent flex flex-col justify-end p-6">
            <h4 class="text-white font-[Lexend] text-xl font-medium mb-2">Pest Management Guide</h4>
            <p class="text-white/80 text-sm mb-4">Learn about sustainable alternatives and biological pest control methods.</p>
            <button class="bg-white/20 backdrop-blur-md text-white border border-white/30 py-2 rounded-lg font-semibold text-sm hover:bg-white/30 transition-all">Read Guide</button>
          </div>
        </div>

        <section class="bg-white rounded-xl p-6 border border-[#c2c9bb] flex items-center gap-4">
          <div class="text-[#895100]"><span class="material-symbols-outlined text-4xl">sunny_snowing</span></div>
          <div>
            <p class="font-semibold text-sm">Ideal Spraying Window</p>
            <p class="text-sm text-green-700 font-bold">Good conditions expected at 6:00 AM</p>
            <p class="text-xs text-[#42493e] mt-1">Wind: 4km/h • Humidity: 65%</p>
          </div>
        </section>
      </div>
    </div>
  `;
}

function calculatePesticide() {
  const area = parseFloat(document.getElementById('calc-area').value);
  const crop = document.getElementById('calc-crop').value;
  const unit = document.getElementById('calc-unit').value;
  if (!area || !crop) { alert('Please enter land area and select a crop type.'); return; }

  const pesticideData = {
    'Rice / Paddy': {name:'Monocrotophos 36% SL', dosage:0.5, water:200},
    'Wheat': {name:'Chlorpyrifos 20% EC', dosage:0.4, water:150},
    'Cotton': {name:'Imidacloprid 17.8% SL', dosage:0.3, water:200},
    'Maize': {name:'Cypermethrin 25% EC', dosage:0.5, water:200},
    'Sugarcane': {name:'Fipronil 5% SC', dosage:0.6, water:250}
  };
  const data = pesticideData[crop];
  const totalDosage = (area * data.dosage).toFixed(1);
  const totalWater = Math.round(area * data.water);

  document.getElementById('calc-results').classList.remove('hidden');
  document.getElementById('calc-summary').textContent = `Generated for ${area} ${unit} of ${crop}`;
  document.getElementById('res-pesticide').textContent = data.name;
  document.getElementById('res-dosage').textContent = `${totalDosage} Liters`;
  document.getElementById('res-per-acre').textContent = `(${data.dosage} Liters per ${unit === 'Acres' ? 'Acre' : 'Hectare'})`;
  document.getElementById('res-water').textContent = `${totalWater.toLocaleString()} Liters`;
  document.getElementById('res-water-rate').textContent = `@ ${data.water}L / ${unit === 'Acres' ? 'Acre' : 'Hectare'}`;

  document.getElementById('calc-results').scrollIntoView({ behavior: 'smooth' });
}
