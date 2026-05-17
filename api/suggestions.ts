import OpenAI from 'openai';

export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: any, res: any) {
  console.log('[API Suggestions] [STAGE 1] Request entered');
  
  if (req.method !== 'POST') {
    console.warn('[API Suggestions] Method not allowed:', req.method);
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    console.log('[API Suggestions] [STAGE 2] Checking body');
    const body = req.body;
    
    if (!body || !body.text) {
      console.error('[API Suggestions] CRITICAL: text is missing from body', JSON.stringify(body));
      return res.status(400).json({ success: false, error: 'Text is required' });
    }

    const { text } = body;
    const prompt = `
Проанализируй следующий текст и предложи 3 быстрых варианта его улучшения или изменения тона.
Текст: "${text}"

Верни JSON:
{
  "suggestions": [
    { "label": "Действие", "preview": "Вариант текста" },
    ...
  ]
}
`;

    console.log('[API Suggestions] [STAGE 3] Requesting OpenAI');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Вы ИИ-помощник по тексту. Отвечайте строго в формате JSON на русском языке.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
    });

    console.log('[API Suggestions] [STAGE 4] OpenAI response received');
    const content = completion.choices[0].message.content;
    
    if (!content) {
      throw new Error('Empty response from OpenAI');
    }

    const data = JSON.parse(content);
    console.log('[API Suggestions] [STAGE 5] Returning success response');
    
    return res.status(200).json({ 
      success: true, 
      data: data 
    });

  } catch (error: any) {
    console.error('[API Suggestions] [FATAL ERROR]:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
}
