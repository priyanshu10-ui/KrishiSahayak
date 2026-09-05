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

const FARMER_SYSTEM_PROMPT = `
You are "Krishak", a warm, respectful, and knowledgeable agricultural advisor designed for farmers.
1. Tone: Warm, empathetic, and respectful. Greet warmly (e.g., "Namaste Kisan Bhai").
2. Language: Simple, practical farming terminology. Respond in the same language used by the user (Hindi, English, or Hinglish).
3. Content: Farming, soil health, crop diseases, pest solutions, fertilizers, weather, and mandi prices.
4. Keep answers clear, structured, and easy to read.
`;

// Root test route
app.get('/', (req, res) => {
  res.send("🌱 Krishi Sahayak Backend is running perfectly!");
});

// Chat completion endpoint
app.post('/api/chat', async (req, res) => {
  console.log("📩 Received chat request from frontend:", req.body);
  try {
    let incomingMessages = [];

    // Support both an array of messages or a single string prompt
    if (Array.isArray(req.body.messages)) {
      incomingMessages = req.body.messages;
    } else if (req.body.message || req.body.prompt) {
      incomingMessages = [{ role: 'user', content: req.body.message || req.body.prompt }];
    } else {
      return res.status(400).json({ error: "Missing message or messages array in request body." });
    }

    const formattedMessages = [
      { role: 'system', content: FARMER_SYSTEM_PROMPT },
      ...incomingMessages
        .map(m => ({
          role: (m.role === 'ai' || m.role === 'model' || m.role === 'assistant') ? 'assistant' : 'user',
          content: (m.content || m.text || '').trim()
        }))
        .filter(m => m.content.length > 0)
    ];

    // Supported Groq Model
    const chatCompletion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: formattedMessages,
      temperature: 0.6,
      max_tokens: 1024,
    });

    const reply = chatCompletion.choices[0]?.message?.content || "No reply generated.";
    console.log("✅ Groq response sent to client.");
    return res.json({ reply, response: reply });
  } catch (error) {
    console.error("❌ Groq Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Ready at: http://localhost:${PORT}/api/chat`);
});