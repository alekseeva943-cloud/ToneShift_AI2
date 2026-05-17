import { getOpenAI, SYSTEM_PROMPT } from './utils/openai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text, settings } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const openai = getOpenAI();
    
    const userPrompt = `
Текст для трансформации: "${text}"

Параметры:
- Цель: ${settings.goal}
- Аудитория: ${settings.audience}
- Тон: ${settings.tone}
- Уровень формальности: ${settings.formality}/100
- Длина: ${settings.length}
- Терминология: ${settings.terminology}
- Интенсивность эмоций: ${settings.intensity}/100

Пожалуйста, выполните трансформацию.
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('Empty response from AI');
    }

    return res.status(200).json(JSON.parse(content));
  } catch (error: any) {
    console.error('AI Transformation Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
