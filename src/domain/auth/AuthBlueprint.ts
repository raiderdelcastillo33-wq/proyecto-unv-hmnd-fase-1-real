export type UserRole = 'owner' | 'admin' | 'operator' | 'guest'

export type PermissionScope =
  | 'view_lab'
  | 'use_demo'
  | 'request_tool_proposal'
  | 'approve_proposal'
  | 'reject_proposal'
  | 'view_audit'
  | 'manage_agents'
  | 'manage_tools'
  | 'manage_users'
  | 'manage_company'
  | 'configure_adapters'
  | 'execute_controlled_action_future'

export type ProtectedSurface =
  | '/lab'
  | 'future /admin'
  | 'future /company'
  | 'future adapters'
  | 'future audit dashboard'
  | 'future memory dashboard'

export type AuthRiskLevel = 'low' | 'medium' | 'high' | 'critical'

export type CurrentAuthMode = 'owner-access-code'

export interface IdentityBlueprint {
  role: UserRole
  label: string
  description: string
  futureOnly: boolean
  currentRuntimeAccess: boolean
}

export type OwnerIdentity = IdentityBlueprint & {
  role: 'owner'
  currentRuntimeAccess: true
}

export type AdminIdentity = IdentityBlueprint & {
  role: 'admin'
  currentRuntimeAccess: false
}

export type OperatorIdentity = IdentityBlueprint & {
  role: 'operator'
  currentRuntimeAccess: false
}

export type GuestIdentity = IdentityBlueprint & {
  role: 'guest'
  currentRuntimeAccess: false
}

export interface AccessPolicy {
  id: PermissionScope
  label: string
  roles: UserRole[]
  riskLevel: AuthRiskLevel
  approvalRequired: boolean
  implemented: boolean
  futureOnly: boolean
  safetyBoundary: string
}

export interface SessionPolicy {
  status: 'not-implemented'
  futureRequirements: string[]
  currentLimitations: string[]
  simulationOnly: true
}

export interface AuthBlueprint {
  id: 'real-owner-auth-blueprint'
  label: 'Real Owner Auth Blueprint'
  status: 'metadata-only'
  currentAuthMode: CurrentAuthMode
  realAuthImplemented: false
  authBlueprintReady: true
  supportedFutureRoles: UserRole[]
  identities: {
    owner: OwnerIdentity
    admin: AdminIdentity
    operator: OperatorIdentity
    guest: GuestIdentity
  }
  protectedSurfaces: ProtectedSurface[]
  accessPolicies: AccessPolicy[]
  sessionPolicy: SessionPolicy
  roadmap: string[]
  productionSecurityRisks: string[]
  futureSecurityRequirements: string[]
  ownerAccessCodeBoundary: string
  simulationOnly: true
  actionExecuted: false
}

