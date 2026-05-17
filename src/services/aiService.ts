import { TransformationSettings, AIResponse } from '../types';
import { useStore } from '../store/useStore';

const log = (msg: string) => useStore.getState().addLog(msg);

export const aiService = {
  async transformText(text: string, settings: TransformationSettings): Promise<AIResponse> {
    log('[SERVICE] Starting transformText');
    try {
      log('[SERVICE] Sending POST to /api/transform');
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, settings }),
      });

      log(`[SERVICE] Response status: ${response.status}`);
      
      log('[SERVICE] Reading response text');
      const rawText = await response.text();
      log(`[SERVICE] Raw response length: ${rawText.length}`);
      // Only log first 200 chars to avoid cluttering but see the start
      log(`[SERVICE] Raw response preview: ${rawText.substring(0, 200)}...`);

      let data;
      try {
        log('[SERVICE] Parsing JSON');
        data = JSON.parse(rawText);
        log('[SERVICE] JSON parsed successfully');
      } catch (e) {
        log(`[SERVICE ERROR] Failed to parse transform JSON: ${e}`);
        console.error('[Frontend] Failed to parse transform JSON:', e);
        throw new Error('Invalid server response');
      }

      if (!response.ok || !data.success) {
        log(`[SERVICE ERROR] API returned error: ${data.error || 'Unknown'}`);
        throw new Error(data.error || 'Failed to transform text');
      }

      log('[SERVICE] Returning data to component');
      return data.data;
    } catch (error: any) {
      log(`[SERVICE FATAL] ${error.message}`);
      throw error;
    }
  },

  async getSuggestions(text: string): Promise<{ suggestions: Array<{ label: string; preview: string }> }> {
    log('[SERVICE] Starting getSuggestions');
    try {
      log('[SERVICE] Sending POST to /api/suggestions');
      const response = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      log(`[SERVICE] Response status: ${response.status}`);
      
      log('[SERVICE] Reading response text');
      const rawText = await response.text();
      log(`[SERVICE] Raw response length: ${rawText.length}`);

      let data;
      try {
        log('[SERVICE] Parsing JSON');
        data = JSON.parse(rawText);
        log('[SERVICE] JSON parsed successfully');
      } catch (e) {
        log(`[SERVICE ERROR] Failed to parse suggestions JSON: ${e}`);
        console.error('[Frontend] Failed to parse suggestions JSON:', e);
        throw new Error('Invalid server response');
      }

      if (!response.ok || !data.success) {
        log(`[SERVICE ERROR] API returned error: ${data.error || 'Unknown'}`);
        throw new Error(data.error || 'Failed to get suggestions');
      }

      log('[SERVICE] Returning data to component');
      return data.data;
    } catch (error: any) {
      log(`[SERVICE FATAL] ${error.message}`);
      throw error;
    }
  }
};
