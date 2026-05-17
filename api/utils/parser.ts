import { AIResponse } from '../../src/types/index.js';

export function parseAIResponse(content: string): AIResponse {
  try {
    const parsed = JSON.parse(content);
    return {
      transformedText: parsed.transformedText || parsed.adapted || '',
      originalText: parsed.originalText || '',
      neutralVersion: parsed.neutralVersion || parsed.neutral || '',
      explanation: parsed.explanation || '',
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
    };
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    throw new Error('Invalid response format from AI');
  }
}
