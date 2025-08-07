import { promises as fs } from 'fs'
import path from 'path'
import { spawn } from 'child_process'

function formatCitation(citation) {
  const year = 2000 + Math.floor(Math.random() * 25)
  const author = 'Doe, J.'
  if (Math.random() < 0.5) {
    return `${author} (${year}) ${citation.text}. Available at: ${citation.url}.`
  }
  return `${author}. (${year}). ${citation.text}. ${citation.url}`
}

export async function generateSite(schema) {
  const baseDir = path.join(process.cwd(), 'src', 'generated', schema.id)
  const routeLines = []
  for (const page of schema.pages) {
    const pageDir = path.join(baseDir, page.slug)
    await fs.mkdir(pageDir, { recursive: true })
    const chartLines = schema.charts
      .map((chart) => `      <Figure title="${chart.title}" data={[${chart.data.join(', ')}]} />`)
      .join('\n')
    const citationLines = schema.citations
      .map((c) => `        <li>${formatCitation(c)}</li>`)
      .join('\n')
    const content = `import React from 'react'\nimport Figure from '../../../components/Figure'\n\nconst Page = () => (\n  <div>\n    <h1>${page.title}</h1>\n    <p>${page.body}</p>\n${chartLines ? `    <div>\n${chartLines}\n    </div>\n` : ''}    <ol>\n${citationLines}\n    </ol>\n  </div>\n)\n\nexport default Page\n`
    await fs.writeFile(path.join(pageDir, 'index.tsx'), content)
    const routePath = page.slug === 'index' ? `/site/${schema.id}` : `/site/${schema.id}/${page.slug}`
    const importPath = `./${schema.id}/${page.slug}/index.tsx`
    routeLines.push(`generatedRoutes.push({ path: '${routePath}', component: lazy(() => import('${importPath}')) })`)
  }
  const routesFile = path.join(process.cwd(), 'src', 'generated', 'routes.ts')
  await fs.appendFile(routesFile, routeLines.join('\n') + '\n')
  if (process.env.NODE_ENV === 'production') {
    await new Promise((resolve, reject) => {
      const child = spawn('npm', ['run', 'build'], { stdio: 'inherit' })
      child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`build failed with code ${code}`))))
    })
  }
}
