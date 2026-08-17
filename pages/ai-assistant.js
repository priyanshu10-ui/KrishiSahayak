// AI Assistant (Krishak) Page - Powered by Gemini AI
let chatMessages = [
  { role: 'ai', text: 'Namaste! 🙏 I am <strong>Krishak</strong>, your AI farming assistant. Ask me anything about crops, soil health, pest management, weather, or mandi prices. I\'m here to help you grow better! 🌾', time: new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}) }
];
let chatHistory = []; // Stores conversation for Gemini context

function renderAIAssistant() {

    const activeLanguage =
      localStorage.getItem("selectedLanguage") || "en";

    const t =
      translations[activeLanguage] || translations.en;

    if (chatMessages.length === 1 && chatMessages[0].role === "ai") {
    chatMessages[0].text = t.aiWelcome.replace(
        "Krishak",
        "<strong>Krishak</strong>"
    );
}




    const el = document.getElementById('page-ai-assistant');
    el.innerHTML = `
    <div>
    <div class="flex flex-col md:flex-row h-[calc(100vh-64px)]">
      <section class="flex-1 flex flex-col border-r border-stone-100 bg-white shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-stone-50 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#2d5a27] flex items-center justify-center">
              <span class="material-symbols-outlined text-white">smart_toy</span>
            </div>
            <div>
              <h2 class="font-[Lexend] text-xl font-medium text-green-900">
                ${t.aiAssistantTitle}
              </h2>
              <div class="flex items-center gap-1"><span class="w-2 h-2 rounded-full bg-green-500"></span>
              <p class="text-xs text-stone-500">
                ${t.aiOnline}
              </p>
            </div>
          </div>
        </div>
        <div id="chat-area" class="flex-1 overflow-y-auto p-6 space-y-6"></div>
        <div class="p-4 border-t border-stone-100 bg-stone-50/50">
          <div id="chat-status" class="hidden text-xs text-stone-400 mb-2 px-2"></div>
          <div class="flex items-center gap-3 bg-white p-2 rounded-2xl border border-stone-200 shadow-sm focus-within:ring-2 focus-within:ring-[#2d5a27]/20 transition-all">
            <button class="p-2 text-stone-400 hover:text-[#154212] transition-colors"><span class="material-symbols-outlined">add_circle</span></button>
            <input id="chat-input" class="flex-1 border-none focus:ring-0 py-2 bg-transparent outline-none" placeholder="${t.chatPlaceholder}" type="text" onkeypress="if(event.key==='Enter')sendMessage()"/>
            <div class="flex items-center gap-1">
              <button onclick="toggleVoice()" id="voice-btn" class="p-2.5 rounded-xl bg-stone-50 text-stone-600 hover:bg-[#ffa536] hover:text-white transition-all active:scale-95">
                <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">mic</span>
              </button>
              <button onclick="sendMessage()" id="send-btn" class="p-2.5 rounded-xl bg-[#154212] text-white hover:bg-[#2d5a27] transition-all active:scale-95">
                <span class="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="w-full md:w-80 lg:w-96 p-6 space-y-6 overflow-y-auto bg-stone-50/30 hidden md:block">
        <h3 class="font-[Lexend] text-xl font-medium text-green-900 mb-4">
          ${t.quickSupport}
        </h3>
        <div class="space-y-4">
          ${[{icon:'chat',
            title: t.whatsappSupport,
            desc: t.immediateHelp, 
            color:'green',ext:true},{icon:'groups',title: t.communityForums,
            desc: t.connectFarmers,color:'amber'},{icon:'person_search',title: t.expertContacts,
            desc: t.soilScientists,color:'blue'}].map(c => `
            <a class="group block bg-white p-4 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:border-[#2d5a27]/20 transition-all cursor-pointer">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-${c.color}-50 flex items-center justify-center text-${c.color}-600 group-hover:bg-${c.color}-600 group-hover:text-white transition-colors"><span class="material-symbols-outlined">${c.icon}</span></div>
                <div class="flex-1"><h4 class="font-semibold text-sm text-green-900">${c.title}</h4><p class="text-xs text-stone-500">${c.desc}</p></div>
                <span class="material-symbols-outlined text-stone-300">${c.ext?'open_in_new':'chevron_right'}</span>
              </div>
            </a>`).join('')}
        </div>
        <div class="bg-[#2d5a27] rounded-2xl p-5 text-white shadow-lg overflow-hidden relative">
          <div class="relative z-10">
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-wider font-bold mb-4">${t.featuredSpecialist}</div>
            <div class="flex items-center gap-3 mb-4">
              <img class="w-12 h-12 rounded-full border-2 border-white/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsjNBqhjZMQvN2NwztMxZjS_kjvtiOydT2-8Hj9bhLfTZSr1g0pjsooCJaSmt2qJqCFeGSY5z_f210vPsv2p3ILbv8bJnCAx5vJWnphKwC8WbXSxkZyCjMayDns4Tq--N0pD9FbInVvTKZqI_uZPdtq1g66gmKdVXwBJNt7Q8NdU1MeRGeqf4gJzEMMrPz0esLKcU2yW1tveCQb0FetwdZOhHwH-NSyxIr8tegdL6S2AvFHUtA9EMqbvhY3hz5RKnUt13J7cLk2j0v" alt="Expert"/>
              <div><h4 class="font-[Lexend] font-medium">${t.expertName}</h4><p class="text-xs text-white/70">${t.pestControlExpert}</p></div>
            </div>
            <button class="w-full py-2.5 bg-white text-[#154212] rounded-xl font-bold text-sm shadow-md active:scale-95 transition-transform"></button>
          </div>
          <div class="absolute -right-4 -bottom-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        <div class="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm flex flex-col h-48 group">
          <div class="h-1/2 overflow-hidden">
            <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVkqWLwX3kbfXPQDd17--EKh0Fcc1bqxySQ8a6viEWpPRDyu8NTttp5DnZ3ch-0YUItMlyWyli5bzo19Uz1t42sghl0aocMY9WeMQT_1OGE3O6K5uVhU1xVMeyYueYpBsmHLIfp9AzLfkrYivMK_vfkO7ucKnlPSJPH4q7vNSUXSrrtwtwKtFcHPNeuozJJ3-H0qDQ6RFmX2mIklc29LWby1jOe0QGhD0sByUuEl1Hm1kW72cdOda4LdToO9I7cmwzuiJPEzExW_cX" alt="Learning"/>
          </div>
          <div class="p-3"><h5 class="font-semibold text-sm text-green-900">New: Organic Pest Control</h5><p class="text-[11px] text-stone-500">Video Guide • 12 mins</p></div>
        </div>
      </section>
    </div>`;
  renderAllMessages();
}

