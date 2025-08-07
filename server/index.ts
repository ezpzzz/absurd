import express, { Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateSite } from '../scripts/generateSite.js'
import { Groq } from 'groq-sdk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// enable CORS for Vite dev server in development
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:5173' }))
}

app.use(express.json())

// Serve static files from dist directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')))
}

const GROQ_API_KEY = process.env.GROQ_API_KEY
const groq = new Groq({ apiKey: GROQ_API_KEY })

app.post('/generate', async (req: Request, res: Response) => {
  try {
    if (!GROQ_API_KEY) {
      res.status(500).json({ error: 'Groq API key not configured' })
      return
    }

    // Extract messages from request body, or use a default
    const messages = req.body?.messages || [
      { role: 'user', content: req.body?.prompt || 'Hello' }
    ]

    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: 'openai/gpt-oss-20b',
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      stream: true,
      reasoning_effort: 'medium',
      stop: null
    })

    // Set headers for streaming response
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Transfer-Encoding', 'chunked')

    let fullResponse = ''

    // Stream the response
    for await (const chunk of chatCompletion) {
      const content = chunk.choices[0]?.delta?.content || ''
      if (content) {
        fullResponse += content
        res.write(content)
      }
    }

    res.end()

    // Fire and forget site generation with validation
    try {
      const rawData = JSON.parse(fullResponse)
      generateSite(rawData).catch(() => {})
    } catch {
      // ignore invalid JSON or validation errors
    }
  } catch (err) {
    console.error('Groq API error:', err)
    res.status(500).json({ error: 'Failed to reach Groq API' })
  }
})

// Health check endpoint for Render
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy' })
})

// Serve React app for all other routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
  })
}

export default app

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT) || 3000
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}
