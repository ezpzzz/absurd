import { promises as fs } from 'fs';
import path from 'path';
import { spawn } from 'child_process';
// Minimal Mustache-style renderer (placeholder for full library)
function render(template, view) {
    return template.replace(/{{\s*([\w.]+)\s*}}/g, (_, key) => view[key] ?? '');
}
export async function generateSite(schema) {
    const baseDir = path.join(process.cwd(), 'src', 'generated', schema.id);
    const template = `import React from 'react'

const Page = () => (
  <div>
    <h1>{{title}}</h1>
    <p>{{body}}</p>
  </div>
)

export default Page\n`;
    const routeLines = [];
    for (const page of schema.pages) {
        const pageDir = path.join(baseDir, page.slug);
        await fs.mkdir(pageDir, { recursive: true });
        const content = render(template, { title: page.title, body: page.body });
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