function renderAllMessages() {
  const area = document.getElementById('chat-area');
  if (!area) return;
  let html = chatMessages.map(m => m.role === 'ai' ? renderAIBubble(m) : renderUserBubble(m)).join('');
  // Add suggestion cards if only 1 message (initial)
  if (chatMessages.length === 1) {
    html += `<div id="suggestion-cards" class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
      ${[{q:'When should I harvest my wheat?',cat:'Crop Cycle'},{q:'Best fertilizer for tomatoes?',cat:'Soil Health'},{q:'How to identify pest attack on rice?',cat:'Pest Management'},{q:'What is the current mandi price of soybean?',cat:'Market Info'}].map(s => `
        <button onclick="sendSuggestion('${s.q}')" class="text-left p-4 rounded-xl border border-stone-100 bg-white hover:border-[#2d5a27]/30 hover:bg-[#2d5a27]/5 transition-all group">
          <p class="font-semibold text-sm text-stone-600 group-hover:text-[#154212]">"${s.q}"</p>
          <div class="flex items-center justify-between mt-2">
            <span class="text-xs text-stone-400">${s.cat}</span>
            <span class="material-symbols-outlined text-stone-300 group-hover:text-[#2d5a27]" style="font-size:14px">arrow_forward_ios</span>
          </div>
        </button>`).join('')}
    </div>`;
  }
  area.innerHTML = html;
  scrollChat();
}

