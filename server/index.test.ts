import { Readable } from 'node:stream'
import request from 'supertest'
import { afterEach, expect, test, vi } from 'vitest'
import app from './index'
import { generateSite } from '../scripts/generateSite'

vi.mock('../scripts/generateSite', () => ({
  generateSite: vi.fn().mockResolvedValue(undefined),
}))

afterEach(() => {
  vi.restoreAllMocks()
})

test('POST /generate aggregates LM Studio stream', async () => {
  const stream = Readable.from(['{"plan":["step1"', ',"step2"]}'])
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ body: stream }))

  const res = await request(app).post('/generate').send({ prompt: 'hi' })
  expect(res.status).toBe(200)
  expect(res.body).toEqual({ plan: ['step1', 'step2'] })
  expect(generateSite).toHaveBeenCalled()
})
