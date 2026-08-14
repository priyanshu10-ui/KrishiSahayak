// Dashboard Page Content
function renderDashboard() {
  const el = document.getElementById('page-dashboard');

  const savedVillage = localStorage.getItem("village");
  const savedDistrict = localStorage.getItem("district");
  const savedState = localStorage.getItem("state");

  let userAddress = "Jhansi, Uttar Pradesh";

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
      <p class="text-[#42493e]">Last updated: Today, 08:30 AM</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      <!-- Weather Widget -->
      <section class="md:col-span-12 lg:col-span-8 bg-white rounded-xl p-6 border border-stone-100 shadow-sm overflow-hidden relative">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h3 class="font-[Lexend] text-xl font-medium text-green-900 flex items-center gap-2">
              <span class="material-symbols-outlined">cloud_sync</span> Weather Forecast
            </h3>
            <!-- Dynamic User Address -->
            <p class="text-stone-500 text-sm font-semibold">${userAddress}</p>
          </div>
          <div class="flex items-center gap-4 bg-stone-50 px-4 py-2 rounded-full border border-stone-100">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-500">humidity_low</span>
              <span class="font-bold">62%</span>
            </div>
            <div class="w-px h-4 bg-stone-300"></div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-orange-500">air</span>
              <span class="font-bold">12 km/h</span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div class="md:col-span-2 flex items-center gap-4 bg-green-50/50 p-4 rounded-2xl border border-green-100/50">
            <span class="material-symbols-outlined text-6xl text-[#ffa536]" style="font-variation-settings:'FILL' 1;">light_mode</span>
            <div>
              <span class="text-4xl font-bold text-stone-900">28°C</span>
              <p class="text-stone-600 font-medium">Mostly Sunny</p>
            </div>
          </div>
          <div class="md:col-span-3 flex justify-between items-center gap-2 overflow-x-auto pb-2">
            ${['Tue,partly_cloudy_day,29,stone-500','Wed,rainy,24,blue-400','Thu,thunderstorm,22,blue-600','Fri,cloud,26,stone-500'].map(d => {
              const [day,icon,temp,color] = d.split(',');
              return `<div class="flex flex-col items-center p-3 min-w-[70px] ${day==='Thu'?'bg-stone-50 rounded-xl border border-stone-100':''}">
                <span class="text-xs font-bold text-stone-400 mb-2 uppercase">${day}</span>
                <span class="material-symbols-outlined text-${color} mb-2">${icon}</span>
                <span class="text-sm font-bold">${temp}°</span>
              </div>`;
            }).join('')}
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
            {name:'Wheat',price:'₹2,125',change:'+2.4%',up:true,color:'amber'},
            {name:'Rice',price:'₹1,940',change:'-0.8%',up:false,color:'blue'},
            {name:'Corn',price:'₹1,850',change:'+1.2%',up:true,color:'yellow'}
          ].map(c => `
            <div class="flex justify-between items-center p-3 hover:bg-stone-50 rounded-xl transition-colors border border-transparent hover:border-stone-100 cursor-pointer">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-${c.color}-100 rounded-full flex items-center justify-center text-${c.color}-800 font-bold">${c.name[0]}</div>
                <div><p class="font-bold text-sm">${c.name}</p><p class="text-xs text-stone-500">Per Quintal</p></div>
              </div>
              <div class="text-right">
                <p class="font-bold text-sm">${c.price}</p>
                <p class="text-xs ${c.up?'text-green-600':'text-red-500'} flex items-center justify-end gap-1">
                  <span class="material-symbols-outlined text-[14px]">${c.up?'arrow_upward':'arrow_downward'}</span>${c.change}
                </p>
              </div>
            </div>
          `).join('')}
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
            {name:'Winter Wheat',field:'Field A-1',date:'Oct 12, 2023',status:'OPTIMAL',statusColor:'green',stage:'Tillering',progress:65,ph:'6.8',moisture:'42%',
             img:'https://lh3.googleusercontent.com/aida-public/AB6AXuCDNHgsvKjJnHE2PQ1WcJQuqnrqNiW3AzaXv0VtuAkzkecJXF_pK3rf39P7RCleq2tpXA3ARcSeegvFBL3Ywxr5nPfrn4WXQXsX3vsnjp9XLOLwW1_2tLVIWnzQFmsLDRkolj6Urq7yrvvoCKBkX331ViwxBVVI5I1xcuj4t8_0Niqu3HEFhUmTdMtnE1YvLOWrYVlVuFK_18qdFGThP1DECqgAma0ZEZLtH9FCmyjd6weW1P1z-ZjJp1HVyozTPjA5wYJo6HznOHFV'},
            {name:'Yellow Maize',field:'Field B-4',date:'Nov 05, 2023',status:'ATTENTION',statusColor:'amber',stage:'Vegetative',progress:30,
             img:'https://lh3.googleusercontent.com/aida-public/AB6AXuBmPr5e3RvSJqNeK2hHoKx7gLXfJYmukYLpjsR2n_JAzWhZJAPxN1YZQlICOnZUqHgL_Rhws5v1r9L03cVetLiyEhcCjobgXZTy66fbpEOMBO6exXZGYBID1WihGWzvjFYR3nf4r6Dn1Dwmf4ebHzRWIisqQc1ZKY9PmqMwl01wNnoCkdUK1aqpTAGsgdIxPp5Nc3l5Ld-qAv5HWN9IrRwwlycdwHrwX4g0EbMZcMgjNGhuylFCM9cctwkNzyvK1rGWprB8J2HjbOg4',
             warning:'Low nitrogen levels detected. Fertilization recommended.'}
          ].map(crop => `
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
                  ${crop.ph ? `<div class="grid grid-cols-2 gap-4">
                    <div class="bg-stone-50 p-2 rounded-lg text-center"><p class="text-[10px] text-stone-400 uppercase font-bold">Soil pH</p><p class="text-sm font-bold text-stone-700">${crop.ph}</p></div>
                    <div class="bg-stone-50 p-2 rounded-lg text-center"><p class="text-[10px] text-stone-400 uppercase font-bold">Moisture</p><p class="text-sm font-bold text-stone-700">${crop.moisture}</p></div>
                  </div>` : ''}
                  ${crop.warning ? `<div class="bg-[#ffdad6]/30 border border-[#ffdad6] p-3 rounded-lg flex items-start gap-2">
                    <span class="material-symbols-outlined text-[#ba1a1a] text-lg">warning</span>
                    <p class="text-[11px] text-[#93000a] font-medium">${crop.warning}</p>
                  </div>` : ''}
                </div>
              </div>
            </div>
          `).join('')}
          <div onclick="navigateTo('crop-health')" class="bg-white rounded-2xl border border-stone-100 shadow-sm border-dashed flex flex-col items-center justify-center min-h-[300px] text-stone-400 hover:text-green-800 hover:bg-green-50/50 transition-all cursor-pointer">
            <span class="material-symbols-outlined text-4xl mb-2">add_circle</span>
            <p class="font-bold">Add New Crop Field</p>
            <p class="text-xs">Monitor health and soil analytics</p>
          </div>
        </div>
      </section>
    </div>
  `;
}