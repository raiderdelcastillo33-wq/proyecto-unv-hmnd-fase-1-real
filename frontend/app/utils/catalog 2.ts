import { CatalogResponse } from '../types'

export interface CatalogMetrics {
  courseCount: number
  moduleCount: number
  lessonCount: number
  resourceCount: number
}

export function getCatalogMetrics(catalog: CatalogResponse): CatalogMetrics {
  return {
    courseCount: catalog.items.length,
    moduleCount: catalog.items.reduce((total, item) => total + item.modules.length, 0),
    lessonCount: catalog.items.reduce(
      (total, item) =>
        total + item.modules.reduce((moduleTotal, moduleItem) => moduleTotal + moduleItem.lessons.length, 0),
      0
    ),
    resourceCount: catalog.resources.length
  }
}
