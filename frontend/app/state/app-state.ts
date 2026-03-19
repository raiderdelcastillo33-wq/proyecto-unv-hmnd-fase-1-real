export interface AppStateSnapshot {
  currentUserId: string | null
}

type AppStateListener = (state: AppStateSnapshot) => void

export interface AppState {
  getSnapshot(): AppStateSnapshot
  setCurrentUserId(userId: string | null): void
  subscribe(listener: AppStateListener): () => void
}

export function createAppState(): AppState {
  const listeners = new Set<AppStateListener>()
  const state: AppStateSnapshot = {
    currentUserId: null
  }

  function notify(): void {
    const snapshot = { ...state }
    listeners.forEach((listener) => {
      listener(snapshot)
    })
  }

  return {
    getSnapshot(): AppStateSnapshot {
      return { ...state }
    },

    setCurrentUserId(userId: string | null): void {
      state.currentUserId = userId
      notify()
    },

    subscribe(listener: AppStateListener): () => void {
      listeners.add(listener)
      listener({ ...state })

      return () => {
        listeners.delete(listener)
      }
    }
  }
}
