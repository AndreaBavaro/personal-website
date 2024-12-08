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
    }
  ],
})
