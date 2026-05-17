import { getOpenAI, SYSTEM_PROMPT } from '../utils/openai.js';
import { buildTransformationPrompt } from '../utils/promptBuilder.js';
import { parseAIResponse } from '../utils/parser.js';
import { TransformationSettings, AIResponse } from '../../src/types.js';

export async function transformText(text: string, settings: TransformationSettings): Promise<AIResponse> {
  const openai = getOpenAI();
  const prompt = buildTransformationPrompt(text, settings);

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' }
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('Empty response from AI');
  }

  return parseAIResponse(content);
}
