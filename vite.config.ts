import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'api-middleware',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url && req.url.startsWith('/api/')) {
              const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
              // Vercel routes are typically /api/handler.ts
              const handlerPath = path.resolve(process.cwd(), `.${url.pathname}.ts`);
              
              if (fs.existsSync(handlerPath)) {
                try {
                  const { default: handler } = await server.ssrLoadModule(handlerPath);
                  
                  let body = '';
                  if (req.method === 'POST') {
                    for await (const chunk of req) {
                      body += chunk;
                    }
                    try {
                      (req as any).body = JSON.parse(body);
                    } catch (e) {
                      (req as any).body = body;
                    }
                  }

                  (res as any).status = (code: number) => {
                    res.statusCode = code;
                    return res;
                  };
                  (res as any).json = (data: any) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                  };

                  await handler(req, res);
                  return;
                } catch (error) {
                  console.error('API Error:', error);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: 'Internal Server Error' }));
                  return;
                }
              }
            }
            next();
          });
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
