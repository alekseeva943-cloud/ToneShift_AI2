import { openai, SYSTEM_PROMPT } from '../utils/openai.js';
import { buildTransformationPrompt } from '../utils/promptBuilder.js';
import { parseAIResponse } from '../utils/parser.js';
import { TransformationSettings, AIResponse } from '../../src/types/index.js';
import { withTimeout } from '../utils/timeout.js';

export async function transformText(text: string, settings: TransformationSettings): Promise<AIResponse> {
  console.log('[TRANSFORM] [1] Starting transformation');
  const prompt = buildTransformationPrompt(text, settings);

  console.log('[TRANSFORM] [2] Requesting OpenAI');
  try {
    const responsePromise = openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
    });

    console.log('[TRANSFORM] [3] Waiting for OpenAI (with 15s timeout)');
    const response = await withTimeout(responsePromise, 15000, 'OpenAI transformation request');
    console.log('[TRANSFORM] [4] OpenAI response received');

    const content = response.choices[0].message.content;
    if (!content) {
      console.error('[TRANSFORM] [ERROR] Empty response content from OpenAI');
      throw new Error('Empty response from AI');
    }

    console.log('[TRANSFORM] [5] Parsing AI response');
    const result = parseAIResponse(content);
    console.log('[TRANSFORM] [6] Parsing completed');
    return result;
  } catch (error: any) {
    console.error('[TRANSFORM] [FATAL ERROR] OpenAI call failed:', error);
    if (error.message?.includes('Timeout')) {
      console.error('[TRANSFORM] [TIMEOUT TRIGGERED]');
    }
    throw error;
  }
}
