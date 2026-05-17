import { TransformationSettings, AIResponse } from '../types';

export const aiService = {
  async transformText(text: string, settings: TransformationSettings): Promise<AIResponse> {
    const response = await fetch('/api/transform', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, settings }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to transform text');
    }

    return response.json();
  },

  async getSuggestions(text: string): Promise<{ suggestions: Array<{ label: string; preview: string }> }> {
    const response = await fetch('/api/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Failed to get suggestions');
    }

    return response.json();
  }
};
