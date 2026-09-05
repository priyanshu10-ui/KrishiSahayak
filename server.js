import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = (process.env.GROQ_API_KEY || '').trim().replace(/^["']|["']$/g, '');

if (!apiKey) {
  console.error("❌ CRITICAL: GROQ_API_KEY is missing from your .env file!");
} else {
  console.log(`🔑 GROQ_API_KEY detected: ${apiKey.substring(0, 8)}...`);
}

const groq = new Groq({ apiKey });

app.get('/', (req, res) => {
  res.send("🌱 Krishi Sahayak Backend is running perfectly!");
});

app.post('/api/chat', async (req, res) => {
  console.log("📩 Received chat request:", JSON.stringify(req.body));
  try {
    let incomingMessages = [];

    if (Array.isArray(req.body.messages) && req.body.messages.length > 0) {
      incomingMessages = req.body.messages;
    } else if (req.body.message || req.body.prompt) {
      incomingMessages = [{ role: 'user', content: String(req.body.message || req.body.prompt) }];
    } else {
      return res.status(400).json({ error: "Missing message or messages array in request body." });
    }

    const userLocation = req.body.context?.location || "Delhi, India";
    const marketData = req.body.context?.availableMarketPrices || "Wheat: ₹2,315/quintal | Mustard: ₹5,450/quintal | Cotton: ₹7,125/quintal";

   const DYNAMIC_SYSTEM_PROMPT = `
You are "Krishak", an intelligent, humble, and practical agricultural advisor embedded in the Krishi Sahayak farmer portal.

CURRENT LIVE APP CONTEXT:
- Farmer's Location: "${userLocation}"
- Live Mandi / Market Prices: "${marketData}"

CRITICAL BEHAVIOR RULES:
1. NEVER talk about yourself:
   - Do NOT say "I don't have a farm", "I don't grow crops", or "As an AI".
   - If the user asks about an agricultural topic (e.g., "What is the soil type?", "Wheat crops"), assume they want helpful agronomic information for the crops and soils common in "${userLocation}".

2. Follow-up Suggestions (VERY IMPORTANT):
   - The suggestions MUST be phrased as questions or requests THAT THE FARMER ASKS YOU.
   - NEVER suggest questions directed at the user (DO NOT write: "What is your soil type?" or "Do you have irrigation?").
   - Instead, phrase them from the farmer's perspective:
     - "Tell me about alluvial & sandy loam soil in Delhi"
     - "Best fertilizers for wheat in this season"
     - "How to test soil health at home"
     - "Show latest mandi rate for Mustard"

3. Output Format (MANDATORY):
   - Provide your helpful response first.
   - At the very bottom, output:
---SUGGESTIONS---
   - Followed by 2 or 3 farmer-perspective prompts, one per line (NO numbers, NO bullets, NO punctuation prefixes).
`;

    const formattedMessages = [
      { role: 'system', content: DYNAMIC_SYSTEM_PROMPT },
      ...incomingMessages
        .map(m => ({
          role: (m.role === 'ai' || m.role === 'model' || m.role === 'assistant') ? 'assistant' : 'user',
          content: String(m.content || m.text || '').trim()
        }))
        .filter(m => m.content.length > 0)
    ];

    const chatCompletion = await groq.chat.completions.create({
      model: 'groq/compound-mini',
      messages: formattedMessages,
      temperature: 0.6,
      max_tokens: 1024,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "No reply generated.";
    console.log("✅ Groq response generated successfully.");
    return res.json({ reply, response: reply });

  } catch (error) {
    console.error("❌ Groq Error:", error.message);
    return res.status(error.status || 500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Ready at: http://127.0.0.1:${PORT}/api/chat`);
});