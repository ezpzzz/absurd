import { lazy, LazyExoticComponent, ComponentType } from 'react'

export interface GeneratedRoute {
  path: string
  component: LazyExoticComponent<ComponentType<any>>
}

export const generatedRoutes: GeneratedRoute[] = []
