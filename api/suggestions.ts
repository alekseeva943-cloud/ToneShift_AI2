import { getSuggestions } from './services/suggestionService.js';

export const runtime = 'nodejs';

export default async function handler(req: any, res: any) {
  console.log('[API Suggestions] Request started');
  try {
    if (req.method !== 'POST') {
      console.warn('[API Suggestions] Method not allowed:', req.method);
      return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
    }

    const { text } = req.body;

    if (!text) {
      console.warn('[API Suggestions] Missing text in request body');
      return Response.json({ success: false, error: 'Text is required' }, { status: 400 });
    }

    console.log('[API Suggestions] Calling suggestions service');
    const suggestions = await getSuggestions(text);
    console.log('[API Suggestions] Request successful, returning result');
    return Response.json({ suggestions });
  } catch (error: any) {
    console.error('[API Suggestions] Error:', error);
    return Response.json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}