function renderAIBubble(m) {
  return `<div class="flex gap-3 max-w-[85%]">
    <div class="w-8 h-8 rounded-full bg-stone-100 flex-shrink-0 flex items-center justify-center">
      <span class="material-symbols-outlined text-[#154212] text-sm">smart_toy</span>
    </div>
    <div class="chat-bubble-ai"><div>${m.text}</div><span class="text-[10px] text-stone-400 mt-2 block">${m.time}</span></div>
  </div>`;
}

function renderUserBubble(m) {
  return `<div class="flex gap-3 max-w-[85%] ml-auto flex-row-reverse">
    <div class="w-8 h-8 rounded-full bg-[#2d5a27] flex-shrink-0 flex items-center justify-center">
      <span class="material-symbols-outlined text-white text-sm">person</span>
    </div>
    <div class="chat-bubble-user"><p>${m.text}</p><span class="text-[10px] text-white/60 mt-2 block">${m.time}</span></div>
  </div>`;
}

function showTyping() {
  const area = document.getElementById('chat-area');
  if (!area) return;
  area.innerHTML += `<div id="typing-indicator" class="flex gap-3">
    <div class="w-8 h-8 rounded-full bg-stone-100 flex-shrink-0 flex items-center justify-center">
      <span class="material-symbols-outlined text-[#154212] text-sm">smart_toy</span>
    </div>
    <div class="flex items-center gap-1.5 p-3 bg-stone-50 rounded-2xl rounded-tl-none">
      <span class="typing-dot w-2 h-2 rounded-full bg-[#2d5a27]"></span>
      <span class="typing-dot w-2 h-2 rounded-full bg-[#2d5a27]"></span>
      <span class="typing-dot w-2 h-2 rounded-full bg-[#2d5a27]"></span>
    </div>
  </div>`;
  scrollChat();
}

function removeTyping() {
  document.getElementById('typing-indicator')?.remove();
}

// ======= GEMINI AI INTEGRATION =======
async function callGeminiAPI(userMessage) {
  const activeLanguage =
    localStorage.getItem("selectedLanguage") || "en";

  const selectedLanguage =
    translations[activeLanguage]?.aiLanguageName || "English";

  // Check if API key is configured
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "PASTE_YOUR_GEMINI_API_KEY_HERE") {
    return getFallbackResponse(userMessage);
  }

  try {
    // Build conversation history for context
    const contents = [];

    // Add system instruction as first user message
    contents.push({
      role: "user",
      parts: [{
        text: KRISHAK_SYSTEM_PROMPT +
          `\n\nPlease respond as Krishak from now on.
    Always answer the farmer in ${selectedLanguage}.
    Use simple, easy-to-understand language suitable for farmers.
    Do not switch to English unless the selected language is English.`
      }]
    });
    contents.push({
      role: "model",
      parts: [{ text: "Namaste! I am Krishak, your AI farming assistant. I'm ready to help you with any farming questions. 🌾" }]
    });

    // Add chat history for context
    chatHistory.forEach(msg => {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    });

    // Add current message
    contents.push({ role: "user", parts: [{ text: userMessage }] });

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Gemini API error:', err);
      return '⚠️ I\'m having trouble connecting right now. Please try again in a moment. If the issue persists, check your API key in config.js.';
    }

    const data = await response.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (aiText) {
      // Save to history for context
      chatHistory.push({ role: 'user', text: userMessage });
      chatHistory.push({ role: 'model', text: aiText });
      // Keep only last 10 exchanges
      if (chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
      // Format text: convert markdown bold and newlines to HTML
      return aiText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    }
    return 'I couldn\'t generate a response. Please try rephrasing your question.';

  } catch (error) {
    console.error('Gemini API error:', error);
    return getFallbackResponse(userMessage);
  }
}

