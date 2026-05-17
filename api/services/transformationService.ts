import { openai, SYSTEM_PROMPT } from '../utils/openai.js';
import { buildTransformationPrompt } from '../utils/promptBuilder.js';
import { parseAIResponse } from '../utils/parser.js';
import { TransformationSettings, AIResponse } from '../../src/types/index.js';
import { withTimeout } from '../utils/timeout.js';

export async function transformText(text: string, settings: TransformationSettings): Promise<AIResponse> {
  console.log('[TransformationService] Starting transformation');
  const prompt = buildTransformationPrompt(text, settings);

  console.log('[TransformationService] Requesting OpenAI');
  const responsePromise = openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' }
  });

  const response = await withTimeout(responsePromise, 15000, 'OpenAI transformation request');
  console.log('[TransformationService] OpenAI response received');

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error('Empty response from AI');
  }

  return parseAIResponse(content);
}
