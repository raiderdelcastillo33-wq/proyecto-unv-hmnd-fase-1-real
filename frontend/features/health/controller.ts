import { apiClient, isFailure } from '../../app/api/client'
import { AppDom } from '../../app/dom'
import { setButtonLoading } from '../../app/ui/buttons'
import { formatTimestamp } from '../../app/utils/format'
import { setHeroState } from '../shell/shell'

interface HealthFeatureDeps {
  dom: AppDom
}

export function initHealthFeature({ dom }: HealthFeatureDeps): { loadHealth: () => Promise<void> } {
  const loadHealth = async (): Promise<void> => {
    setButtonLoading(dom.health.button, true, 'Actualizando...')
    dom.health.calloutEl.dataset.state = 'pending'
    dom.health.visualDetailEl.textContent = 'Sincronizando panel'

    try {
      const data = await apiClient.getHealth()

      if (isFailure(data)) {
        throw new Error(data.error.message)
      }

      const timestamp = formatTimestamp()

      dom.health.statusEl.textContent = `Servicio ${data.service}: ${data.status}`
      dom.health.metaEl.textContent = 'El backend responde correctamente y la superficie visual esta sincronizada.'
      dom.health.calloutEl.dataset.state = 'success'
      dom.shell.systemServiceNameEl.textContent = data.service
      dom.health.serviceDetailEl.textContent = data.service
      dom.health.visualDetailEl.textContent = 'Panel sincronizado'
      dom.shell.systemLastCheckEl.textContent = timestamp
      setHeroState(dom, 'La infraestructura responde bien y el workspace esta listo para usarse.', 'success')
    } catch (error) {
      dom.health.statusEl.textContent = 'No fue posible verificar el servicio'
      dom.health.metaEl.textContent = `Error al consultar health: ${(error as Error).message}`
      dom.health.calloutEl.dataset.state = 'error'
      dom.health.visualDetailEl.textContent = 'Revision requerida'
      setHeroState(dom, 'La vista sigue disponible, pero la conexion con el backend necesita revision.', 'error')
    } finally {
      setButtonLoading(dom.health.button, false, 'Actualizando...')
    }
  }

  dom.health.button.addEventListener('click', () => {
    void loadHealth()
  })

  return { loadHealth }
}
