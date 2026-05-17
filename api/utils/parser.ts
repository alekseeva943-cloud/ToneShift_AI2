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
      metrics: parsed.metrics || {
        before: { persuasiveness: 50, formality: 50, emotionality: 50, clarity: 50, engagement: 50 },
        after: { persuasiveness: 70, formality: 70, emotionality: 70, clarity: 70, engagement: 70 }
      },
      highlights: Array.isArray(parsed.highlights) ? parsed.highlights : []
    };
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    throw new Error('Invalid response format from AI');
  }
}
