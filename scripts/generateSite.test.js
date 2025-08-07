import path from 'path';
import { generateSite } from './generateSite';
import { promises as fs } from 'fs';
jest.mock('fs', () => ({
    promises: {
        mkdir: jest.fn().mockResolvedValue(undefined),
        writeFile: jest.fn().mockResolvedValue(undefined),
        appendFile: jest.fn().mockResolvedValue(undefined),
    },
}));
test('generates site files', async () => {
    const schema = {
        id: 'test',
        expiryTimestamp: Date.now(),
        pages: [{ slug: 'index', title: 'Title', body: 'Body' }],
        citations: [{ text: 'Cite', url: 'http://example.com' }],
        charts: [{ title: 'Chart', data: [1, 2, 3] }],
    };
    await generateSite(schema);
    const baseDir = path.join(process.cwd(), 'src', 'generated', 'test', 'index');
    expect(fs.mkdir).toHaveBeenCalledWith(baseDir, { recursive: true });
    expect(fs.writeFile).toHaveBeenCalled();
    expect(fs.appendFile).toHaveBeenCalled();
});
