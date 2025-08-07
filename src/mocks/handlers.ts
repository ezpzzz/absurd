import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('https://api.groq.com/openai/v1/chat/completions', () => {
    const encoder = new TextEncoder()
    const stream = new ReadableStream<Uint8Array>({
      start(controller: ReadableStreamDefaultController<Uint8Array>): void {
        controller.enqueue(encoder.encode('{"plan":["step1"'))
        controller.enqueue(encoder.encode(',"step2"]}'))
        controller.close()
      }
    })
    return new HttpResponse(stream, {
      headers: { 'Content-Type': 'application/json' }
    })
  })
]
