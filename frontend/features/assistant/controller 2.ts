import { apiClient, isFailure } from '../../app/api/client'
import { AppDom } from '../../app/dom'
import { AppState } from '../../app/state/app-state'
import { setButtonLoading } from '../../app/ui/buttons'
import { initializeAssistantView, setAssistantFeedback } from './view'

interface AssistantFeatureDeps {
  dom: AppDom
  appState: AppState
}

export function initAssistantFeature({ dom, appState }: AssistantFeatureDeps): void {
  initializeAssistantView(dom)

  dom.assistant.form.addEventListener('submit', (event) => {
    void askAssistant(event)
  })

  async function askAssistant(event: SubmitEvent): Promise<void> {
    event.preventDefault()

    const currentUserId = appState.getSnapshot().currentUserId

    if (!currentUserId) {
      setAssistantFeedback(dom, 'Primero crea un usuario demo para usar el asistente.', 'pending')
      return
    }

    setButtonLoading(dom.assistant.submitButton, true, 'Consultando...')
    setAssistantFeedback(dom, 'El asistente esta analizando tu solicitud...', 'pending')

    try {
      const response = await apiClient.askAssistant({
        userId: currentUserId,
        feature: 'assistant',
        prompt: dom.assistant.promptInput.value
      })

      if (isFailure(response)) {
        setAssistantFeedback(dom, `${response.error.code}: ${response.error.message}`, 'error')
        return
      }

      setAssistantFeedback(dom, response.data.response, 'success')
    } catch (error) {
      setAssistantFeedback(dom, `Error al consultar el asistente: ${(error as Error).message}`, 'error')
    } finally {
      setButtonLoading(dom.assistant.submitButton, false, 'Consultando...')
    }
  }
}
