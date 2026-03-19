import { apiClient, isFailure } from '../../app/api/client'
import { AppDom } from '../../app/dom'
import { AppState } from '../../app/state/app-state'
import { setButtonLoading } from '../../app/ui/buttons'
import { setFeedbackState } from '../../app/ui/feedback'
import { setAssistantFeedback } from '../assistant/view'

interface UserFeatureDeps {
  dom: AppDom
  appState: AppState
}

export function initUserFeature({ dom, appState }: UserFeatureDeps): void {
  setUserFeedback(dom, 'Completa el formulario para crear un usuario demo.', 'neutral')

  dom.user.form.addEventListener('submit', (event) => {
    void createUser(event)
  })

  async function createUser(event: SubmitEvent): Promise<void> {
    event.preventDefault()

    setButtonLoading(dom.user.submitButton, true, 'Creando...')
    setUserFeedback(dom, 'Creando identidad demo y preparando el entorno para la IA...', 'pending')

    try {
      const response = await apiClient.registerUser({
        email: dom.user.emailInput.value,
        displayName: dom.user.displayNameInput.value,
        level: 'beginner',
        goals: ['aprender via frontend']
      })

      if (isFailure(response)) {
        setUserFeedback(dom, `${response.error.code}: ${response.error.message}`, 'error')
        return
      }

      appState.setCurrentUserId(response.data.id)
      setUserFeedback(dom, `Usuario demo creado con exito. ID: ${response.data.id}`, 'success')
      setAssistantFeedback(dom, 'Usuario activo. Ya puedes consultar al asistente IA.', 'idle')
    } catch (error) {
      setUserFeedback(dom, `Error al crear usuario: ${(error as Error).message}`, 'error')
    } finally {
      setButtonLoading(dom.user.submitButton, false, 'Creando...')
    }
  }
}

function setUserFeedback(dom: AppDom, message: string, state: 'neutral' | 'pending' | 'success' | 'error'): void {
  setFeedbackState(
    {
      container: dom.user.feedbackCardEl,
      messageElement: dom.user.resultEl
    },
    state,
    message
  )
}
