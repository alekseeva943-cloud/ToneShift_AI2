import { openai } from '../utils/openai.js';
import { withTimeout } from '../utils/timeout.js';

export interface Suggestion {
  label: string;
  preview: string;
}

export async function getSuggestions(text: string): Promise<Suggestion[]> {
  console.log('[SUGGESTIONS] [1] Starting suggestions generation');
  const prompt = `
Проанализируй следующий текст и предложи 3 быстрых варианта его улучшения или изменения тона.
Текст: "${text}"

Верни JSON:
{
  "suggestions": [
     { "label": "Сделать дружелюбнее", "preview": "..." },
     { "label": "Сделать лаконичнее", "preview": "..." },
     { "label": "Добавить экспертности", "preview": "..." }
  ]
}
`;

  console.log('[SUGGESTIONS] [2] Requesting OpenAI');
  try {
    const responsePromise = openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Вы ИИ-помощник по тексту. Отвечайте строго в формате JSON на русском языке.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
    });

    console.log('[SUGGESTIONS] [3] Waiting for OpenAI (with 15s timeout)');
    const response = await withTimeout(responsePromise, 15000, 'OpenAI suggestions request');
    console.log('[SUGGESTIONS] [4] OpenAI response received');

    const content = response.choices[0].message.content;
    if (!content) {
      console.error('[SUGGESTIONS] [ERROR] Empty response content from OpenAI');
      throw new Error('Empty response from AI');
    }

    console.log('[SUGGESTIONS] [5] Parsing AI response');
    const parsed = JSON.parse(content);
    console.log('[SUGGESTIONS] [6] Parsing completed');
    return Array.isArray(parsed.suggestions) ? parsed.suggestions : [];
  } catch (error: any) {
    console.error('[SUGGESTIONS] [FATAL ERROR] OpenAI call failed:', error);
    if (error.message?.includes('Timeout')) {
      console.error('[SUGGESTIONS] [TIMEOUT TRIGGERED]');
    }
    throw error;
  }
}
