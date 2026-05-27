# Private AI Lab Architecture

This document describes the current Private AI Lab and GENIO architecture in UNV-HMND.

The system is intentionally conservative. It prepares an AI Operating System blueprint without granting real execution powers.

Core principles:

- Proposal != Execution
- Approve != Execute
- audit-first
- approval-required
- human-controlled
- reversible architecture
- progressive safety
- no dangerous autonomy

## 1. Architecture Overview

```text
Owner
  -> /lab
  -> GENIO Central Governance Layer
  -> Real Owner Auth Blueprint metadata
  -> AgentRegistry / ToolRegistry
  -> ApprovalGate
  -> LocalToolExecutor
  -> InMemoryAuditLog
  -> Proposal + approval metadata
```

GENIO is the central governance profile. It coordinates metadata, hierarchy, risk, approval, observability, future memory, future orchestration, and future adapters.

GENIO does not execute actions.

## 2. GENIO Central Governance Layer

Source:

```text
src/domain/governance/GenioCentralProfile.ts
src/domain/governance/GovernanceProfile.ts
```

GENIO contains:

- central identity
- governance level
- approval authority
- orchestration priority
- risk awareness
- system goals
- safety boundaries
- strategic vision
- memory context blueprint
- orchestration blueprint
- controlled adapter blueprint
- real owner auth blueprint

GENIO is not a regular worker agent. It is the governance layer above the agent hierarchy.

## 3. Agent Hierarchy

Hierarchy levels:

- `central`: GENIO
- `supervisor`: high-level coordination agents
- `specialist`: implementation/review/debug roles
- `utility`: learning and support roles
- `observer`: future observability role

Current private agents:

- `architect-agent`
- `coder-agent`
- `reviewer-agent`
- `debugger-agent`
- `tutor-agent`
- `operator-agent`

Each agent can expose:

- hierarchy level
- parent authority
- escalation rules
- approval requirements
- allowed tools

## 4. Owner Approval Flow Minimal

Source:

```text
src/domain/security/OwnerApproval.ts
```

States:

- `pending`
- `approved`
- `rejected`
- `blocked`

Approval state includes:

- `proposalId`
- `correlationId`
- `sessionId`
- `reviewedBy`
- `reviewTimestamp`
- `rejectionReason`
- `simulationOnly: true`
- `actionExecuted: false`

Approving a proposal does not execute it. It only records decision metadata.

## 5. Real Owner Auth Blueprint

Source:

```text
src/domain/auth/AuthBlueprint.ts
docs/AUTH_BLUEPRINT.md
```

Current `/lab` protection uses `OWNER_ACCESS_CODE`.

This is a temporary server-side gate, not real authentication.

Current boundaries:

- no login runtime
- no user database
- no persistent sessions
- no cookies/JWT/OAuth provider
- no role-based access runtime
- no per-user audit attribution
- no revocation system
- no `NEXT_PUBLIC_OWNER_ACCESS_CODE`

Prepared future roles:

- `owner`
- `admin`
- `operator`
- `guest`

Prepared future protected surfaces:

- `/lab`
- future `/admin`
- future `/company`
- future adapters
- future audit dashboard
- future memory dashboard

Prepared permissions include proposal requests, approval/rejection, audit views, agent/tool management, company management, adapter configuration, and `execute_controlled_action_future`.

`execute_controlled_action_future` is future-only, critical risk, approval-required, and not implemented.

## 6. Strategic Vision Metadata

GENIO includes strategic vision metadata inspired by the concept of a calm, wise, analytical guide. This is narrative and philosophical metadata only.

Future conceptual capabilities:

- predictive simulation
- probabilistic reasoning
- opportunity analysis
- behavioral pattern analysis
- strategic planning
- life-map intelligence
- financial scenario modeling

Boundaries:

- no omniscience
- no guaranteed outcomes
- no magic or supernatural claims
- no control over users
- no absolute predictions

All future predictions must be framed as probabilistic scenarios with assumptions and uncertainty.

## 7. Memory & Context Blueprint

Source:

