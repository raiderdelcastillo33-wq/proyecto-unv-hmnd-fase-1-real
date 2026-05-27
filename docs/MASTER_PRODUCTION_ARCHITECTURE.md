# Master Production Architecture Blueprint

This blueprint defines how UNV-HMND / Humanidad_Universo should evolve from the current Private AI Lab into a professional, production-oriented AI Operating System platform.

This document is architectural. It does not introduce real execution, authentication, database storage, adapters, workers, or SaaS runtime behavior.

Core rules:

- Proposal != Execution
- Approve != Execute
- Blueprint != Runtime
- Human owner remains final authority
- Every future dangerous capability must be approval-required, audit-first, permission-scoped, and reversible when possible

## 1. What Exists Today

Current implemented surfaces:

- `/`: public portfolio surface
- `/demo`: public multi-agent demo with safe fallback
- `/lab`: owner-gated private lab using `OWNER_ACCESS_CODE`
- `/api/v1/run`: demo-safe proxy/fallback route
- `/api/lab/catalog`: private safe catalog route
- `/api/lab/tool`: private proposal-only tool route

Current implemented architecture:

- GENIO Central Governance Layer
- Owner Approval Flow Minimal
- GENIO Strategic Vision Metadata
- GENIO Memory & Context Blueprint
- Strategic Multi-Agent Orchestration Layer
- Controlled Adapter Blueprint
- Real Owner Auth Blueprint
- AgentRegistry
- ToolRegistry
- ApprovalGate / ApprovalPolicy
- InMemoryAuditLog
- Proposal lifecycle metadata

Current guarantees:

- `simulationOnly: true`
- `actionExecuted: false`
- no real adapters
- no real execution
- no persistent memory
- no autonomous agents
- no real authentication runtime

## 2. What Does Not Exist Yet

The current system does not include:

- real owner authentication runtime
- database or durable storage
- persistent audit log
- vector memory or embeddings
- semantic search
- real terminal execution
- real filesystem access
- Gmail or email integration
- banking, trading, or real finance integrations
- browser automation
- OS or local computer control
- background jobs
- workers or queues
- real orchestration runtime
- SaaS tenant management
- company agents runtime
- production monitoring
- rate limiting
- secrets management layer beyond environment variables

## 3. Target Production Architecture

Target layers:

```text
Public Web
  -> Portfolio
  -> Public Demo

Private Web
  -> Owner Auth
  -> Private Lab
  -> Admin Dashboard

GENIO Core
  -> Governance
  -> Approval
  -> Risk
  -> Context
  -> Orchestration
  -> Audit

Controlled Platform Services
  -> Persistent Audit
  -> Secure Storage
  -> Secure Memory
  -> User Management
  -> Role / Permission System

World Access Layer
  -> Read-only adapters
  -> Draft adapters
  -> Simulation adapters
  -> Future execution adapters
```

## 4. GENIO Master Role

GENIO should act as:

- central brain
- agent coordinator
- context controller
- risk supervisor
- plan generator
- production organizer
- logical authority before agents/tools/adapters
- governance layer for future workflows

GENIO must never act as:

- irreversible executor without human approval
- bypass around owner approval
- autonomous production operator
- secret reader
- hidden background worker
- unbounded decision engine

## 5. Real Owner Auth Blueprint

The current `/lab` surface uses `OWNER_ACCESS_CODE` as a temporary server-side gate.

This is not production authentication.

The auth blueprint prepares:

- future roles: `owner`, `admin`, `operator`, `guest`
- future protected surfaces: `/lab`, `/admin`, `/company`, adapters, audit dashboard, memory dashboard
- future permissions such as `view_lab`, `approve_proposal`, `view_audit`, `manage_users`, and `configure_adapters`
- future session requirements: secure cookies, expiration, revocation, identity-bound audit

`execute_controlled_action_future` is documented as future-only, critical risk, approval-required, and not implemented.

Detailed auth blueprint:

```text
docs/AUTH_BLUEPRINT.md
src/domain/auth/AuthBlueprint.ts
```

## 6. Production Readiness Matrix

| Module | Current Status | Production Requirement | Risk Level | Next Step | Verification Method |
| --- | --- | --- | --- | --- | --- |
| `/demo` | Implemented public demo | Keep stable fallback, validate UX and errors | Medium | Add production smoke checklist | Build, web tests, browser manual test |
| `/lab` | Owner-code protected private lab | Replace code gate with real auth and session security | High | Real Owner Auth runtime | Build, web tests, manual auth review |
| GENIO governance | Metadata and catalog implemented | Persisted governance records and policy review | Medium | Governance policy hardening | Unit tests, catalog review |
| Approval flow | Local approve/reject metadata | Durable approval records with actor identity | High | Persistent Audit Log | Domain tests, audit trail review |
| Audit log | In-memory redacted log | Persistent append-only audit storage | High | Database-backed audit log | Unit/integration tests |
| Memory blueprint | Typed metadata only | Secure owner-controlled storage and retrieval | High | Secure Storage / DB | Storage tests, privacy review |
| Orchestration blueprint | Simulation-only pipeline metadata | Runtime scheduler only after auth/audit/storage | Critical | Keep simulation until prerequisites complete | Domain tests, architecture review |
| Adapter blueprint | Metadata-only future adapters | Permission-scoped adapters with explicit approval | Critical | Start read-only file preview adapter | Adapter safety tests |
| Auth | OWNER_ACCESS_CODE temporary gate plus auth blueprint | Owner auth, sessions, CSRF/session hardening | Critical | Real Owner Auth runtime | Auth tests, security review |
| DB/storage | Not implemented | Durable encrypted data store and migrations | High | Secure Storage / DB | Migration tests, backup plan |
| User management | Not implemented | Users, roles, owner/admin boundaries | High | Role/Permission system | RBAC tests |
| Admin dashboard | Not implemented | Owner admin for audit, policies, users | Medium | Admin Dashboard | E2E/manual checks |
| Deployment | Frontend Vercel-ready | Environment validation, preview/prod gates | Medium | Production deploy checklist | Vercel deploy, route smoke tests |
| Testing | Jest/domain tests present | Add E2E smoke tests and production checklist | Medium | Production Testing Guide | CI + manual evidence |
| Monitoring | Not implemented | Logs, error tracking, health checks, alerts | Medium | Observability plan | Health endpoint, alert tests |
| Security | Progressive boundaries documented | Threat model, auth, secrets, rate limits | Critical | Security hardening phase | Security checklist, review |

