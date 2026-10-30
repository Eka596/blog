import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data'); // Вернуться в папку server -> Затем перейти к папке с файлами

export async function createJsonFile(data) {
    const slug = data.slug;
    const filePath = path.join(DATA_DIR, slug + '.json');
    const body = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, body);

    console.log("Я создал файл по пути: ", filePath); // DELETE LATER
}

export async function readJsonFile(slug) {
    const filePath = path.join(DATA_DIR, slug + '.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
}