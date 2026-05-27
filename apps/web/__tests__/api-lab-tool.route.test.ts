/** @jest-environment node */

import { POST } from '@/app/api/lab/tool/route'

const ORIGINAL_ENV = process.env

function createJsonRequest(body: string): Request {
  return new Request('http://localhost/api/lab/tool', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
}

describe('POST /api/lab/tool', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env = {
      ...ORIGINAL_ENV,
      OWNER_ACCESS_CODE: 'owner-code'
    }
  })

  afterAll(() => {
    process.env = ORIGINAL_ENV
  })

  it('blocks missing or incorrect owner access code', async () => {
    const missingResponse = await POST(
      createJsonRequest(
        JSON.stringify({
          agentId: 'operator-agent',
          toolId: 'review-risk',
          input: 'review private lab risk'
        })
      ) as never
    )
    const missingPayload = await missingResponse.json()

    expect(missingResponse.status).toBe(403)
    expect(missingPayload).toEqual({
      success: false,
      error: 'Private lab access denied.'
    })

    const wrongResponse = await POST(
      createJsonRequest(
        JSON.stringify({
          ownerAccessCode: 'wrong-code',
          agentId: 'operator-agent',
          toolId: 'review-risk',
          input: 'review private lab risk'
        })
      ) as never
    )

    expect(wrongResponse.status).toBe(403)
  })

  it('blocks when OWNER_ACCESS_CODE is not configured server-side', async () => {
    delete process.env.OWNER_ACCESS_CODE

    const response = await POST(
      createJsonRequest(
        JSON.stringify({
          ownerAccessCode: 'owner-code',
          agentId: 'operator-agent',
          toolId: 'review-risk',
          input: 'review private lab risk'
        })
      ) as never
    )

    expect(response.status).toBe(403)
  })

  it('returns a ToolResult and audit events for valid owner access code', async () => {
    const response = await POST(
      createJsonRequest(
        JSON.stringify({
          ownerAccessCode: 'owner-code',
          agentId: 'reviewer-agent',
          toolId: 'review-risk',
          input: 'review private lab risk'
        })
      ) as never
    )
    const payload = await response.json()

    expect(response.status).toBe(200)
    expect(payload.success).toBe(true)
    expect(payload.data.result.toolId).toBe('review-risk')
    expect(payload.data.result.approval.decision).toBe('safe')
    expect(payload.data.result.approval.actionExecuted).toBe(false)
    expect(payload.data.auditEvents.some((event: { type: string }) => event.type === 'tool-requested')).toBe(true)
    expect(payload.data.auditEvents.some((event: { type: string }) => event.type === 'approval-evaluated')).toBe(true)
    expect(payload.data.auditEvents.some((event: { type: string }) => event.type === 'tool-result-created')).toBe(true)
    expect(JSON.stringify(payload)).not.toContain('systemInstructions')
    expect(JSON.stringify(payload)).not.toContain('"executed"')
  })

  it('keeps propose-terminal-command behind approval and text-only commands', async () => {
    const response = await POST(
      createJsonRequest(
        JSON.stringify({
          ownerAccessCode: 'owner-code',
          agentId: 'operator-agent',
          toolId: 'propose-terminal-command',
          input: 'prepare conservative verification commands'
        })
      ) as never
    )
    const payload = await response.json()

    expect(response.status).toBe(200)
    expect(payload.data.result.approval.decision).toBe('requires-approval')
    expect(payload.data.result.requiresHumanApproval).toBe(true)
    expect(payload.data.result.commands.length).toBeGreaterThan(0)
    expect(payload.data.result.commands.every((command: { requiresConfirmation: boolean }) => command.requiresConfirmation)).toBe(
      true
    )
    expect(JSON.stringify(payload)).not.toContain('"executed"')
  })
})