## 7. Web Testing And Production Validation

Local URLs:

```text
http://localhost:3001
http://localhost:3001/demo
http://localhost:3001/lab
```

Production/Vercel:

```text
https://your-vercel-domain.example
https://your-vercel-domain.example/demo
https://your-vercel-domain.example/lab
```

Validate `/demo`:

- page loads without runtime errors
- agent selector is visible
- message validation works
- `/api/v1/run` responds
- fallback response is safe when backend is not configured
- local conversation history appears
- typing simulation renders
- no critical console errors

Validate `/lab`:

- locked screen appears before owner code
- `OWNER_ACCESS_CODE` is treated as temporary, not real auth
- wrong or missing code is rejected
- correct `OWNER_ACCESS_CODE` unlocks catalog
- GENIO Central is visible
- agent/tool catalog is visible
- approval metadata is visible
- audit events are visible
- memory blueprint is visible
- orchestration blueprint is visible
- adapter blueprint is visible
- auth blueprint is visible
- approve/reject buttons update metadata only
- no real execution happens

Browser DevTools:

- Console: no critical runtime errors
- Network:
  - `/api/v1/run`
  - `/api/lab/catalog`
  - `/api/lab/tool`
- Response payloads should not expose secrets or `systemInstructions`

## 8. Production Verification Checklist

Run before closing a production-readiness phase:

```bash
npm --prefix apps/web run build
npm --prefix apps/web run test
npm run build:api
npm test
git status --short
git log --oneline -5
```

Manual checklist:

- Vercel deploy OK
- `/` OK
- `/demo` OK
- `/lab` OK
- Console OK
- Network OK
- no secrets exposed
- no `NEXT_PUBLIC_OWNER_ACCESS_CODE`
- `OWNER_ACCESS_CODE` only exists server-side
- no real execution adapters
- no `systemInstructions` in public responses
- no terminal/filesystem/Gmail/finance execution

## 9. Future Roadmap By Phases

### Phase 1: Production Architecture Blueprint

- Objective: document target architecture, readiness matrix, testing, and roadmap
- Risk: low
- Prerequisites: current docs and blueprints
- Verification: docs review, build/test matrix

### Phase 2: Real Owner Auth

- Objective: replace `OWNER_ACCESS_CODE` with secure owner authentication runtime
- Risk: critical
- Prerequisites: session strategy, secret management, CSRF/session review
- Verification: auth tests, route protection checks, no public secret exposure

### Phase 3: Persistent Audit Log

- Objective: store append-only audit events durably
- Risk: high
- Prerequisites: DB/storage decision, migration plan, redaction policy
- Verification: audit write/read tests, redaction tests, failure tests

### Phase 4: Secure Storage / DB

- Objective: add durable storage for approved metadata, users, and audit
- Risk: high
- Prerequisites: schema design, backups, migration workflow
- Verification: migration tests, data isolation tests

### Phase 5: Read-only File Preview Adapter

- Objective: first scoped adapter for owner-selected file previews
- Risk: high
- Prerequisites: auth, audit, permission scopes, file selection boundary
- Verification: adapter tests, forbidden path tests, audit checks

### Phase 6: Controlled Draft Adapters

- Objective: draft-only email/document flows without sending or writing
- Risk: high
- Prerequisites: approval records, audit, content review UI
- Verification: draft tests, no-send checks

### Phase 7: Memory Retrieval System

- Objective: owner-controlled memory retrieval with clear retention rules
- Risk: high
- Prerequisites: secure storage, privacy policy, deletion/export flows
- Verification: retrieval tests, deletion tests, privacy review

### Phase 8: Company Agents

- Objective: company-scoped agents and workflows
- Risk: critical
- Prerequisites: users, roles, tenant boundaries, audit
- Verification: tenant isolation tests, RBAC tests

### Phase 9: SaaS Admin Dashboard

- Objective: production admin UI for users, audit, policies, and billing-readiness
- Risk: high
- Prerequisites: auth, DB, roles, monitoring
- Verification: E2E checks, admin permission tests

### Phase 10: Controlled Execution Layer

- Objective: introduce reversible, approval-gated execution adapters
- Risk: critical
- Prerequisites: all previous phases, threat model, rollback strategy, monitoring
- Verification: sandbox tests, approval tests, audit tests, rollback drills

## 10. World Access Layer

World Access Layer is the future controlled connection between GENIO and external tools.

Future connectors/adapters may include:

- filesystem
- terminal
- documents
- email drafts
- calendar
- browser
- finance simulation
- local computer
- cloud APIs
- company workflows

Current status:

- concept only
- no real adapter runtime
- no external service connection
- no execution

Required future properties:

- approval-required
- audit-first
- permission-scoped
- reversible when possible
- owner-controlled
- never bypass owner approval

## 11. Release Criteria For Future Production Phases

A future phase is production-ready only when:

- tests pass
- build passes
- security boundaries are documented
- manual browser validation is complete
- audit behavior is verified
- secrets are not exposed
- rollback path exists
- owner approval path is clear
- no capability is overstated