export const REAL_OWNER_AUTH_BLUEPRINT: AuthBlueprint = {
  id: 'real-owner-auth-blueprint',
  label: 'Real Owner Auth Blueprint',
  status: 'metadata-only',
  currentAuthMode: 'owner-access-code',
  realAuthImplemented: false,
  authBlueprintReady: true,
  supportedFutureRoles: ['owner', 'admin', 'operator', 'guest'],
  identities: {
    owner: {
      role: 'owner',
      label: 'Owner',
      description: 'Future primary human authority with final approval control.',
      futureOnly: false,
      currentRuntimeAccess: true
    },
    admin: {
      role: 'admin',
      label: 'Admin',
      description: 'Future administrative role for users, policies, and dashboards.',
      futureOnly: true,
      currentRuntimeAccess: false
    },
    operator: {
      role: 'operator',
      label: 'Operator',
      description: 'Future delegated role for proposal workflows under owner policy.',
      futureOnly: true,
      currentRuntimeAccess: false
    },
    guest: {
      role: 'guest',
      label: 'Guest',
      description: 'Future read-limited role for public or invited access surfaces.',
      futureOnly: true,
      currentRuntimeAccess: false
    }
  },
  protectedSurfaces: [
    '/lab',
    'future /admin',
    'future /company',
    'future adapters',
    'future audit dashboard',
    'future memory dashboard'
  ],
  accessPolicies: [
    {
      id: 'view_lab',
      label: 'View Private Lab',
      roles: ['owner', 'admin'],
      riskLevel: 'high',
      approvalRequired: false,
      implemented: false,
      futureOnly: true,
      safetyBoundary: 'Current /lab access uses OWNER_ACCESS_CODE only; real identity is not implemented.'
    },
    {
      id: 'use_demo',
      label: 'Use Public Demo',
      roles: ['owner', 'admin', 'operator', 'guest'],
      riskLevel: 'low',
      approvalRequired: false,
      implemented: true,
      futureOnly: false,
      safetyBoundary: 'Public demo remains safe fallback and does not execute real actions.'
    },
    {
      id: 'request_tool_proposal',
      label: 'Request Tool Proposal',
      roles: ['owner', 'admin', 'operator'],
      riskLevel: 'medium',
      approvalRequired: false,
      implemented: false,
      futureOnly: true,
      safetyBoundary: 'Future authenticated users may request proposals, not execution.'
    },
    {
      id: 'approve_proposal',
      label: 'Approve Proposal',
      roles: ['owner'],
      riskLevel: 'high',
      approvalRequired: true,
      implemented: false,
      futureOnly: true,
      safetyBoundary: 'Future approval records must bind to a verified owner identity.'
    },
    {
      id: 'reject_proposal',
      label: 'Reject Proposal',
      roles: ['owner'],
      riskLevel: 'medium',
      approvalRequired: false,
      implemented: false,
      futureOnly: true,
      safetyBoundary: 'Future rejection records must bind to a verified owner identity.'
    },
    {
      id: 'view_audit',
      label: 'View Audit',
      roles: ['owner', 'admin'],
      riskLevel: 'high',
      approvalRequired: false,
      implemented: false,
      futureOnly: true,
      safetyBoundary: 'Future audit views require authenticated identity and least privilege.'
    },
    {
      id: 'manage_agents',
      label: 'Manage Agents',
      roles: ['owner', 'admin'],
      riskLevel: 'high',
      approvalRequired: true,
      implemented: false,
      futureOnly: true,
      safetyBoundary: 'Future agent changes require audit and owner-governed policy.'
    },
    {
      id: 'manage_tools',
      label: 'Manage Tools',
      roles: ['owner', 'admin'],
      riskLevel: 'high',
      approvalRequired: true,
      implemented: false,
      futureOnly: true,
      safetyBoundary: 'Future tool changes require audit and explicit permission scopes.'
    },
    {
      id: 'manage_users',
      label: 'Manage Users',
      roles: ['owner'],
      riskLevel: 'critical',
      approvalRequired: true,
      implemented: false,
      futureOnly: true,
      safetyBoundary: 'No user management exists until real auth, sessions, and storage are implemented.'
    },
    {
      id: 'manage_company',
      label: 'Manage Company',
      roles: ['owner', 'admin'],
      riskLevel: 'critical',
      approvalRequired: true,
      implemented: false,
      futureOnly: true,
      safetyBoundary: 'No company or multi-tenant runtime exists in this phase.'
    },
    {
      id: 'configure_adapters',
      label: 'Configure Adapters',
      roles: ['owner'],
      riskLevel: 'critical',
      approvalRequired: true,
      implemented: false,
      futureOnly: true,
      safetyBoundary: 'Adapter configuration remains blueprint-only and cannot enable runtime execution.'
    },
    {
      id: 'execute_controlled_action_future',
      label: 'Execute Controlled Action Future',
      roles: ['owner'],
      riskLevel: 'critical',
      approvalRequired: true,
      implemented: false,
      futureOnly: true,
      safetyBoundary:
        'Future-only high-risk permission. Not implemented. Requires real auth, persistent audit, least privilege, and owner approval.'
    }
  ],
  sessionPolicy: {
    status: 'not-implemented',
    futureRequirements: [
      'server-side authentication',
      'secure httpOnly cookies',
      'session expiration',
      'CSRF/session hardening',
      'revocation support',
      'audit linked to userId'
    ],
    currentLimitations: [
      'OWNER_ACCESS_CODE is a temporary shared gate.',
      'No persistent sessions exist.',
      'No user identity is attributed to audit events.',
      'No per-user revocation exists.'
    ],
    simulationOnly: true
  },
  roadmap: [
    'Phase 1: OWNER_ACCESS_CODE temporary gate',
    'Phase 2: Real Owner Auth',
    'Phase 3: Persistent Sessions',
    'Phase 4: Role-Based Access Control',
    'Phase 5: Persistent Audit per User',
    'Phase 6: Admin Dashboard',
    'Phase 7: Company/Multi-tenant Access',
    'Phase 8: Controlled Execution Permissions'
  ],
  productionSecurityRisks: [
    'secret exposure',
    'client-side auth assumptions',
    'missing persistent sessions',
    'shared access code',
    'no identity attribution',
    'no per-user audit',
    'no revocation system'
  ],
  futureSecurityRequirements: [
    'server-side auth',
    'secure cookies',
    'session expiration',
    'user identity',
    'role-based permissions',
    'audit linked to userId',
    'revocation',
    'least privilege'
  ],
  ownerAccessCodeBoundary:
    'OWNER_ACCESS_CODE is a temporary server-side gate for the private lab. It is not real authentication and must never be exposed as NEXT_PUBLIC_OWNER_ACCESS_CODE.',
  simulationOnly: true,
  actionExecuted: false
}
