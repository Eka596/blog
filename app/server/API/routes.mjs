import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { readJsonFile } from '../utils/jsonmanager.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');

export default function API(app) {
    app.get('/api/article/:slug', getOneArticle);
    app.get('/api/articles', getAllArticles);
}

async function getOneArticle(req, res) {
    try {
        const slug = req.params.slug
        const article = await readJsonFile(slug);
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read the file' });
    }
}


function getAllArticles(req, res) {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

    const articles = files.map(file => {
        try {
            const obj = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf-8'));
            if (!obj.slug || !obj.author?.avatar) return null;
            return obj;
        } catch (error) {
            console.warn(`File missing: ${file}`, error);
            return null;
        }
    }).filter(Boolean)
    res.json(articles);
}