// AI Assistant (Krishak) Page - Powered by Groq API Backend
let chatMessages = [
  { role: 'ai', text: 'Namaste! 🙏 I am <strong>Krishak</strong>, your AI farming assistant. Ask me anything about crops, soil health, pest management, weather, or mandi prices. I\'m here to help you grow better! 🌾', time: new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}) }
];
let chatHistory = []; // Standard OpenAI/Groq history format: [{ role: 'user'|'assistant', content: '...' }]

function renderAIAssistant() {
  const activeLanguage =
    localStorage.getItem("selectedLanguage") || "en";

  const t =
    (typeof translations !== 'undefined' && translations[activeLanguage]) ? translations[activeLanguage] : (typeof translations !== 'undefined' ? translations.en : {
      aiWelcome: "Namaste! 🙏 I am Krishak, your AI farming assistant. Ask me anything about crops, soil health, pest management, weather, or mandi prices. I'm here to help you grow better! 🌾",
      aiAssistantTitle: "Krishi Sahayak AI",
      aiOnline: "Online | Powered by AI",
      chatPlaceholder: "Type your query or use voice...",
      quickSupport: "Quick Support",
      whatsappSupport: "WhatsApp Support",
      immediateHelp: "Immediate help from our agents",
      communityForums: "Community Forums",
      connectFarmers: "Connect with other farmers",
      expertContacts: "Expert Contacts",
      soilScientists: "Soil scientists & agronomists",
      featuredSpecialist: "FEATURED SPECIALIST",
      expertName: "Dr. Sarah Verma",
      pestControlExpert: "Pest Control Expert"
    });

  if (chatMessages.length === 1 && chatMessages[0].role === "ai" && t.aiWelcome) {
    chatMessages[0].text = t.aiWelcome.replace(
      "Krishak",
      "<strong>Krishak</strong>"
    );
  }

  const el = document.getElementById('page-ai-assistant');
  if (!el) return;
  
  el.innerHTML = `
  <div class="w-full">
    <div class="flex flex-col md:flex-row h-[calc(100vh-64px)] w-full">
      <section class="flex-1 min-w-0 flex flex-col border-r border-stone-100 bg-white shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-stone-50 flex items-center justify-between flex-shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#2d5a27] flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-white">smart_toy</span>
            </div>
            <div>
              <h2 class="font-[Lexend] text-xl font-medium text-green-900 leading-snug">
                ${t.aiAssistantTitle || 'Krishi Sahayak AI'}
              </h2>
              <div class="flex items-center gap-1.5 mt-0.5">
                <span class="w-2 h-2 rounded-full bg-green-500"></span>
                <p class="text-xs text-stone-500">
                  ${t.aiOnline || 'Online | Powered by AI'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div id="chat-area" class="flex-1 min-w-0 overflow-y-auto p-6 space-y-6 bg-stone-50/30"></div>
        
        <div class="p-4 border-t border-stone-100 bg-white flex-shrink-0">
          <div id="chat-status" class="hidden text-xs text-stone-400 mb-2 px-2"></div>
          <div class="flex items-center gap-3 bg-stone-50 p-2 rounded-2xl border border-stone-200 shadow-sm focus-within:ring-2 focus-within:ring-[#2d5a27]/20 transition-all">
            <button class="p-2 text-stone-400 hover:text-[#154212] transition-colors"><span class="material-symbols-outlined">add_circle</span></button>
            <input id="chat-input" class="flex-1 border-none focus:ring-0 py-2 bg-transparent outline-none text-sm text-stone-800" placeholder="${t.chatPlaceholder || 'Type your query...'}" type="text" onkeypress="if(event.key==='Enter')sendMessage()"/>
            <div class="flex items-center gap-1">
              <button onclick="toggleVoice()" id="voice-btn" class="p-2.5 rounded-xl bg-white text-stone-600 border border-stone-200 hover:bg-[#ffa536] hover:text-white transition-all active:scale-95">
                <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">mic</span>
              </button>
              <button onclick="sendMessage()" id="send-btn" class="p-2.5 rounded-xl bg-[#154212] text-white hover:bg-[#2d5a27] transition-all active:scale-95">
                <span class="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <section class="w-full md:w-80 lg:w-96 p-6 space-y-6 overflow-y-auto bg-stone-50/50 hidden md:block flex-shrink-0 border-l border-stone-100">
        <h3 class="font-[Lexend] text-xl font-medium text-green-900 mb-4">
          ${t.quickSupport || 'Quick Support'}
        </h3>
        <div class="space-y-4">
          ${[
            {icon:'chat', title: t.whatsappSupport || 'WhatsApp Support', desc: t.immediateHelp || 'Immediate help from our agents', color:'green', ext:true},
            {icon:'groups', title: t.communityForums || 'Community Forums', desc: t.connectFarmers || 'Connect with other farmers', color:'amber'},
            {icon:'person_search', title: t.expertContacts || 'Expert Contacts', desc: t.soilScientists || 'Soil scientists & agronomists', color:'blue'}
          ].map(c => `
            <a class="group block bg-white p-4 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:border-[#2d5a27]/20 transition-all cursor-pointer">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-${c.color}-50 flex items-center justify-center text-${c.color}-600 group-hover:bg-${c.color}-600 group-hover:text-white transition-colors">
                  <span class="material-symbols-outlined">${c.icon}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-sm text-green-900">${c.title}</h4>
                  <p class="text-xs text-stone-500 truncate">${c.desc}</p>
                </div>
                <span class="material-symbols-outlined text-stone-300">${c.ext?'open_in_new':'chevron_right'}</span>
              </div>
            </a>`).join('')}
        </div>
        <div class="bg-[#2d5a27] rounded-2xl p-5 text-white shadow-lg overflow-hidden relative">
          <div class="relative z-10">
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-wider font-bold mb-4">${t.featuredSpecialist || 'FEATURED SPECIALIST'}</div>
            <div class="flex items-center gap-3 mb-4">
              <img class="w-12 h-12 rounded-full border-2 border-white/20 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsjNBqhjZMQvN2NwztMxZjS_kjvtiOydT2-8Hj9bhLfTZSr1g0pjsooCJaSmt2qJqCFeGSY5z_f210vPsv2p3ILbv8bJnCAx5vJWnphKwC8WbXSxkZyCjMayDns4Tq--N0pD9FbInVvTKZqI_uZPdtq1g66gmKdVXwBJNt7Q8NdU1MeRGeqf4gJzEMMrPz0esLKcU2yW1tveCQb0FetwdZOhHwH-NSyxIr8tegdL6S2AvFHUtA9EMqbvhY3hz5RKnUt13J7cLk2j0v" alt="Expert"/>
              <div>
                <h4 class="font-[Lexend] font-medium text-sm">${t.expertName || 'Dr. Sarah Verma'}</h4>
                <p class="text-xs text-white/70">${t.pestControlExpert || 'Pest Control Expert'}</p>
              </div>
            </div>
            <button class="w-full py-2.5 bg-white text-[#154212] rounded-xl font-bold text-xs shadow-md active:scale-95 transition-transform">Contact Specialist</button>
          </div>
          <div class="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>
      </section>
    </div>
  </div>`;
  renderAllMessages();
}

