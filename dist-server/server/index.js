import express from 'express';
import cors from 'cors';
import path from 'path';
import { generateSite } from '../scripts/generateSite';
const app = express();
// enable CORS for Vite dev server in development
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({ origin: 'http://localhost:5173' }));
}
app.use(express.json());
// Serve static files from dist directory in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));
}
const LM_PORT = Number(process.env.LMSTUDIO_PORT) || 1234;
app.post('/generate', async (req, res) => {
    try {
        const lmResponse = await fetch(`http://localhost:${LM_PORT}/v1/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });
        if (!lmResponse.body) {
            res.status(500).json({ error: 'Empty response from LM Studio' });
            return;
        }
        const reader = lmResponse.body.getReader();
        const chunks = [];
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                break;
            chunks.push(value);
        }
        const aggregated = Buffer.concat(chunks).toString();
        res.setHeader('Content-Type', 'application/json');
        res.send(aggregated);
        try {
            const rawData = JSON.parse(aggregated);
            // Fire and forget site generation with validation
            generateSite(rawData).catch(() => { });
        }
        catch {
            // ignore invalid JSON or validation errors
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to reach LM Studio' });
    }
});
// Health check endpoint for Render
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});
// Serve React app for all other routes in production
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}
export default app;
if (import.meta.url === `file://${process.argv[1]}`) {
    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
