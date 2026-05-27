import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import LabPage from '@/app/lab/page'

function createJsonResponse(payload: unknown, status = 200): Response {
  const text = JSON.stringify(payload)

  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => payload,
    text: async () => text
  } as Response
}

describe('LabPage', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    global.fetch = jest.fn()
  })

  it('renders locked initially and unlocks with local input state', async () => {
    const fetchMock = global.fetch as jest.Mock
    fetchMock.mockResolvedValueOnce(
      createJsonResponse({
        success: true,
        data: {
          agents: [
            {
              id: 'operator-agent',
              label: 'Operator',
              description: 'Operational planning and conservative command proposals.',
              category: 'operations',
              capabilities: ['task coordination', 'command proposal'],
              riskProfile: 'high',
              allowedTools: ['review-risk', 'propose-terminal-command']
            }
          ],
          tools: [
            {
              id: 'review-risk',
              label: 'Review Risk',
              description: 'Review risks, mitigations, and test coverage.',
              category: 'review',
              riskLevel: 'medium',
              requiresApproval: false,
              outputType: 'risk-review'
            }
          ]
        }
      })
    )

    render(<LabPage />)

    expect(screen.getByText('Owner access required')).toBeInTheDocument()
    expect(screen.getByText('proposal != execution')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Owner access code'), {
      target: { value: 'owner-code' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Unlock lab' }))

    expect(await screen.findByText('Generate an auditable proposal')).toBeInTheDocument()
    expect(screen.getByLabelText('Agent')).toHaveValue('operator-agent')
    expect(screen.getByLabelText('Tool')).toHaveValue('review-risk')
    expect(screen.getByText('Risk high')).toBeInTheDocument()
  })

  it('renders ToolResult, approval metadata, commands, and audit events', async () => {
    const fetchMock = global.fetch as jest.Mock

    fetchMock.mockResolvedValueOnce(
      createJsonResponse({
        success: true,
        data: {
          agents: [
            {
              id: 'operator-agent',
              label: 'Operator',
              description: 'Operational planning and conservative command proposals.',
              category: 'operations',
              capabilities: ['task coordination', 'command proposal'],
              riskProfile: 'high',
              allowedTools: ['review-risk', 'propose-terminal-command']
            }
          ],
          tools: [
            {
              id: 'review-risk',
              label: 'Review Risk',
              description: 'Review risks, mitigations, and test coverage.',
              category: 'review',
              riskLevel: 'medium',
              requiresApproval: false,
              outputType: 'risk-review'
            },
            {
              id: 'propose-terminal-command',
              label: 'Propose Terminal Command',
              description: 'Suggest verification commands as text only.',
              category: 'operations',
              riskLevel: 'medium',
              requiresApproval: true,
              outputType: 'command-proposal'
            }
          ]
        }
      })
    )

    fetchMock.mockResolvedValueOnce(
      createJsonResponse({
        success: true,
        data: {
          result: {
            toolId: 'propose-terminal-command',
            title: 'Terminal Command Proposal',
            summary: 'Verification commands proposed for private lab.',
            requiresHumanApproval: true,
            riskLevel: 'medium',
            approval: {
              proposalId: 'tool-propose-terminal-command',
              permission: 'propose-command',
              decision: 'requires-approval',
              reason: 'This action requires explicit human approval.',
              requiresHumanApproval: true,
              actionExecuted: false
            },
            sections: [
              {
                heading: 'Safety',
                items: ['Commands are suggestions only.', 'Review and approve before running anything.']
              }
            ],
            commands: [
              {
                command: 'npm test',
                purpose: 'Run backend/domain test suite.',
                riskLevel: 'low',
                requiresConfirmation: true
              }
            ]
          },
          auditEvents: [
            {
              id: 'audit-1',
              type: 'tool-requested',
              timestamp: '2026-05-27T00:00:00.000Z',
              actionExecuted: false,
              agentId: 'operator-agent',
              toolId: 'propose-terminal-command'
            },
            {
              id: 'audit-2',
              type: 'approval-evaluated',
              timestamp: '2026-05-27T00:00:00.000Z',
              actionExecuted: false,
              decision: 'requires-approval',
              toolId: 'propose-terminal-command'
            }
          ]
        }
      })
    )

    render(<LabPage />)

    fireEvent.change(screen.getByLabelText('Owner access code'), {
      target: { value: 'owner-code' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Unlock lab' }))

    expect(await screen.findByText('Generate an auditable proposal')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Tool'), {
      target: { value: 'propose-terminal-command' }
    })
    fireEvent.change(screen.getByLabelText('Input'), {
      target: { value: 'prepare safe commands' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Generate proposal' }))

    expect(await screen.findByText('Terminal Command Proposal')).toBeInTheDocument()
    expect(screen.getAllByText('requires-approval').length).toBeGreaterThan(0)
    expect(screen.getByText('Action performed: no')).toBeInTheDocument()
    expect(screen.getByText('Suggested commands as text only')).toBeInTheDocument()
    expect(screen.getByText('npm test')).toBeInTheDocument()
    expect(screen.getByText('2 events in memory')).toBeInTheDocument()
    expect(screen.queryByText(/systemInstructions/i)).not.toBeInTheDocument()
    expect(screen.queryByText('"executed"')).not.toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/lab/tool',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          ownerAccessCode: 'owner-code',
          agentId: 'operator-agent',
          toolId: 'propose-terminal-command',
          input: 'prepare safe commands'
        })
      })
    )
  })

  it('shows access errors from the private lab route', async () => {
    const fetchMock = global.fetch as jest.Mock

    fetchMock.mockResolvedValueOnce(
      createJsonResponse({
        success: true,
        data: {
          agents: [
            {
              id: 'operator-agent',
              label: 'Operator',
              description: 'Operational planning and conservative command proposals.',
              category: 'operations',
              capabilities: ['task coordination', 'command proposal'],
              riskProfile: 'high',
              allowedTools: ['review-risk']
            }
          ],
          tools: [
            {
              id: 'review-risk',
              label: 'Review Risk',
              description: 'Review risks, mitigations, and test coverage.',
              category: 'review',
              riskLevel: 'medium',
              requiresApproval: false,
              outputType: 'risk-review'
            }
          ]
        }
      })
    )

    fetchMock.mockResolvedValueOnce(
      createJsonResponse(
        {
          success: false,
          error: 'Private lab access denied.'
        },
        403
      )
    )

    render(<LabPage />)

    fireEvent.change(screen.getByLabelText('Owner access code'), {
      target: { value: 'wrong-code' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Unlock lab' }))

    expect(await screen.findByText('Generate an auditable proposal')).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Input'), {
      target: { value: 'try private lab' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Generate proposal' }))

    await waitFor(() => {
      expect(screen.getByText('Private lab access denied.')).toBeInTheDocument()
    })
  })
})
