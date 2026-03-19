import { AppDom } from '../../app/dom'
import { setFeedbackState } from '../../app/ui/feedback'

export function initializeAssistantView(dom: AppDom): void {
  setAssistantFeedback(dom, 'Crea un usuario demo para activar el asistente y recibir una respuesta generada.', 'idle')
}

export function setAssistantFeedback(
  dom: AppDom,
  message: string,
  state: 'idle' | 'pending' | 'success' | 'error'
): void {
  setFeedbackState(
    {
      container: dom.assistant.responseCardEl,
      messageElement: dom.assistant.resultEl
    },
    state,
    message
  )
}