```text
src/domain/context/ContextBlueprint.ts
```

Prepared context categories:

- `technical`
- `personal`
- `strategic`
- `project`
- `learning`
- `financial`
- `journal`
- `life-map`
- `company`
- `operational`

Prepared retention policies:

- `short-term`
- `mid-term`
- `long-term`
- `archived`

Prepared structures:

- `ContextProfile`
- `MemoryFragment`
- `ContextWindow`
- `LifeObjective`
- `LifeRoadmap`
- `Milestone`
- `JournalEntry`
- `Reflection`
- `DailySummary`

Current limitation:

No real memory is stored. There is no database, vector store, embeddings, semantic search, browser persistence, filesystem storage, or remote sync.

## 8. Strategic Multi-Agent Orchestration Layer

Source:

```text
src/domain/orchestration/OrchestrationBlueprint.ts
```

Prepared structures:

- `OrchestrationFlow`
- `AgentTask`
- `TaskAssignment`
- `CoordinationPlan`
- `PipelineStep`
- `DelegationRule`

Conceptual pipeline:

```text
GENIO
  -> planner
  -> specialist
  -> reviewer
  -> validator
  -> final proposal
```

This is a simulation blueprint. It does not create workers, queues, jobs, threads, workflows, or autonomous agents.

## 9. Controlled Adapter Blueprint

Source:

```text
src/domain/adapters/AdapterBlueprint.ts
```

Future adapters:

- `terminal-adapter`
- `filesystem-adapter`
- `file-preview-adapter`
- `email-draft-adapter`
- `finance-simulation-adapter`
- `local-computer-adapter`
- `document-organization-adapter`

Each adapter declares:

- category
- capabilities
- risk level
- permission scope
- execution mode
- approval requirement
- safety boundaries
- forbidden actions

All adapters are metadata-only. There is no real adapter runtime.

## 10. Audit System

Source:

```text
src/domain/audit/AuditEvent.ts
src/infrastructure/audit/InMemoryAuditLog.ts
```

Audit behavior:

- in-memory only
- latest 100 events
- basic redaction
- no DB
- no disk persistence
- no localStorage

Event families:

- tool events
- approval events
- context events
- orchestration events
- adapter events

All current audit events represent proposals, simulations, classification, or metadata. They do not represent real-world execution.

## 11. Current Non-Capabilities

The system currently does not include:

- terminal execution
- filesystem access
- Gmail integration
- database persistence
- real auth layer
- vector memory
- embeddings
- semantic search
- autonomous agents
- background jobs
- queues/workers
- real workflows
- browser automation
- OS automation
- finance integrations
- trading
- banking
- SaaS tenant isolation

## 12. Evolution Timeline

Completed phases:

1. Portfolio frontend and public demo
2. Multi-agent demo flow
3. Private AI Lab core
4. Dynamic agent/tool catalog
5. GENIO Central Governance Layer
6. Owner Approval Flow Minimal
7. Strategic Vision Metadata
8. Memory & Context Blueprint
9. Strategic Multi-Agent Orchestration Layer
10. Controlled Adapter Blueprint
11. Documentation sync
12. Master Production Architecture Blueprint
13. Real Owner Auth Blueprint

Future roadmap:

- real owner authentication runtime
- persistent audit storage
- explicit approval records
- scoped read-only adapters
- memory storage with owner consent
- semantic retrieval with privacy controls
- company agents
- SaaS tenant boundaries
- reversible execution adapters
- operational monitoring

## 13. Verification

Before closing a phase, run:

```bash
npm --prefix apps/web run build
npm --prefix apps/web run test
npm run build:api
npm test
```

## 14. Production Blueprint And Testing

Production-readiness planning lives in:

```text
docs/MASTER_PRODUCTION_ARCHITECTURE.md
docs/PRODUCTION_TESTING_GUIDE.md
docs/AUTH_BLUEPRINT.md
```

These documents define:

- production architecture target
- readiness matrix
- web validation guide
- future roadmap by phase
- World Access Layer concept
- local and Vercel testing evidence