function renderAllMessages() {
  const area = document.getElementById('chat-area');
  if (!area) return;
  
  let html = chatMessages.map(m => m.role === 'ai' ? renderAIBubble(m) : renderUserBubble(m)).join('');
  
  if (chatMessages.length === 1) {
    html += `<div id="suggestion-cards" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
      ${[
        {q:'When should I harvest my wheat?', cat:'Crop Cycle'},
        {q:'Best fertilizer for tomatoes?', cat:'Soil Health'},
        {q:'How to identify pest attack on rice?', cat:'Pest Management'},
        {q:'What is the current mandi price of soybean?', cat:'Market Info'}
      ].map(s => `
        <button onclick="sendSuggestion('${s.q}')" class="text-left p-4 rounded-xl border border-stone-200 bg-white hover:border-[#2d5a27]/40 hover:bg-[#2d5a27]/5 transition-all group shadow-sm">
          <p class="font-semibold text-xs sm:text-sm text-stone-700 group-hover:text-[#154212]">"${s.q}"</p>
          <div class="flex items-center justify-between mt-2">
            <span class="text-[11px] text-stone-400 font-medium">${s.cat}</span>
            <span class="material-symbols-outlined text-stone-300 group-hover:text-[#2d5a27]" style="font-size:14px">arrow_forward_ios</span>
          </div>
        </button>`).join('')}
    </div>`;
  }
  area.innerHTML = html;
  scrollChat();
}

function renderAIBubble(m) {
  return `<div class="flex gap-3 max-w-[85%] sm:max-w-[75%] items-start">
    <div class="w-8 h-8 rounded-full bg-[#2d5a27]/10 flex-shrink-0 flex items-center justify-center mt-0.5">
      <span class="material-symbols-outlined text-[#154212] text-sm">smart_toy</span>
    </div>
    <div class="bg-white border border-stone-200/80 text-stone-800 p-4 rounded-2xl rounded-tl-none shadow-sm leading-relaxed text-sm break-words min-w-0">
      <div>${m.text}</div>
      <span class="text-[10px] text-stone-400 mt-2 block font-medium">${m.time}</span>
    </div>
  </div>`;
}

function renderUserBubble(m) {
  return `<div class="flex gap-3 max-w-[85%] sm:max-w-[75%] ml-auto flex-row-reverse items-start">
    <div class="w-8 h-8 rounded-full bg-[#2d5a27] flex-shrink-0 flex items-center justify-center mt-0.5">
      <span class="material-symbols-outlined text-white text-sm">person</span>
    </div>
    <div class="bg-[#2d5a27] text-white p-4 rounded-2xl rounded-tr-none shadow-sm leading-relaxed text-sm break-words min-w-0">
      <div>${m.text}</div>
      <span class="text-[10px] text-white/70 mt-2 block font-medium text-right">${m.time}</span>
    </div>
  </div>`;
}

