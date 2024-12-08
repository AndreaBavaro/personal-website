import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllPhotos(baseDir) {
    const photos = {};
    const countries = fs.readdirSync(baseDir);

    countries.forEach(country => {
        const countryPath = path.join(baseDir, country);
        if (fs.statSync(countryPath).isDirectory()) {
            const files = fs.readdirSync(countryPath)
                .filter(file => {
                    const filePath = path.join(countryPath, file);
                    const stats = fs.statSync(filePath);
                    return !stats.isDirectory() && 
                           (file.toLowerCase().endsWith('.jpg') || 
                            file.toLowerCase().endsWith('.jpeg'));
                })
                .map(file => {
                    const filePath = path.join(countryPath, file);
                    const stats = fs.statSync(filePath);
                    return {
                        name: file,
                        size: stats.size,
                        lastModified: stats.mtime
                    };
                });
            
            if (files.length > 0) {
                photos[country] = files;
            }
        }
    });

    return photos;
}

const photosDir = path.join(__dirname, '..', 'public', 'photos');
const outputFile = path.join(__dirname, '..', 'public', 'photoData.json');

const photoData = getAllPhotos(photosDir);
fs.writeFileSync(outputFile, JSON.stringify(photoData, null, 2));
console.log('Photo data generated successfully!');
