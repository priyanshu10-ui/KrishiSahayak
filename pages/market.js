// Market Rates & Trends Page
function renderMarket() {
  const lang = localStorage.getItem("language") || "en";
  const t = translations[lang];
  const el = document.getElementById('page-market');
  el.innerHTML = `
    <div class="space-y-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 class="font-[Lexend] text-3xl font-medium text-[#154212]">${t.marketRates}</h1>
          <p class="text-[#42493e]">${t.marketDescription}</p>
        </div>
        <div class="flex gap-2">
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#72796e]">search</span>
            <input class="pl-10 pr-4 py-2.5 rounded-xl border border-[#c2c9bb] bg-white focus:ring-[#154212] focus:border-[#154212] w-full md:w-64" placeholder="${t.searchMarket}"/>
          </div>
          <button class="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#c2c9bb] rounded-xl font-semibold text-sm hover:bg-stone-50 transition-colors">
            <span class="material-symbols-outlined text-[20px]">filter_list</span> ${t.filters}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Price Chart -->
        <div class="lg:col-span-8 bg-white border border-stone-100 rounded-3xl p-6 shadow-sm">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="font-[Lexend] text-xl font-medium text-[#154212]">${t.priceVolatility}</h3>
              <p class="text-xs text-[#72796e]">${t.last30Days}</p>
            </div>
            <div class="flex gap-2 bg-[#edeeed] rounded-lg p-1">
              <button class="px-3 py-1 text-xs font-bold rounded-md bg-white shadow-sm">1M</button>
              <button class="px-3 py-1 text-xs font-medium text-[#72796e]">3M</button>
              <button class="px-3 py-1 text-xs font-medium text-[#72796e]">1Y</button>
            </div>
          </div>
          <div class="relative h-64 w-full chart-gradient rounded-xl border-b-2 border-l-2 border-stone-100 flex items-end px-4 gap-2">
            ${[40,55,45,60,75,65,50,40,48,62].map((h,i) => `
              <div class="flex-1 ${i===4?'bg-[#ffa536]':'bg-[#2d5a27]/'+[20,30,40,20,0,50,40,30,20,40][i]} h-[${h}%] rounded-t-sm relative group cursor-pointer hover:opacity-80 transition-opacity">
                ${i===4?'<div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#895100] text-white text-[10px] px-1.5 py-0.5 rounded">${t.peak}: ₹2,450</div>':''}
              </div>
            `).join('')}
          </div>
          <div class="flex justify-between mt-4 text-[10px] text-[#72796e] font-semibold">
            <span>01 OCT</span><span>10 OCT</span><span>20 OCT</span><span>30 OCT</span>
          </div>
        </div>

        <!-- Market News -->
        <div class="lg:col-span-4 space-y-6">
          <div class="bg-[#e1e3e2]/30 backdrop-blur-sm border border-white/50 rounded-3xl p-6">
            <h3 class="font-[Lexend] text-xl font-medium text-[#253f23] mb-4 flex items-center gap-2">
              <span class="material-symbols-outlined text-[#895100]">newspaper</span> ${t.marketNews}
            </h3>
            <div class="space-y-4">
              <article class="group cursor-pointer">
                <span class="text-[10px] font-bold text-[#895100] uppercase tracking-widest">${t.policyUpdate}</span>
                <h4 class="font-semibold text-sm mt-1 group-hover:text-[#154212] transition-colors">New MSP buffer stocks announced for Rabi Season.</h4>
                <p class="text-xs text-[#72796e] mt-1 line-clamp-2">The central government has approved a 15% increase in procurement targets...</p>
              </article>
              <hr class="border-stone-200"/>
              <article class="group cursor-pointer">
                <span class="text-[10px] font-bold text-green-700 uppercase tracking-widest">${t.globalShifts}</span>
                <h4 class="font-semibold text-sm mt-1 group-hover:text-[#154212] transition-colors">Soybean exports reach 3-year high amid supply gaps.</h4>
                <p class="text-xs text-[#72796e] mt-1">International demand from Southeast Asian markets continues to surge...</p>
              </article>
              <button class="w-full py-2 text-[#154212] font-bold text-xs border-2 border-[#154212]/10 rounded-xl hover:bg-[#154212]/5 transition-colors">${t.viewInsights}</button>
            </div>
          </div>
          <div class="relative overflow-hidden rounded-3xl h-48 group">
            <img class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFLIj7V3ozGw-NxJTED8nTp91sjGhpIiy8H7p-42LWCdjRFLpwiS2CxKDdRn5VkIpGekOkkX_ReFhp6RuL3PzjwemoQr--50_82G1uCQFtJC2m_LnktTOouBc2nN_W9yPiBOrjqDaA0ZZ3oJiihT6GhGtDa_2vuF369gcuuzapcvoFpTH78i17u0Eu0sTgmtuUjcrOg_xFU_TTV0htq5G9AzHg8lttbtuSWoCAXkzrl2S3VSnbqri6KdPP1VKNWxYgn_psaUfQOVjH" alt="Storage"/>
            <div class="absolute inset-0 bg-gradient-to-t from-[#154212]/90 to-transparent p-6 flex flex-col justify-end">
              <h4 class="text-white font-[Lexend] text-xl font-medium">${t.storage}</h4>
              <p class="text-white/80 text-xs">${t.storageDesc}</p>
            </div>
          </div>
        </div>

        <!-- Mandi Table -->
        <div class="lg:col-span-12 bg-white border border-stone-100 rounded-3xl overflow-hidden shadow-sm">
          <div class="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
            <h3 class="font-[Lexend] text-xl font-medium text-[#154212]">${t.liveMandi}</h3>
            <div class="flex gap-4">
              <div class="flex items-center gap-2 text-xs text-[#72796e]">
                <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> ${t.liveUpdates}
              </div>
              <button class="text-[#154212] font-semibold text-sm">${t.exportCSV}</button>
            </div>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-stone-50 text-[#72796e] text-xs uppercase tracking-wider">
                  <th class="px-6 py-4 font-bold">${t.commodity}</th>
                  <th class="px-6 py-4 font-bold">${t.mandiLocation}</th>
                  <th class="px-6 py-4 font-bold">${t.minPrice}</th>
                  <th class="px-6 py-4 font-bold">${t.maxPrice}</th>
                  <th class="px-6 py-4 font-bold">${t.modalPrice}</th>
                  <th class="px-6 py-4 font-bold">${t.trend}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-100">
                ${[
                  {name:'Wheat (Dara)',loc:'Indore, MP',min:'₹2,150',max:'₹2,480',modal:'₹2,315',trend:'+2.4%',up:true},
                  {name:'Cotton (Long)',loc:'Rajkot, GJ',min:'₹6,800',max:'₹7,450',modal:'₹7,125',trend:'-0.8%',up:false},
                  {name:'Soybean (Yellow)',loc:'Kota, RJ',min:'₹4,200',max:'₹4,600',modal:'₹4,450',trend:'0.0%',up:null},
                  {name:'Basmati Rice',loc:'Karnal, HR',min:'₹3,900',max:'₹4,850',modal:'₹4,420',trend:'+5.1%',up:true}
                ].map(r => `
                  <tr class="hover:bg-stone-50 transition-colors">
                    <td class="px-6 py-4 font-semibold">${r.name}</td>
                    <td class="px-6 py-4 text-[#42493e] flex items-center gap-2"><span class="material-symbols-outlined text-[16px] text-[#154212]">location_on</span> ${r.loc}</td>
                    <td class="px-6 py-4">${r.min}</td>
                    <td class="px-6 py-4">${r.max}</td>
                    <td class="px-6 py-4 font-bold text-[#154212]">${r.modal}</td>
                    <td class="px-6 py-4">
                      <span class="flex items-center gap-1 ${r.up===true?'text-green-600':r.up===false?'text-red-500':'text-stone-400'} font-bold text-xs">
                        <span class="material-symbols-outlined text-[18px]">${r.up===true?'trending_up':r.up===false?'trending_down':'trending_flat'}</span> ${r.trend}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-center gap-2">
            <button class="p-1 rounded hover:bg-stone-200"><span class="material-symbols-outlined">chevron_left</span></button>
            <span class="text-xs font-bold px-3 py-1 bg-[#154212] text-white rounded">1</span>
            <span class="text-xs px-3 py-1 text-[#72796e] cursor-pointer">2</span>
            <span class="text-xs px-3 py-1 text-[#72796e] cursor-pointer">3</span>
            <button class="p-1 rounded hover:bg-stone-200"><span class="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
      </div>
    </div>
  `;
}
