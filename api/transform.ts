import { transformText } from './services/transformationService.js';

export const runtime = 'nodejs';

export default async function handler(req: any) {
  console.log('[API Transform] [STAGE 1] Request entered');
  try {
    console.log('[API Transform] [STAGE 2] Checking method');
    if (req.method !== 'POST') {
      console.warn('[API Transform] Method not allowed:', req.method);
      return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
    }

    console.log('[API Transform] [STAGE 3] Parsing body');
    let body;
    try {
      // In some Vercel environments req.body is pre-parsed, in others we need await req.json()
      body = req.body || await req.json();
      console.log('[API Transform] Body parsed successfully');
    } catch (e) {
      console.warn('[API Transform] Failed to parse body via req.json(), trying req.body');
      body = req.body;
    }

    if (!body) {
      console.error('[API Transform] CRITICAL: Body is undefined');
      return Response.json({ success: false, error: 'Request body is missing' }, { status: 400 });
    }

    const { text, settings } = body;

    if (!text) {
      console.warn('[API Transform] Missing text in request body');
      return Response.json({ success: false, error: 'Text is required' }, { status: 400 });
    }

    console.log('[API Transform] [STAGE 4] Calling transformation service');
    const result = await transformText(text, settings);
    
    console.log('[API Transform] [STAGE 5] Request successful, returning result');
    return Response.json({ success: true, data: result });
  } catch (error: any) {
    console.error('[API Transform] [FATAL ERROR]:', error);
    return Response.json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}
