import { openai } from '../utils/openai.js';
import { withTimeout } from '../utils/timeout.js';

export interface Suggestion {
  label: string;
  preview: string;
}

export async function getSuggestions(text: string): Promise<Suggestion[]> {
  console.log('[SuggestionService] Starting suggestions generation');
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

  console.log('[SuggestionService] Requesting OpenAI');
  const responsePromise = openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Вы ИИ-помощник по тексту. Отвечайте строго в формате JSON на русском языке.' },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' }
  });

  const response = await withTimeout(responsePromise, 15000, 'OpenAI suggestions request');
  console.log('[SuggestionService] OpenAI response received');

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('Empty response from AI');
  }

  const parsed = JSON.parse(content);
  return Array.isArray(parsed.suggestions) ? parsed.suggestions : [];
}
