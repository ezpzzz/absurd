import { LazyExoticComponent, ComponentType } from 'react'

export interface GeneratedRoute {
  path: string
  component: LazyExoticComponent<ComponentType<Record<string, unknown>>>
}

export const generatedRoutes: GeneratedRoute[] = []
