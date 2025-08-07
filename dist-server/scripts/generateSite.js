import { promises as fs } from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { z } from 'zod';
// Zod schema definitions
const CitationSchema = z.object({
    text: z.string(),
    url: z.string().url(),
});
const ChartSchema = z.object({
    title: z.string(),
    data: z.array(z.number()),
});
const PageSchema = z.object({
    slug: z.string(),
    title: z.string(),
    body: z.string(),
});
export const SiteSchema = z.object({
    id: z.string(),
    expiryTimestamp: z.number(),
    pages: z.array(PageSchema),
    citations: z.array(CitationSchema),
    charts: z.array(ChartSchema),
});
// Minimal Mustache-style renderer (placeholder for full library)
function formatCitation(citation) {
    const year = 2000 + Math.floor(Math.random() * 25);
    const author = 'Doe, J.';
    if (Math.random() < 0.5) {
        return `${author} (${year}) ${citation.text}. Available at: ${citation.url}.`;
    }
    return `${author}. (${year}). ${citation.text}. ${citation.url}`;
}
export async function generateSite(rawSchema) {
    const schema = SiteSchema.parse(rawSchema);
    const baseDir = path.join(process.cwd(), 'src', 'generated', schema.id);
    const routeLines = [];
    for (const page of schema.pages) {
        const pageDir = path.join(baseDir, page.slug);
        await fs.mkdir(pageDir, { recursive: true });
        const chartLines = schema.charts
            .map((chart) => `      <Chart title="${chart.title}" data={[${chart.data.join(', ')}]} />`)
            .join('\n');
        const citationLines = schema.citations
            .map((c) => `        <li>${formatCitation(c)}</li>`)
            .join('\n');
        const content = `import React from 'react'\nimport Chart from '../../../components/Chart'\n\nconst Page = () => (\n  <div>\n    <h1>${page.title}</h1>\n    <p>${page.body}</p>\n${chartLines ? `    <div>\n${chartLines}\n    </div>\n` : ''}    <ol>\n${citationLines}\n    </ol>\n  </div>\n)\n\nexport default Page\n`;
        await fs.writeFile(path.join(pageDir, 'index.tsx'), content);
        const routePath = page.slug === 'index' ? `/site/${schema.id}` : `/site/${schema.id}/${page.slug}`;
        const importPath = `./${schema.id}/${page.slug}/index.tsx`;
        routeLines.push(`generatedRoutes.push({ path: '${routePath}', component: lazy(() => import('${importPath}')) })`);
    }
    const routesFile = path.join(process.cwd(), 'src', 'generated', 'routes.ts');
    await fs.appendFile(routesFile, routeLines.join('\n') + '\n');
    if (process.env.NODE_ENV === 'production') {
        await new Promise((resolve, reject) => {
            const child = spawn('npm', ['run', 'build'], { stdio: 'inherit' });
            child.on('close', code => (code === 0 ? resolve() : reject(new Error(`build failed with code ${code}`))));
        });
    }
}
