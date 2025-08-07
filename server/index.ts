import express, { Request, Response } from 'express'
import cors from 'cors'
import { generateSite, SiteSchema } from '../scripts/generateSite'

const app = express()

// enable CORS for Vite dev server
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const LM_PORT = Number(process.env.LMSTUDIO_PORT) || 1234

app.post('/generate', async (req: Request, res: Response) => {
  try {
    const lmResponse = await fetch(
      `http://localhost:${LM_PORT}/v1/chat/completions`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      },
    )

    if (!lmResponse.body) {
      res.status(500).json({ error: 'Empty response from LM Studio' })
      return
    }

    const reader = lmResponse.body.getReader()
    const chunks: Uint8Array[] = []
    
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
    }
    
    const aggregated = Buffer.concat(chunks).toString()
    res.setHeader('Content-Type', 'application/json')
    res.send(aggregated)

    try {
      const schema = JSON.parse(aggregated) as SiteSchema
      // Fire and forget site generation
      generateSite(schema).catch(() => {})
    } catch {
      // ignore invalid JSON
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to reach LM Studio' })
  }
})

export default app

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT) || 3000
  app.listen(port)
}
