import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const apiKey = (process.env.GROQ_API_KEY || '').trim().replace(/^["']|["']$/g, '');
const groq = new Groq({ apiKey });

console.log(`🔑 GROQ_API_KEY detected: ${apiKey.substring(0, 8)}...`);

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

    // Extract live context sent from the browser
    const userLocation = req.body.context?.location || "Delhi, India";
    const marketData = req.body.context?.availableMarketPrices || "Wheat: ₹2,315/quintal | Mustard: ₹5,450/quintal | Cotton: ₹7,125/quintal";

    // System prompt with contextual awareness and follow-up suggestion rules
    const DYNAMIC_SYSTEM_PROMPT = `
You are "Krishak", an intelligent agricultural advisor embedded in the Krishi Sahayak farmer portal.

CURRENT LIVE APP CONTEXT:
- Farmer's Detected Location: "${userLocation}"
- Live Mandi / Market Prices from Portal: "${marketData}"

RULES FOR ANSWERING:
1. Weather Questions: 
   - Always reference the farmer's location ("${userLocation}").
   - Provide practical farming advice based on seasonal conditions for this area.
2. Market / Mandi Price Questions:
   - Use the live price list provided above.
   - If the requested crop is in the list, quote that exact rate.
3. Language Matching:
   - Match the user's language (English for English queries, Hindi for Devanagari, Hinglish for Romanized Hindi).
4. Follow-up Questions (Mandatory):
   - At the very end of EVERY answer, add an italicized or clearly labeled section titled:
     "💡 Suggested Questions:" (or "💡 सुझाव:") with 2 to 3 short, relevant follow-up questions the farmer can ask next.
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