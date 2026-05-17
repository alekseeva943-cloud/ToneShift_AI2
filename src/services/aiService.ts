import { TransformationSettings, AIResponse } from '../types';

export const aiService = {
  async transformText(text: string, settings: TransformationSettings): Promise<AIResponse> {
    console.log('[Frontend] Sending transform request');
    const response = await fetch('/api/transform', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, settings }),
    });

    console.log('[Frontend] Transform status:', response.status);
    const rawText = await response.text();
    console.log('[Frontend] Raw transform response:', rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error('[Frontend] Failed to parse transform JSON:', e);
      throw new Error('Invalid server response');
    }

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to transform text');
    }

    return data.data;
  },

  async getSuggestions(text: string): Promise<{ suggestions: Array<{ label: string; preview: string }> }> {
    console.log('[Frontend] Sending suggestions request');
    const response = await fetch('/api/suggestions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    console.log('[Frontend] Suggestions status:', response.status);
    const rawText = await response.text();
    console.log('[Frontend] Raw suggestions response:', rawText);

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error('[Frontend] Failed to parse suggestions JSON:', e);
      throw new Error('Invalid server response');
    }

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to get suggestions');
    }

    return data.data;
  }
};
