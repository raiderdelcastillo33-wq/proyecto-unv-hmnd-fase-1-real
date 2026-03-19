export function setButtonLoading(button: HTMLButtonElement, loading: boolean, loadingLabel: string): void {
  if (!button.dataset.defaultLabel) {
    button.dataset.defaultLabel = button.textContent?.trim() ?? ''
  }

  button.disabled = loading
  button.textContent = loading ? loadingLabel : button.dataset.defaultLabel
}
