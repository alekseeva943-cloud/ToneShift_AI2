import { getSuggestions } from './services/suggestionService.js';

export const runtime = 'nodejs';

export default async function handler(req: any) {
  console.log('[API Suggestions] [STAGE 1] Request entered');
  try {
    console.log('[API Suggestions] [STAGE 2] Checking method');
    if (req.method !== 'POST') {
      console.warn('[API Suggestions] Method not allowed:', req.method);
      return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
    }

    console.log('[API Suggestions] [STAGE 3] Parsing body');
    let body;
    try {
      body = req.body || await req.json();
      console.log('[API Suggestions] Body parsed successfully');
    } catch (e) {
      console.warn('[API Suggestions] Failed to parse body via req.json(), trying req.body');
      body = req.body;
    }

    if (!body) {
      console.error('[API Suggestions] CRITICAL: Body is undefined');
      return Response.json({ success: false, error: 'Request body is missing' }, { status: 400 });
    }

    const { text } = body;

    if (!text) {
      console.warn('[API Suggestions] Missing text in request body');
      return Response.json({ success: false, error: 'Text is required' }, { status: 400 });
    }

    console.log('[API Suggestions] [STAGE 4] Calling suggestions service');
    const suggestions = await getSuggestions(text);
    
    console.log('[API Suggestions] [STAGE 5] Request successful, returning result');
    return Response.json({ success: true, data: { suggestions } });
  } catch (error: any) {
    console.error('[API Suggestions] [FATAL ERROR]:', error);
    return Response.json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}
