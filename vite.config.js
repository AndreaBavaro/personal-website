import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'configure-server',
      configureServer(server) {
        server.middlewares.use('/api/photos', (req, res, next) => {
          try {
            const requestPath = req.url === '/' ? '' : decodeURIComponent(req.url);
            const directoryPath = path.join('public/photos', requestPath);
            
            // Check if path exists and is a directory
            const stats = fs.statSync(directoryPath);
            if (!stats.isDirectory()) {
              res.statusCode = 400;
              res.end('Not a directory');
              return;
            }

            const files = fs.readdirSync(directoryPath);
            const fileList = files
              .filter(file => {
                const filePath = path.join(directoryPath, file);
                const stats = fs.statSync(filePath);
                return !stats.isDirectory() && 
                       (file.toLowerCase().endsWith('.jpg') || 
                        file.toLowerCase().endsWith('.jpeg'));
              })
              .map(file => {
                const filePath = path.join(directoryPath, file);
                const stats = fs.statSync(filePath);
                return {
                  name: file,
                  size: stats.size,
                  lastModified: stats.mtime
                };
              });

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(fileList));
          } catch (error) {
            if (error.code === 'ENOENT') {
              res.statusCode = 404;
              res.end('Directory not found');
            } else {
              next(error);
            }
          }
        });
      }
    },
    {
      name: 'vite-plugin-csp',
      apply: 'build',
      transformIndexHtml: (html) => {
        return {
          html,
          tags: [
            {
              tag: 'meta',
              attrs: {
                'http-equiv': 'Content-Security-Policy',
                content: [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-inline' https://assets.calendly.com",
                  "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
                  "frame-src 'self' https://calendly.com",
                  "connect-src 'self' https://api.calendly.com",
                  "img-src 'self' data: https://assets.calendly.com",
                  "font-src 'self' data:",
                  "object-src 'none'",
                  "base-uri 'self'",
                  "form-action 'self'",
                  "frame-ancestors 'none'",
                  "upgrade-insecure-requests"
                ].join('; ')
              }
            }
          ]
        };
      }
    }
  ],
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://assets.calendly.com",
        "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
        "frame-src 'self' https://calendly.com",
        "connect-src 'self' https://api.calendly.com",
        "img-src 'self' data: https://assets.calendly.com https://calendly.com",
        "font-src 'self' data: https://assets.calendly.com",
        "form-action 'self'",
        "base-uri 'self'"
      ].join('; '),
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    },
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    },
    cors: false,
    origin: 'http://localhost:5173',
    port: 5173,
    strictPort: true,
    host: 'localhost'
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled']
        }
      }
    }
  }
})
