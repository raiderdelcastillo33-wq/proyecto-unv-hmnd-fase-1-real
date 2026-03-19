import { AppDom } from '../../app/dom'
import { AppState, AppStateSnapshot } from '../../app/state/app-state'
import { truncateMiddle } from '../../app/utils/format'

type HeroState = 'pending' | 'success' | 'error'

export function initShellFeature(dom: AppDom, appState: AppState): void {
  setHeroState(dom, 'Preparando la vista, comprobando salud del servicio y activando el workspace.', 'pending')
  setCatalogMetrics(dom, 0, 0, 0, 0)
  setCatalogStatus(dom, 'Listo para cargar')

  appState.subscribe((state) => {
    applyUserState(dom, state)
  })
}

export function setHeroState(dom: AppDom, message: string, state: HeroState): void {
  const labels: Record<HeroState, string> = {
    pending: 'Sincronizando sistema',
    success: 'Sistema operativo',
    error: 'Conexion inestable'
  }

  dom.shell.heroStatusPillEl.dataset.state = state
  dom.shell.heroStatusPillEl.textContent = labels[state]
  dom.shell.heroStatusCopyEl.textContent = message
}

export function setCatalogMetrics(
  dom: AppDom,
  courseCount: number,
  moduleCount: number,
  lessonCount: number,
  resourceCount: number
): void {
  dom.catalog.courseCountEl.textContent = String(courseCount)
  dom.catalog.moduleCountEl.textContent = String(moduleCount)
  dom.catalog.lessonCountEl.textContent = String(lessonCount)
  dom.catalog.resourceCountEl.textContent = String(resourceCount)
}

export function setCatalogStatus(dom: AppDom, message: string): void {
  dom.shell.catalogStatusCopyEl.textContent = message
}

function applyUserState(dom: AppDom, state: AppStateSnapshot): void {
  dom.shell.currentUserChipEl.textContent = state.currentUserId ? truncateMiddle(state.currentUserId) : 'Sin crear'
  dom.shell.assistantUserStateEl.textContent = state.currentUserId ? 'Listo para responder' : 'Esperando usuario'
}
