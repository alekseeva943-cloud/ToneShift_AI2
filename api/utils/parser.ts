import { AIResponse } from '../../src/types.js';

export function parseAIResponse(content: string): AIResponse {
  try {
    const parsed = JSON.parse(content);
    return {
      adapted: parsed.adapted || '',
      neutral: parsed.neutral || '',
      explanation: parsed.explanation || '',
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
    };
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    throw new Error('Invalid response format from AI');
  }
}
