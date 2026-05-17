import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

// Import API handlers
import transformHandler from './api/transform';
import suggestionsHandler from './api/suggestions';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes - These mimic Vercel's /api folder behavior in Express
  app.post('/api/transform', (req, res) => transformHandler(req, res));
  app.post('/api/suggestions', (req, res) => suggestionsHandler(req, res));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ToneCraft AI Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
