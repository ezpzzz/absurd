import { promises as fs } from 'fs';
import path from 'path';

const DAY_MS = 24 * 60 * 60 * 1000;
const devLog = (...args) => console.log(...args);

export async function pruneExpiredSites(baseDir = path.join(process.cwd(), 'src', 'generated'), now = Date.now()) {
  const entries = await fs.readdir(baseDir, { withFileTypes: true }).catch(() => []);
  const deleted = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const full = path.join(baseDir, entry.name);
    const stat = await fs.stat(full);
    if (now - stat.mtimeMs > DAY_MS) {
      await fs.rm(full, { recursive: true, force: true });
      deleted.push(entry.name);
    }
  }
  return deleted;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  pruneExpiredSites().then((deleted) => {
    if (deleted.length === 0) {
      devLog('No expired sites found');
    } else {
      for (const d of deleted) {
        devLog(`Removed ${d}`);
      }
    }
  }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
