import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'OopsAI server is running' });
});

app.post('/api/generate-excuses', async (req, res) => {
  try {
    const { scenario, tone = 'casual', count = 3 } = req.body;

    if (!scenario || typeof scenario !== 'string') {
      return res.status(400).json({
        error: 'Please provide a scenario (e.g., "missed a work meeting", "late to school")',
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: 'OpenAI API key is not configured. Add OPENAI_API_KEY to your .env file.',
      });
    }

    const toneInstructions = {
      casual: 'Keep the excuses casual and relatable.',
      formal: 'Make the excuses professional and formal.',
      humorous: 'Make the excuses witty and funny (but still believable).',
      creative: 'Get creative with unusual but plausible excuses.',
    };

    const instruction = toneInstructions[tone] || toneInstructions.casual;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an excuse generator. Create believable, context-appropriate excuses for various scenarios. 
${instruction}
Return ONLY a JSON array of strings - no other text. Each string should be one complete excuse.`,
        },
        {
          role: 'user',
          content: `Generate exactly ${Math.min(count, 5)} different excuses for this scenario: "${scenario}"`,
        },
      ],
      temperature: 0.8,
    });

    const content = completion.choices[0]?.message?.content?.trim() || '[]';
    let excuses;

    try {
      excuses = JSON.parse(content);
      if (!Array.isArray(excuses)) excuses = [content];
    } catch {
      excuses = content.split('\n').filter((line) => line.trim().length > 0);
    }

    res.json({ excuses });
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    res.status(500).json({
      error: error.message || 'Failed to generate excuses. Please try again.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`OopsAI server running at http://localhost:${PORT}`);
});
