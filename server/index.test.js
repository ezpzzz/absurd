/** @jest-environment node */
import request from 'supertest';
import app from './index';
import { generateSite } from '../scripts/generateSite';
jest.mock('../scripts/generateSite', () => ({
    generateSite: jest.fn().mockResolvedValue(undefined),
}));
afterEach(() => {
    jest.restoreAllMocks();
});
test('POST /generate aggregates LM Studio stream', async () => {
    const res = await request(app).post('/generate').send({ prompt: 'hi' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ plan: ['step1', 'step2'] });
    expect(generateSite).toHaveBeenCalled();
});
