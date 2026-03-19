import { createAppDom } from './dom'
import { createAppState } from './state/app-state'
import { initAssistantFeature } from '../features/assistant/controller'
import { initCatalogFeature } from '../features/catalog/controller'
import { initHealthFeature } from '../features/health/controller'
import { initShellFeature } from '../features/shell/shell'
import { initUserFeature } from '../features/user/controller'

export function bootstrapApp(): void {
  const dom = createAppDom()
  const appState = createAppState()

  initShellFeature(dom, appState)
  initAssistantFeature({ dom, appState })
  initUserFeature({ dom, appState })
  initCatalogFeature({ dom })

  const healthFeature = initHealthFeature({ dom })
  void healthFeature.loadHealth()
}
