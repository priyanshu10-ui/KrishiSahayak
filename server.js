import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files from current directory
app.use(express.static(path.join(__dirname, '.')));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const KRISHI_PROMPT = `
You are "Krishi Sahayak AI", an agricultural expert assistant on the KrishiSahayak portal.

YOUR ROLE:
- Help farmers with crop health advisory, pest/disease diagnosis, pesticide/fungicide technical names, and fertilizer management (NPK/Urea).
- Always provide active chemical technical names, exact dilution dosage, and safety gear instructions for pesticides.
- STRICT RULE: Refuse non-agricultural questions politely by stating that you are specialized only in farming and agriculture advisory on KrishiSahayak.
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, language } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const selectedLang = language || 'English';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: `${KRISHI_PROMPT}\nIMPORTANT: The user interface language is currently ${selectedLang}. You MUST reply strictly in ${selectedLang} (e.g. standard English or clear Hindi depending on what was selected), unless the user explicitly switches the language in their message.`,
        temperature: 0.3
      }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to process chat response' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`KrishiSahayak server running at http://localhost:${PORT}`);
});