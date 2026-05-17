import OpenAI from 'openai';
import { buildTransformationPrompt } from './utils/promptBuilder.js';

export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getTemperature(tone: string): number {
  const lowerTone = tone.toLowerCase();
  if (lowerTone.includes('деловой') || lowerTone.includes('официальный') || lowerTone.includes('строгий')) {
    return 0.3;
  }
  if (lowerTone.includes('креативный') || lowerTone.includes('эмоциональный') || lowerTone.includes('вдохновляющий')) {
    return 0.9;
  }
  if (lowerTone.includes('дружелюбный') || lowerTone.includes('разговорный')) {
    return 0.7;
  }
  return 0.5;
}

export default async function handler(req: any, res: any) {
  console.log('[API Transform] [STAGE 1] Request entered');
  
  if (req.method !== 'POST') {
    console.warn('[API Transform] Method not allowed:', req.method);
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    console.log('[API Transform] [STAGE 2] Checking body');
    const body = req.body;
    
    if (!body || !body.text) {
      console.error('[API Transform] CRITICAL: text is missing from body', JSON.stringify(body));
      return res.status(400).json({ success: false, error: 'Text is required' });
    }

    const { text, settings } = body;
    const prompt = buildTransformationPrompt(text, settings);
    const temperature = getTemperature(settings.tone || '');

    console.log(`[API Transform] [STAGE 3] Requesting OpenAI (Temp: ${temperature})`);
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { 
          role: 'system', 
          content: 'Вы — ToneCraft AI, продвинутый лингвистический процессор. Ваша специализация — стратегическая адаптация коммуникаций. Вы мыслите глубоко, анализируете контекст и выдаете результат мирового уровня в формате JSON.' 
        },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: temperature,
    });

    console.log('[API Transform] [STAGE 4] OpenAI response received');
    const content = completion.choices[0].message.content;
    
    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    const data = JSON.parse(content);
    console.log('[API Transform] [STAGE 5] Returning success response');
    
    return res.status(200).json({ 
      success: true, 
      data: data 
    });

  } catch (error: any) {
    console.error('[API Transform] [FATAL ERROR]:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
}
