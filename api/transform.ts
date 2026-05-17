import OpenAI from 'openai';

export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    const prompt = `
Текст для трансформации: "${text}"
Параметры: ${JSON.stringify(settings)}

Верни ответ в формате JSON:
{
  "transformedText": "Адаптированная версия текста",
  "neutralVersion": "Нейтральная версия",
  "explanation": "Объяснение",
  "suggestions": ["совет 1", "совет 2"]
}
`;

    console.log('[API Transform] [STAGE 3] Requesting OpenAI');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Вы ИИ-помощник по тексту. Отвечайте строго в формате JSON на русском языке.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
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
