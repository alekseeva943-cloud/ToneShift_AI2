import { getOpenAI } from './utils/openai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
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

    return res.status(200).json(JSON.parse(content));
  } catch (error: any) {
    console.error('AI Suggestions Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
