import { render, screen } from '@testing-library/react'
import PersonalOrganizerPage from '@/app/personal/page'

describe('PersonalOrganizerPage', () => {
  it('renders owner daily personal organizer mode with safety boundaries', () => {
    render(<PersonalOrganizerPage />)

    expect(screen.getByText('Humanity Guide OS - Personal Organizer Mode')).toBeInTheDocument()
    expect(screen.getByText('Owner daily surface')).toBeInTheDocument()
    expect(screen.getByText('One place to reduce daily chaos')).toBeInTheDocument()
    expect(screen.getByText('`/personal` is the owner-facing mode. `/lab` remains the technical governance and blueprint surface.')).toBeInTheDocument()
    expect(screen.getByText('Documents need review')).toBeInTheDocument()
    expect(screen.getByText('Photos need lightweight grouping')).toBeInTheDocument()
    expect(screen.getByText('Inbox needs owner decisions')).toBeInTheDocument()
    expect(screen.getByText('Daily priorities can be reduced')).toBeInTheDocument()
    expect(screen.getByText('Suggested next actions, not executed actions')).toBeInTheDocument()
    expect(screen.getByText('Personal usefulness without unsafe automation')).toBeInTheDocument()
    expect(screen.getByText('readOnlyFirst: true')).toBeInTheDocument()
    expect(screen.getByText('proposalFirst: true')).toBeInTheDocument()
    expect(screen.getByText('approvalRequired: true')).toBeInTheDocument()
    expect(screen.getAllByText('actionExecuted: false').length).toBeGreaterThan(0)
    expect(screen.getByText('filesystemWriteAccess: false')).toBeInTheDocument()
    expect(screen.getByText('filesystemDeleteAccess: false')).toBeInTheDocument()
    expect(screen.getByText('filesystemMoveAccess: false')).toBeInTheDocument()
    expect(screen.getByText('emailSendAccess: false')).toBeInTheDocument()
    expect(screen.getByText('backgroundAgents: false')).toBeInTheDocument()
  })
})
