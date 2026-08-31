import dotenv from 'dotenv';
import Groq from 'groq-sdk';

dotenv.config();

const apiKey = (process.env.GROQ_API_KEY || '').trim().replace(/^["']|["']$/g, '');
const groq = new Groq({ apiKey });

async function run() {
  try {
    const response = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [{ role: 'user', content: 'Say Hello Kisan Bhai in one short sentence.' }],
    });
    console.log("\n🎉 SUCCESS! Groq API Response:\n", response.choices[0]?.message?.content);
  } catch (err) {
    console.error("\n❌ GROQ ERROR:\n", err.message);
  }
}

run();