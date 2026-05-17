import { transformText } from './services/transformationService.js';

export const runtime = 'nodejs';

export default async function handler(req: any, res: any) {
  console.log('[API Transform] Request started');
  try {
    if (req.method !== 'POST') {
      console.warn('[API Transform] Method not allowed:', req.method);
      return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
    }

    const { text, settings } = req.body;

    if (!text) {
      console.warn('[API Transform] Missing text in request body');
      return Response.json({ success: false, error: 'Text is required' }, { status: 400 });
    }

    console.log('[API Transform] Calling transformation service');
    const result = await transformText(text, settings);
    console.log('[API Transform] Request successful, returning result');
    return Response.json({ success: true, data: result });
  } catch (error: any) {
    console.error('[API Transform] Error:', error);
    return Response.json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}
