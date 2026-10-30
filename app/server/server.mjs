import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import API from './API/routes.mjs';
import { createJsonFile } from './utils/jsonmanager.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
API(app);

async function startServer() {
    app.listen(port, () => {
        console.log(`App listening on port http://localhost:${port}`);
    });
}

startServer();

// createJsonFile();