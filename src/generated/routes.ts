import { LazyExoticComponent, ComponentType, lazy } from 'react'

export interface GeneratedRoute {
  path: string
  component: LazyExoticComponent<ComponentType<Record<string, unknown>>>
}

export const generatedRoutes: GeneratedRoute[] = []

generatedRoutes.push({
  path: '/site/test',
  component: lazy(() => import('./test/index/index')),
})