function showTyping() {
  const area = document.getElementById('chat-area');
  if (!area || document.getElementById('typing-indicator')) return;
  
  const div = document.createElement('div');
  div.id = 'typing-indicator';
  div.className = 'flex gap-3 items-center';
  div.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-[#2d5a27]/10 flex-shrink-0 flex items-center justify-center">
      <span class="material-symbols-outlined text-[#154212] text-sm">smart_toy</span>
    </div>
    <div class="flex items-center gap-1.5 p-3.5 bg-white border border-stone-200 rounded-2xl rounded-tl-none shadow-sm">
      <span class="w-2 h-2 rounded-full bg-[#2d5a27] animate-bounce"></span>
      <span class="w-2 h-2 rounded-full bg-[#2d5a27] animate-bounce" style="animation-delay:0.2s"></span>
      <span class="w-2 h-2 rounded-full bg-[#2d5a27] animate-bounce" style="animation-delay:0.4s"></span>
    </div>
  `;
  area.appendChild(div);
  scrollChat();
}

function removeTyping() {
  const indicator = document.getElementById('typing-indicator');
  if (indicator) indicator.remove();
}

async function sendFarmerMessage(userText) {
  const messagePayload = [...chatHistory, { role: "user", content: userText }];

  try {
    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: messagePayload })
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(data.error || `Server responded with ${response.status}`);
    }

    const rawReply = data.reply;
    if (rawReply) {
      // Keep successful conversation in memory
      chatHistory.push({ role: "user", content: userText });
      chatHistory.push({ role: "assistant", content: rawReply });
      if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
      
      return rawReply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    }
    return "I couldn't generate a response. Please try rephrasing your question.";
  } catch (error) {
    console.error("Groq Backend Error:", error);
    return getFallbackResponse(userText);
  }
}

function getFallbackResponse(text) {
  const t = text.toLowerCase();
  const responses = {
    'wheat': '🌾 For wheat harvesting, the ideal time is when grain moisture content drops to 12-14%. Check if the stalk has turned golden brown.',
    'fertilizer': '🧪 For tomatoes, use balanced NPK (10-10-10) during early growth, then switch to high-potassium (5-10-15) during fruiting.',
    'yellow': '🍂 Yellow leaf edges in rice could indicate: 1) Potassium deficiency 2) Bacterial leaf blight 3) Iron deficiency. Upload a photo in Crop Health for AI diagnosis!',
    'pest': '🐛 Common signs of pest attack: holes in leaves, wilting, discoloration, sticky residue. Neem oil spray (5ml per liter) works effectively for many sucking pests.',
    'price': '📊 Check our Market Trends page for live mandi prices! Wheat is around ₹2,315/quintal, Cotton ₹7,125/quintal.',
    'mandi': '📊 Check our Market Trends page for live mandi prices! Wheat is around ₹2,315/quintal, Cotton ₹7,125/quintal.',
  };
  const key = Object.keys(responses).find(k => t.includes(k));
  return key ? responses[key] : '🌱 I am having trouble reaching the server right now. Please ensure your backend server is running (`node server.js`) on port 5000.';
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const now = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  chatMessages.push({ role: 'user', text, time: now });
  input.value = '';
  input.disabled = true;
  
  const sendBtn = document.getElementById('send-btn');
  if (sendBtn) sendBtn.disabled = true;

  document.getElementById('suggestion-cards')?.remove();
  renderAllMessages();
  showTyping();

  try {
    const aiResponse = await sendFarmerMessage(text);
    chatMessages.push({ 
      role: 'ai', 
      text: aiResponse, 
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) 
    });
  } catch (err) {
    console.error("UI Error in sendMessage:", err);
    chatMessages.push({ 
      role: 'ai', 
      text: "Something went wrong while connecting to the assistant. Please try again.", 
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) 
    });
  } finally {
    removeTyping();
    renderAllMessages();
    input.disabled = false;
    if (sendBtn) sendBtn.disabled = false;
    input.focus();
  }
}

function sendSuggestion(text) {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = text;
    sendMessage();
  }
}

function scrollChat() {
  setTimeout(() => {
    const area = document.getElementById('chat-area');
    if (area) area.scrollTop = area.scrollHeight;
  }, 100);
}

function toggleVoice() {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert('Voice input is not supported in this browser. Try Chrome or Edge.');
    return;
  }
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-IN';
  recognition.interimResults = false;

  const btn = document.getElementById('voice-btn');
  if (btn) {
    btn.classList.add('!bg-red-500', '!text-white');
  }

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const input = document.getElementById('chat-input');
    if (input) input.value = transcript;
    if (btn) {
      btn.classList.remove('!bg-red-500', '!text-white');
    }
    sendMessage();
  };
  
  recognition.onerror = () => {
    if (btn) btn.classList.remove('!bg-red-500', '!text-white');
  };
  recognition.onend = () => {
    if (btn) btn.classList.remove('!bg-red-500', '!text-white');
  };
  recognition.start();
}