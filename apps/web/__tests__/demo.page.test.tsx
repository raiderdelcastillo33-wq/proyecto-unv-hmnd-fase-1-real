import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import DemoPage from '@/app/demo/page'

function createJsonResponse(payload: unknown, status = 200): Response {
  const text = JSON.stringify(payload)

  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => payload,
    text: async () => text
  } as Response
}

describe('DemoPage', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    global.fetch = jest.fn()
  })

  it('renders the happy path from runtime check to backend response', async () => {
    const fetchMock = global.fetch as jest.Mock

    fetchMock.mockResolvedValueOnce(
      createJsonResponse({
        status: 'ok',
        configured: false,
        service: 'api-server',
        mode: 'local',
        backend: 'http://127.0.0.1:3000'
      })
    )

    fetchMock.mockResolvedValueOnce(
      createJsonResponse({
        success: true,
        data: {
          id: 'run-1',
          response: 'Hello from the mocked backend'
        }
      })
    )

    render(<DemoPage />)

    expect(await screen.findByText('Backend local prêt')).toBeInTheDocument()
    expect(screen.getByLabelText('Agent')).toHaveValue('tutor-agent')
    expect(screen.getByText('Explains technical ideas step by step for learning and practice.')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'hello demo flow' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Exécuter la démo' }))

    expect(await screen.findByText('Hello from the mocked backend')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      '/api/health',
      expect.objectContaining({
        cache: 'no-store'
      })
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      '/api/v1/run',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          input: 'hello demo flow',
          agentId: 'tutor-agent'
        })
      })
    )
  })

  it('sends the selected agentId with the demo request', async () => {
    const fetchMock = global.fetch as jest.Mock

    fetchMock.mockResolvedValueOnce(
      createJsonResponse({
        status: 'ok',
        configured: false,
        service: 'api-server',
        mode: 'local',
        backend: 'http://127.0.0.1:3000'
      })
    )

    fetchMock.mockResolvedValueOnce(
      createJsonResponse({
        success: true,
        data: {
          id: 'run-agent',
          response: 'Architect response'
        }
      })
    )

    render(<DemoPage />)

    expect(await screen.findByText('Backend local prêt')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Agent'), {
      target: { value: 'architect-agent' }
    })
    expect(screen.getByText('Analyse architecture, risks, and phased technical decisions.')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'hello architect flow' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Exécuter la démo' }))

    expect(await screen.findByText('Architect response')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      '/api/v1/run',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          input: 'hello architect flow',
          agentId: 'architect-agent'
        })
      })
    )
  })

  it('shows a validation error and does not submit when input is too short', async () => {
    const fetchMock = global.fetch as jest.Mock

    fetchMock.mockResolvedValueOnce(
      createJsonResponse({
        status: 'ok',
        configured: false,
        service: 'api-server',
        mode: 'local',
        backend: 'http://127.0.0.1:3000'
      })
    )

    render(<DemoPage />)

    expect(await screen.findByText('Backend local prêt')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'test' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Exécuter la démo' }))

    expect(await screen.findByText('Please enter at least 5 characters before sending the demo request.')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('shows a controlled runtime warning but keeps submit enabled when backend config is missing', async () => {
    const fetchMock = global.fetch as jest.Mock

    fetchMock.mockResolvedValueOnce(
      createJsonResponse(
        {
          error: 'UNV_API_BASE_URL is required in production to reach the external Node API.'
        },
        503
      )
    )

    render(<DemoPage />)

    expect(await screen.findByText('Action backend requise')).toBeInTheDocument()
    expect(screen.getByText('UNV_API_BASE_URL is required in production to reach the external Node API.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Exécuter la démo' })).not.toBeDisabled()
  })

  it('renders the safe demo fallback response when backend config is missing', async () => {
    const fetchMock = global.fetch as jest.Mock

    fetchMock.mockResolvedValueOnce(
      createJsonResponse(
        {
          error: 'UNV_API_BASE_URL is required in production to reach the external Node API.'
        },
        503
      )
    )

    fetchMock.mockResolvedValueOnce(
      createJsonResponse({
        success: true,
        data: {
          id: 'demo-fallback-1',
          response: 'Mode demo/fallback actif: aucun backend Node externe nest configure.'
        },
        meta: {
          mode: 'demo-fallback',
          agentId: 'tutor'
        }
      })
    )

    render(<DemoPage />)

    expect(await screen.findByText('Action backend requise')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'hello fallback flow' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Exécuter la démo' }))

    expect(await screen.findByText('Mode demo/fallback actif: aucun backend Node externe nest configure.')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      '/api/v1/run',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          input: 'hello fallback flow',
          agentId: 'tutor-agent'
        })
      })
    )
  })

  it('renders a controlled submit error when /api/v1/run fails', async () => {
    const fetchMock = global.fetch as jest.Mock

    fetchMock.mockResolvedValueOnce(
      createJsonResponse({
        status: 'ok',
        configured: true,
        service: 'api-server',
        mode: 'external',
        backend: null
      })
    )

    fetchMock.mockResolvedValueOnce(
      createJsonResponse(
        {
          error: 'UNV_API_BASE_URL is required in production to connect the demo with the Node API.'
        },
        503
      )
    )

    render(<DemoPage />)

    expect(await screen.findByText('Backend externe prêt')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'hello demo flow' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Exécuter la démo' }))

    await waitFor(() => {
      expect(screen.getByText('UNV_API_BASE_URL is required in production to connect the demo with the Node API.')).toBeInTheDocument()
    })
  })
})