// Fallback responses when API key is not set
function getFallbackResponse(text) {
  const t = text.toLowerCase();
  const responses = {
    'wheat': '🌾 For wheat harvesting, the ideal time is when grain moisture content drops to 12-14%. Check if the stalk has turned golden brown. In Punjab, Rabi wheat is typically harvested in April.<br><br><em>💡 Tip: Add your Gemini API key in config.js for smarter, personalized answers!</em>',
    'fertilizer': '🧪 For tomatoes, use balanced NPK (10-10-10) during early growth, then switch to high-potassium (5-10-15) during fruiting. Apply 2-3 kg per acre every 2 weeks.<br><br><em>💡 Tip: Add your Gemini API key in config.js for detailed recommendations!</em>',
    'yellow': '🍂 Yellow leaf edges in rice could indicate: 1) Potassium deficiency 2) Bacterial leaf blight 3) Iron deficiency. Upload a photo in Crop Health for AI diagnosis!<br><br><em>💡 Tip: Add your Gemini API key for real AI-powered advice!</em>',
    'pest': '🐛 Common signs of pest attack: holes in leaves, wilting, discoloration, sticky residue. Identify the pest first, then use targeted treatment. Neem oil works for many common pests.<br><br><em>💡 Tip: Add your Gemini API key for expert pest identification!</em>',
    'price': '📊 Check our Market Trends page for live mandi prices! Wheat is around ₹2,315/quintal, Cotton ₹7,125/quintal.<br><br><em>💡 Tip: Add your Gemini API key for real-time market analysis!</em>',
    'mandi': '📊 Check our Market Trends page for live mandi prices! Wheat is around ₹2,315/quintal, Cotton ₹7,125/quintal.<br><br><em>💡 Tip: Add your Gemini API key for real-time market analysis!</em>',
  };
  const key = Object.keys(responses).find(k => t.includes(k));
  return key ? responses[key] : '🌱 That\'s a great farming question! I can give much better answers with the Gemini AI connection.<br><br><strong>To enable full AI:</strong> Open <code>config.js</code> and paste your Gemini API key (free from <a href="https://aistudio.google.com/apikey" target="_blank" class="underline text-blue-300">Google AI Studio</a>).<br><br>Meanwhile, try asking about wheat, fertilizer, pests, or mandi prices!';
}

async function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  const now = new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'});
  chatMessages.push({ role: 'user', text, time: now });
  input.value = '';
  input.disabled = true;
  document.getElementById('send-btn').disabled = true;

  // Remove suggestion cards
  document.getElementById('suggestion-cards')?.remove();
  renderAllMessages();
  showTyping();

  // Call Gemini AI
  const aiResponse = await callGeminiAPI(text);
  removeTyping();

  chatMessages.push({ role: 'ai', text: aiResponse, time: new Date().toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}) });
  renderAllMessages();

  input.disabled = false;
  document.getElementById('send-btn').disabled = false;
  input.focus();

  // Save to Firebase if configured
  saveChatToFirebase(text, aiResponse);
}

function sendSuggestion(text) {
  document.getElementById('chat-input').value = text;
  sendMessage();
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
  btn.classList.add('bg-red-500', 'text-white');
  btn.classList.remove('bg-stone-50', 'text-stone-600');

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById('chat-input').value = transcript;
    btn.classList.remove('bg-red-500', 'text-white');
    btn.classList.add('bg-stone-50', 'text-stone-600');
    sendMessage();
  };
  recognition.onerror = () => {
    btn.classList.remove('bg-red-500', 'text-white');
    btn.classList.add('bg-stone-50', 'text-stone-600');
  };
  recognition.onend = () => {
    btn.classList.remove('bg-red-500', 'text-white');
    btn.classList.add('bg-stone-50', 'text-stone-600');
  };
  recognition.start();
}

// Save chat to Firebase Firestore (if configured)
function saveChatToFirebase(userMsg, aiMsg) {
  try {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
      const db = firebase.firestore();
      db.collection('chats').add({
        userMessage: userMsg,
        aiResponse: aiMsg,
        timestamp: new Date().toISOString()
      });
    }
  } catch (e) { /* Firebase not configured yet, that's ok */ }
}
