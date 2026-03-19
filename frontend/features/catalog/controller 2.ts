import { apiClient, isFailure } from '../../app/api/client'
import { AppDom } from '../../app/dom'
import { setButtonLoading } from '../../app/ui/buttons'
import { getCatalogMetrics } from '../../app/utils/catalog'
import { setCatalogMetrics, setCatalogStatus } from '../shell/shell'
import { renderCatalog, renderCatalogError, renderCatalogIdle } from './view'

interface CatalogFeatureDeps {
  dom: AppDom
}

export function initCatalogFeature({ dom }: CatalogFeatureDeps): void {
  renderCatalogIdle(dom.catalog.outputEl)

  dom.catalog.button.addEventListener('click', () => {
    void loadCatalog()
  })

  async function loadCatalog(): Promise<void> {
    setButtonLoading(dom.catalog.button, true, 'Cargando...')
    setCatalogStatus(dom, 'Cargando contenido')

    try {
      const response = await apiClient.loadCatalog()

      if (isFailure(response)) {
        renderCatalogError(dom.catalog.outputEl, `${response.error.code}: ${response.error.message}`)
        setCatalogStatus(dom, 'Error de catalogo')
        return
      }

      const metrics = getCatalogMetrics(response.data)

      setCatalogMetrics(dom, metrics.courseCount, metrics.moduleCount, metrics.lessonCount, metrics.resourceCount)
      setCatalogStatus(dom, `${metrics.courseCount} cursos / ${metrics.resourceCount} recursos`)
      renderCatalog(dom.catalog.outputEl, response.data)
    } catch (error) {
      renderCatalogError(dom.catalog.outputEl, `No se pudo cargar el catalogo: ${(error as Error).message}`)
      setCatalogStatus(dom, 'Error de carga')
    } finally {
      setButtonLoading(dom.catalog.button, false, 'Cargando...')
    }
  }
}
