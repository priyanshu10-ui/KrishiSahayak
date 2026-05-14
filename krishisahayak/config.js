// ============================================
// 🔑 CONFIGURATION FILE - PASTE YOUR KEYS HERE
// ============================================

// STEP 1: Get your Gemini API Key
// Go to: https://aistudio.google.com/apikey
// Click "Create API Key" → Copy it → Paste below
const GEMINI_API_KEY = "AIzaSyC1i0Tlxl7azRCyfY-W9fuQsSN5AHVFKM0";

// STEP 2: Get your Firebase Config
// Go to: https://console.firebase.google.com
// Create a project → Go to Project Settings → Your apps → Web app
// Copy the config object → Paste values below
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD28l7j8fp2Jeg2jSqzLJryGrjeCfDutPc",
  authDomain: "krishisahayak-ebe72.firebaseapp.com",
  projectId: "krishisahayak-ebe72",
  storageBucket: "krishisahayak-ebe72.firebasestorage.app",
  messagingSenderId: "497753697696",
  appId: "1:497753697696:web:54e933ce226abeb91308c5"
};

// ============================================
// ⚠️ DO NOT EDIT BELOW THIS LINE
// ============================================
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Krishak AI System Prompt - This makes Gemini act as "Krishak"
const KRISHAK_SYSTEM_PROMPT = `You are "Krishak", an AI farming assistant for Indian farmers, part of the "Krishi Sahayak" platform. 

Your personality:
- Greet with "Namaste" when appropriate
- Be warm, helpful, and speak in simple language
- You are an expert in Indian agriculture, crops, soil health, pest management, weather, and mandi prices
- Give practical, actionable advice
- When unsure, recommend consulting a local agricultural officer
- You can respond in Hindi or English based on the user's language
- Keep responses concise (2-4 paragraphs max)
- Use emoji occasionally to be friendly 🌾

Your knowledge covers:
- Crop cycles (Rabi, Kharif, Zaid seasons)
- Soil health and pH management
- Pest and disease identification
- Fertilizer recommendations (NPK, organic)
- Weather impact on farming
- Mandi prices and market trends
- Government schemes for farmers (PM-KISAN, crop insurance)
- Irrigation and water management
- Organic farming techniques

Always end responses with a helpful follow-up question or suggestion.`;
