import { getOpenAI } from '../utils/openai.js';

export interface Suggestion {
  label: string;
  preview: string;
}

export async function getSuggestions(text: string): Promise<Suggestion[]> {
  const openai = getOpenAI();
  
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

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'Вы ИИ-помощник по тексту. Отвечайте строго в формате JSON на русском языке.' },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('Empty response from AI');
  }

  const parsed = JSON.parse(content);
  return Array.isArray(parsed.suggestions) ? parsed.suggestions : [];
}
