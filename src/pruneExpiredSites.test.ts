import { promises as fs } from 'fs';
import path from 'path';
import os from 'os';
import { execSync } from 'child_process';
import { pruneExpiredSites } from '../scripts/pruneExpiredSites.js';

const DAY_MS = 24 * 60 * 60 * 1000;

describe('pruneExpiredSites', () => {
  it('removes directories older than 24h and keeps others', async () => {
      jest.useFakeTimers();
      const now = new Date('2024-01-02T00:00:00Z');
      jest.setSystemTime(now);

    const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'prune-'));
    execSync('git init', { cwd: tmp });

    const generatedDir = path.join(tmp, 'src', 'generated');
    await fs.mkdir(generatedDir, { recursive: true });

    const oldDir = path.join(generatedDir, 'old');
    const freshDir = path.join(generatedDir, 'fresh');
    await fs.mkdir(oldDir);
    await fs.mkdir(freshDir);

    const oldTime = new Date(now.getTime() - 2 * DAY_MS);
    await fs.utimes(oldDir, oldTime, oldTime);
    await fs.utimes(freshDir, now, now);

    const nojekyllPath = path.join(tmp, '.nojekyll');
    await fs.writeFile(nojekyllPath, '');

    const deleted = await pruneExpiredSites(generatedDir);
    expect(deleted).toEqual(['old']);

    const oldExists = await fs.stat(oldDir).then(() => true).catch(() => false);
    const freshExists = await fs.stat(freshDir).then(() => true).catch(() => false);
    expect(oldExists).toBe(false);
    expect(freshExists).toBe(true);

    const nojekyllExists = await fs.stat(nojekyllPath).then(() => true).catch(() => false);
    expect(nojekyllExists).toBe(true);

      jest.useRealTimers();
    });
  });
