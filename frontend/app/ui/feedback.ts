export type FeedbackState = 'neutral' | 'idle' | 'pending' | 'success' | 'error'

interface FeedbackTarget {
  container: HTMLElement
  messageElement: HTMLElement
}

export function setFeedbackState(target: FeedbackTarget, state: FeedbackState, message: string): void {
  target.container.dataset.state = state
  target.messageElement.textContent = message
}
