import assert from 'node:assert'
import { apiClient, isFailure } from '../../frontend/app/api/client'
import { createAppState } from '../../frontend/app/state/app-state'
import { setButtonLoading } from '../../frontend/app/ui/buttons'
import { getCatalogMetrics } from '../../frontend/app/utils/catalog'
import { formatLessonType, formatLevel, truncateMiddle } from '../../frontend/app/utils/format'
import { escapeHtml } from '../../frontend/app/utils/html'
import { TestCase } from '../helpers/testRunner'

export function frontendBasicTests(): TestCase[] {
  return [
    {
      name: 'Frontend: app state publica snapshot inicial y notifica cambios',
      run: async () => {
        const appState = createAppState()
        const snapshots: Array<string | null> = []

        const unsubscribe = appState.subscribe((state) => {
          snapshots.push(state.currentUserId)
        })

        appState.setCurrentUserId('user-123')
        appState.setCurrentUserId(null)
        unsubscribe()
        appState.setCurrentUserId('user-456')

        assert.deepStrictEqual(snapshots, [null, 'user-123', null])
        assert.strictEqual(appState.getSnapshot().currentUserId, 'user-456')
      }
    },
    {
      name: 'Frontend: catalog metrics calcula cursos, modulos, lecciones y recursos',
      run: async () => {
        const metrics = getCatalogMetrics({
          items: [
            {
              course: {
                id: 'course-1',
                title: 'Curso 1',
                description: 'Descripcion',
                level: 'beginner'
              },
              modules: [
                {
                  module: { id: 'module-1', title: 'Modulo 1', position: 1 },
                  lessons: [
                    {
                      id: 'lesson-1',
                      title: 'Leccion 1',
                      objective: 'Objetivo 1',
                      durationMinutes: 20,
                      type: 'tutorial'
                    }
                  ]
                },
                {
                  module: { id: 'module-2', title: 'Modulo 2', position: 2 },
                  lessons: [
                    {
                      id: 'lesson-2',
                      title: 'Leccion 2',
                      objective: 'Objetivo 2',
                      durationMinutes: 30,
                      type: 'practice'
                    },
                    {
                      id: 'lesson-3',
                      title: 'Leccion 3',
                      objective: 'Objetivo 3',
                      durationMinutes: 40,
                      type: 'project'
                    }
                  ]
                }
              ]
            }
          ],
          resources: [
            { id: 'resource-1', title: 'Prompt', category: 'prompt', description: 'Desc' },
            { id: 'resource-2', title: 'Snippet', category: 'snippet', description: 'Desc' }
          ]
        })

        assert.deepStrictEqual(metrics, {
          courseCount: 1,
          moduleCount: 2,
          lessonCount: 3,
          resourceCount: 2
        })
      }
    },
    {
      name: 'Frontend: utilidades de formato y escape mantienen salidas esperadas',
      run: async () => {
        assert.strictEqual(truncateMiddle('short-id'), 'short-id')
        assert.strictEqual(truncateMiddle('12345678901234567890', 10), '1234...890')
        assert.strictEqual(formatLevel('advanced'), 'Advanced')
        assert.strictEqual(formatLessonType('code-feedback'), 'Code Feedback')
        assert.strictEqual(escapeHtml('<div class="x">Tom & Jerry</div>'), '&lt;div class=&quot;x&quot;&gt;Tom &amp; Jerry&lt;/div&gt;')
      }
    },
    {
      name: 'Frontend: button loading conserva etiqueta original y alterna disabled',
      run: async () => {
        const button = {
          dataset: {} as DOMStringMap,
          textContent: 'Crear usuario',
          disabled: false
        } as HTMLButtonElement

        setButtonLoading(button, true, 'Creando...')
        assert.strictEqual(button.disabled, true)
        assert.strictEqual(button.textContent, 'Creando...')

        setButtonLoading(button, false, 'Creando...')
        assert.strictEqual(button.disabled, false)
        assert.strictEqual(button.textContent, 'Crear usuario')
      }
    },
    {
      name: 'Frontend: apiClient devuelve failure tipado en errores de red',
      run: async () => {
        const originalFetch = globalThis.fetch

        globalThis.fetch = (async () => {
          throw new Error('socket hang up')
        }) as typeof fetch

        try {
          const response = await apiClient.getHealth()
          assert.ok(isFailure(response))
          assert.strictEqual(response.error.code, 'NETWORK_ERROR')
          assert.match(response.error.message, /socket hang up/)
        } finally {
          globalThis.fetch = originalFetch
        }
      }
    },
    {
      name: 'Frontend: apiClient propaga ApiFailure del backend en respuestas no exitosas',
      run: async () => {
        const originalFetch = globalThis.fetch

        globalThis.fetch = (async () =>
          new Response(
            JSON.stringify({
              success: false,
              error: {
                code: 'VALIDATION_ERROR',
                message: 'Email invalido'
              }
            }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )) as typeof fetch

        try {
          const response = await apiClient.registerUser({
            email: 'bad-email',
            displayName: 'Demo',
            level: 'beginner',
            goals: ['aprender']
          })

          assert.ok(isFailure(response))
          assert.strictEqual(response.error.code, 'VALIDATION_ERROR')
          assert.strictEqual(response.error.message, 'Email invalido')
        } finally {
          globalThis.fetch = originalFetch
        }
      }
    },
    {
      name: 'Frontend: apiClient maneja respuestas HTTP no JSON como failure controlado',
      run: async () => {
        const originalFetch = globalThis.fetch

        globalThis.fetch = (async () =>
          new Response('<html>Bad Gateway</html>', {
            status: 502,
            headers: {
              'Content-Type': 'text/html'
            }
          })) as typeof fetch

        try {
          const response = await apiClient.loadCatalog()
          assert.ok(isFailure(response))
          assert.strictEqual(response.error.code, 'HTTP_502')
          assert.strictEqual(response.error.message, '<html>Bad Gateway</html>')
        } finally {
          globalThis.fetch = originalFetch
        }
      }
    }
  ]
}
