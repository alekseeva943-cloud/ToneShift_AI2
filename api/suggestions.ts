import { getSuggestions } from './services/suggestionService.js';

export const runtime = 'nodejs';

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
    }

    const { text } = req.body;

    if (!text) {
      return Response.json({ success: false, error: 'Text is required' }, { status: 400 });
    }

    const suggestions = await getSuggestions(text);
    return Response.json({ suggestions });
  } catch (error: any) {
    console.error('API Error:', error);
    return Response.json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    }, { status: 500 });
  }
}
