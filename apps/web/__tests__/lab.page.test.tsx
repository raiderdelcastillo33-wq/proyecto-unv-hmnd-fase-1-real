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
    expect(screen.getByText('GENIO Central Governance Layer')).toBeInTheDocument()
    expect(screen.getAllByText('GENIO Central').length).toBeGreaterThan(0)

    fireEvent.change(screen.getByLabelText('Owner access code'), {
      target: { value: 'owner-code' }
    })
    fireEvent.click(screen.getByRole('button', { name: 'Unlock lab' }))

    expect(await screen.findByText('Generate an auditable proposal')).toBeInTheDocument()
    expect(screen.getAllByText('Humanity Guide OS').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Humanity Guide OS - Intelligent Organization MVP').length).toBeGreaterThan(0)
    expect(screen.getByText('No AGI claims')).toBeInTheDocument()
    expect(screen.getByText('GENESIS: reflection-layer')).toBeInTheDocument()
    expect(screen.getByText('Organization Simulation Panel')).toBeInTheDocument()
    expect(screen.getByText('Guided Flow Timeline')).toBeInTheDocument()
    expect(screen.getByText('What is happening?')).toBeInTheDocument()
    expect(screen.getByText('GENIO is analyzing organization patterns')).toBeInTheDocument()
    expect(screen.getByText('GENESIS is observing contextual overload')).toBeInTheDocument()
    expect(screen.getByText('Alignment Layer validates human-centered clarity')).toBeInTheDocument()
    expect(screen.getByText('Organization proposal generated')).toBeInTheDocument()
    expect(screen.getByText('Simulation complete')).toBeInTheDocument()
    expect(screen.getByText('Chaos Detection Summary')).toBeInTheDocument()
    expect(screen.getByLabelText('Organization Impact Metrics')).toBeInTheDocument()
    expect(screen.getByText('GENIO Analysis Card')).toBeInTheDocument()
    expect(screen.getByLabelText('GENIO Thinking State')).toBeInTheDocument()
    expect(screen.getByText('GENESIS Reflection Card')).toBeInTheDocument()
    expect(screen.getByLabelText('GENESIS Reflection Feed')).toBeInTheDocument()
    expect(screen.getByText('Alignment Validation Card')).toBeInTheDocument()
    expect(screen.getByLabelText('Alignment Status Indicator')).toBeInTheDocument()
    expect(screen.getByText('Before / After Visualization')).toBeInTheDocument()
    expect(screen.getByLabelText('Interactive Before/After Toggle')).toBeInTheDocument()
    expect(screen.getByText('Clarity Score Visualization')).toBeInTheDocument()
    expect(screen.getByText('Estimated time saved')).toBeInTheDocument()
    expect(screen.getAllByText('Estimated clarity improvement').length).toBeGreaterThan(0)
    expect(screen.getByText('Organization Proposal Checklist')).toBeInTheDocument()
    expect(screen.getAllByText('No real filesystem access').length).toBeGreaterThan(0)
    expect(screen.getByLabelText('No real filesystem access safety indicator')).toBeInTheDocument()
    expect(screen.getByText('No overautomation')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'After' }))
    expect(screen.getByRole('button', { name: 'After' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'Next step' }))
    expect(screen.getByText('The system reads mock signals only')).toBeInTheDocument()
    expect(screen.getByText('Auth blueprint')).toBeInTheDocument()
    expect(screen.getByText('Real Owner Auth Blueprint')).toBeInTheDocument()
    expect(screen.getAllByText('owner-access-code').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Real auth not implemented').length).toBeGreaterThan(0)
    expect(screen.getByText('No sessions')).toBeInTheDocument()
    expect(screen.getByText('Observability blueprint')).toBeInTheDocument()
    expect(screen.getByText('Persistent Audit & Observability Blueprint')).toBeInTheDocument()
    expect(screen.getAllByText('trace-genio-blueprint').length).toBeGreaterThan(0)
    expect(screen.getByText('No telemetry')).toBeInTheDocument()
    expect(screen.getByText('No persistent audit')).toBeInTheDocument()
    expect(screen.getByText('Capability blueprint')).toBeInTheDocument()
    expect(screen.getByText('Controlled Practical Capability Blueprint')).toBeInTheDocument()
    expect(screen.getByText('Capability runtime: no')).toBeInTheDocument()
    expect(screen.getByText('Future Terminal Execution Capability: critical-risk')).toBeInTheDocument()
    expect(screen.getByText('Runtime sandbox blueprint')).toBeInTheDocument()
    expect(screen.getByText('Controlled Runtime Sandbox Blueprint')).toBeInTheDocument()
    expect(screen.getByText('Runtime sandbox: no')).toBeInTheDocument()
    expect(screen.getByText('Isolation simulation-only')).toBeInTheDocument()
    expect(screen.getByText('File preview blueprint')).toBeInTheDocument()
    expect(screen.getByText('Read-Only File Preview Adapter Blueprint')).toBeInTheDocument()
    expect(screen.getByText('Filesystem access: no')).toBeInTheDocument()
    expect(screen.getByText('Redaction metadata-only')).toBeInTheDocument()
    expect(screen.getByText('Memory blueprint')).toBeInTheDocument()
    expect(screen.getByText('GENIO Memory & Context Blueprint')).toBeInTheDocument()
    expect(screen.getByText('No persistent memory')).toBeInTheDocument()
    expect(screen.getByText('No embeddings')).toBeInTheDocument()
    expect(screen.getByText('Orchestration blueprint')).toBeInTheDocument()
    expect(screen.getByText('Strategic Multi-Agent Orchestration Layer')).toBeInTheDocument()
    expect(screen.getByText('No workers')).toBeInTheDocument()
    expect(screen.getByText('Adapter blueprint')).toBeInTheDocument()
    expect(screen.getByText('Controlled Adapter Blueprint')).toBeInTheDocument()
    expect(screen.getByText('Adapter blueprint != adapter real')).toBeInTheDocument()
    expect(screen.getByLabelText('Agent')).toHaveValue('operator-agent')
    expect(screen.getByLabelText('Tool')).toHaveValue('review-risk')
    expect(screen.getByText('Risk high')).toBeInTheDocument()
    expect(screen.getByText('Hierarchy specialist')).toBeInTheDocument()
    expect(screen.getByText('Parent genio-central')).toBeInTheDocument()
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
            ownerApproval: {
              proposalId: 'tool-propose-terminal-command',
              correlationId: 'corr-tool-propose-terminal-command',
              sessionId: 'private-lab-local-session',
              approvalStatus: 'pending',
              simulationOnly: true,
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
              simulationOnly: true,
              governanceSource: 'genio-central',
              hierarchyLevel: 'supervisor',
              agentId: 'operator-agent',
              toolId: 'propose-terminal-command'
            },
            {
              id: 'audit-2',
              type: 'approval-evaluated',
              timestamp: '2026-05-27T00:00:00.000Z',
              actionExecuted: false,
              simulationOnly: true,
              governanceSource: 'approval-gate',
              hierarchyLevel: 'supervisor',
              approvalDecision: 'requires-approval',
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
    expect(screen.getAllByText('Action performed: no').length).toBeGreaterThan(0)
    expect(screen.getByText('Suggested commands as text only')).toBeInTheDocument()
    expect(screen.getByText('npm test')).toBeInTheDocument()
    expect(screen.getByText('2 events in memory')).toBeInTheDocument()
    expect(screen.getByText('Owner approval flow')).toBeInTheDocument()
    expect(screen.getByText('pending')).toBeInTheDocument()
    expect(screen.getByText('Approve != Execute')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Approve proposal' }))
    expect(screen.getByText('approved')).toBeInTheDocument()
    expect(screen.getByText('3 events in memory')).toBeInTheDocument()
    expect(screen.getByText('Owner owner')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Reject proposal' }))
    expect(screen.getByText('rejected')).toBeInTheDocument()
    expect(screen.getByText('4 events in memory')).toBeInTheDocument()
    expect(screen.getByText('Rejected by owner in proposal-only lab.')).toBeInTheDocument()
    expect(screen.getAllByText('Simulation only').length).toBeGreaterThan(0)
    expect(screen.getByText('Governance observability')).toBeInTheDocument()
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
