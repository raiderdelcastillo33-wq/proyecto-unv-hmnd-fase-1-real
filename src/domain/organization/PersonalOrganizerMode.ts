export type PersonalOrganizerModePolicy = {
  ownerControlled: true
  readOnlyFirst: true
  proposalFirst: true
  approvalRequired: true
  auditable: true
  reversible: true
  actionExecuted: false
  filesystemWriteAccess: false
  filesystemDeleteAccess: false
  filesystemMoveAccess: false
  emailSendAccess: false
  emailDeleteAccess: false
  emailMoveAccess: false
  backgroundAgents: false
}

export const PERSONAL_ORGANIZER_MODE_POLICY: PersonalOrganizerModePolicy = {
  ownerControlled: true,
  readOnlyFirst: true,
  proposalFirst: true,
  approvalRequired: true,
  auditable: true,
  reversible: true,
  actionExecuted: false,
  filesystemWriteAccess: false,
  filesystemDeleteAccess: false,
  filesystemMoveAccess: false,
  emailSendAccess: false,
  emailDeleteAccess: false,
  emailMoveAccess: false,
  backgroundAgents: false
}
