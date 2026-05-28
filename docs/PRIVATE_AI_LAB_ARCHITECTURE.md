# Private AI Lab Architecture

This document describes the current Private AI Lab, GENIO, and Humanity Guide OS architecture in UNV-HMND.

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
  -> Humanity Guide OS
  -> /lab
  -> GENIO Central Governance Layer
  -> GÉNESIS reflection metadata
  -> Human-Centered Alignment Layer
  -> Approval / Sandbox / Capability / Adapter blueprints
  -> Proposal + audit metadata
```

GENIO is the central governance profile. It coordinates metadata, hierarchy, risk, approval, observability, future memory, future orchestration, and future adapters.

GENIO does not execute actions.

## 1.1 Humanity Guide OS Conceptual Ecosystem

Source:

```text
src/domain/ecosystem/HumanityGuideOSBlueprint.ts
docs/HUMANITY_GUIDE_OS_ARCHITECTURE.md
```

The official product direction is Humanity Guide OS: a human + AI organization system focused on clarity, organization, chaos reduction, conscious productivity, governance, and progressive evolution.

Layer responsibilities:

- Humanity Guide OS: product and UX layer.
- GENIO: operational governance, approval, permissions, stability, and policy enforcement.
- GÉNESIS: reflection layer, contextual mirror, and simulation-first scenario exploration.
- Human-Centered Alignment Layer: policy validator, ethics middleware, governance audit system, and contextual audit engine.

Boundaries:

- no AGI claims
- no real consciousness claims
- no spiritual authority claims
- no human scoring
- no human surveillance
- no manipulative emotional dependency
- no conceptual layer grants execution privileges

Current MVP UI experience:

- `/lab` includes an Organization Simulation Panel for the Humanity Guide OS Intelligent Organization MVP.
- The panel is polished for recruiter and partner review with a short hero, elevator pitch, and clear product framing.
- The demo communicates `Problem -> Analysis -> Proposal -> Human Approval` before showing deeper architecture details.
- A `Why this matters` section explains business value without AGI, consciousness, or real host-access claims.
- The experience includes a Guided Flow Timeline so a reviewer can understand the value in under two minutes.
- The panel uses mock-only file metadata to show chaos signals, duplicate candidates, mixed priorities, and visual overload.
- GENIO renders a governed organization strategy.
- GÉNESIS renders reflection observations as a contextual mirror, without user scoring or behavioral surveillance.
- The Human-Centered Alignment Layer renders checks for clarity, no overautomation, and safe limits.
- The interactive before/after toggle, clarity score visualization, impact metrics, estimated time saved, and checklist are proposal-only previews.
- GENIO Thinking State, GENESIS Reflection Feed, Alignment Status Indicator, Simulation Badge System, and the no-filesystem safety indicator are UI states only.
- The final CTA states `Simulation complete - no real action executed`.
- No filesystem access, host scanning, file movement, file deletion, upload, indexing, or runtime execution exists.

Controlled read-only organization preview:

- `/lab` now includes a browser-only read-only preview bridge.
- The owner manually selects a folder using the browser file picker.
- The app analyzes only metadata exposed by the browser `FileList`: filename, relative browser path, MIME type, size, and last modified timestamp.
- The preview detects screenshots, image groups, duplicate candidates, problematic names, and mixed categories.
- Results produce organization proposals only.
- No file contents are parsed, no files are uploaded, and no server filesystem API is used.
- Required safety metadata remains visible: `simulationOnly: false`, `executionMode: read-only-preview`, `actionExecuted: false`, `filesystemWriteAccess: false`, `filesystemDeleteAccess: false`, `filesystemMoveAccess: false`.
- Write, delete, move, rename, shell execution, host-wide scanning, and autonomous background actions remain unavailable.

Controlled email organization preview:

- `/lab` includes an email organization preview using a fully simulated inbox dataset.
- The panel shows Inbox Chaos Summary, GENIO Email Analysis Card, GENESIS Communication Pattern Reflection, Alignment Validation Card, Suggested Labels / Categories, Priority Inbox Proposal, and Draft Suggestions Preview.
- Categories include Work, Personal, Finance, Invoices, Urgent, Waiting Reply, Newsletters, Low Priority, and Review Needed.
- Draft suggestions are preview-only copy blocks. They do not send, reply, forward, archive, label, delete, or move emails.
- Required safety metadata remains visible: `simulationOnly: true`, `executionMode: email-preview-only`, `actionExecuted: false`, `emailSendAccess: false`, `emailDeleteAccess: false`, `emailMoveAccess: false`, `emailReplyAccess: false`, `emailDraftMode: preview-only`.
- No Gmail API, real mailbox connection, background automation, or external email integration exists.

Presentation and navigation readiness:

- `/` now works as a recruiter walkthrough hub for Humanity Guide OS.
- `/` includes Recruiter Quick Start and What this project demonstrates sections for short interviews and recordings.
- Top navigation connects `/`, `/demo`, `/lab`, and architecture surfaces.
- The home page includes mini onboarding, a visual architecture summary, and a current-vs-future capability split.
- The presentation explicitly separates real current behavior from future blueprints to avoid overstating capabilities.
- The showcase adds Project Highlights, Governance-first Architecture, Simulation-first Safety, Human-centered AI, Current MVP, Future Controlled Capabilities, Technical Stack, and Architecture Principles.
- Basic deployment polish includes app metadata, manifest, icon, sitemap coverage, focus states, and mobile presentation constraints.
- `docs/RECRUITER_DEMO_GUIDE.md` provides a compact public presentation script and explicit non-capabilities list.

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
- persistent audit and observability blueprint
- controlled practical capability blueprint
- controlled runtime sandbox blueprint
- read-only file preview adapter blueprint

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

## 6. Persistent Audit & Observability Blueprint

Source:

```text
src/domain/observability/ObservabilityBlueprint.ts
docs/OBSERVABILITY_BLUEPRINT.md
```

Current audit remains in memory only.

Prepared concepts:

- `AuditTrace`
- `EventLineage`
- `CorrelationChain`
- `GovernanceCheckpoint`
- `ExecutionLineage`
- `SystemObservation`
- `IncidentSignal`
- `MonitoringScope`
- `AuditRetentionPolicy`

Prepared correlation metadata:

- `correlationId`
- `traceId`
- `parentEventId`
- `orchestrationId`
- `proposalId`
- `sessionId`
- `governanceSource`
- `originatingAgent`
- `approvalChain`

Future audit persistence may include immutable logs, encrypted audit storage, retention, event replay, forensic analysis, and governance history.

Current boundaries:

- no persistent audit DB
- no OpenTelemetry runtime
- no Sentry, DataDog, Prometheus, Grafana, ElasticSearch, or cloud logging
- no realtime telemetry
- no workers, queues, or background processing
- no execution telemetry

Observability does not mean invasive surveillance. Future monitoring must remain privacy-aware, owner-controlled, purpose-limited, and governed by approval flow.

## 7. Controlled Practical Capability Blueprint

Source:

```text
src/domain/capabilities/CapabilityBlueprint.ts
docs/CAPABILITY_BLUEPRINT.md
```

GENIO is prepared to describe practical future capabilities, classify risk, and route capability requests through governance metadata.

Prepared concepts:

- `CapabilityProfile`
- `CapabilityCategory`
- `CapabilityRiskLevel`
- `CapabilityExecutionMode`
- `CapabilityBoundary`
- `CapabilityApprovalPolicy`
- `CapabilitySimulation`
- `CapabilityCheckpoint`
- `CapabilityIncidentRisk`

Prepared future categories include analysis, planning, drafting, documentation, simulation, filesystem read/write future, terminal read/execution future, browser future, finance simulation, organization, orchestration, monitoring, and company management.

Current boundaries:

- capability blueprint is not capability runtime
- no terminal execution
- no filesystem write
- no browser automation
- no external API execution
- no Gmail, trading, OS automation, self-modification, self-replication, or autonomous execution

The `problem-solver-agent` and `business-builder-blueprint` are metadata only. They can describe future strategy, roadmap, product, and solution-planning behavior, but they cannot execute real actions or replace regulated professionals.

## 8. Controlled Runtime Sandbox Blueprint

Source:

```text
src/domain/runtime/RuntimeSandboxBlueprint.ts
docs/RUNTIME_SANDBOX_BLUEPRINT.md
```

The runtime sandbox blueprint prepares a future isolated execution zone governed by GENIO.

Required hierarchy:

```text
Owner
  -> GENIO Central
  -> Governance Layer
  -> Runtime Sandbox
  -> Specialized Agents
  -> Controlled Capabilities
```

Forbidden path:

```text
Agent
  -> host machine directly
```

Prepared concepts:

- `RuntimeSandboxBlueprint`
- `SandboxProfile`
- `SandboxExecutionMode`
- `SandboxIsolationLevel`
- `SandboxPermissionScope`
- `SandboxLifecycleState`
- `SandboxEmergencyStop`
- `SandboxRollbackPolicy`
- `SandboxAuditChain`
- `SandboxCapabilityRoute`

Current sandbox state:

- `executionMode: no-runtime`
- `isolationLevel: simulation-only`
- `lifecycleState: blocked`
- `simulationOnly: true`
- `actionExecuted: false`

No real sandbox, terminal, filesystem, Docker, VM, workers, queues, browser automation, OS automation, autonomous loops, self-modification, self-replication, or unrestricted execution exists.

## 9. Read-Only File Preview Adapter Blueprint

Source:

```text
src/domain/file-preview/FilePreviewBlueprint.ts
docs/FILE_PREVIEW_ADAPTER_BLUEPRINT.md
```

The file preview blueprint prepares a future owner-approved, read-only preview adapter.

Prepared concepts:

- `FilePreviewBlueprint`
- `FilePreviewProfile`
- `FilePreviewType`
- `FilePreviewPermission`
- `FilePreviewRedactionPolicy`
- `FilePreviewAuditTrace`
- `FilePreviewLifecycle`

Current state:

- lifecycle: `blocked`
- visibility: `metadata-only`
- redaction: `metadata-only`
- `simulationOnly: true`
- `actionExecuted: false`

Current boundaries:

- preview-only
- read-only
- no-write
- no-delete
- no-execute
- no-shell
- no-host-direct-access
- approval-required
- audit-required
- size-limited
- type-limited

No real filesystem read, upload, watcher, indexing, embeddings, OCR, parsing, shell access, file execution, filesystem traversal, file browser UI, or direct host access exists.

## 10. Strategic Vision Metadata

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

## 11. Memory & Context Blueprint

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

## 12. Strategic Multi-Agent Orchestration Layer

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

## 13. Controlled Adapter Blueprint

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

## 14. Audit System

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

## 15. Current Non-Capabilities

The system currently does not include:

- terminal execution
- filesystem access
- Gmail integration
- database persistence
- real auth layer
- persistent audit
- real tracing
- external observability
- practical capability runtime
- autonomous execution
- runtime sandbox
- direct host access
- real file preview
- filesystem read
- file uploads
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

## 16. Evolution Timeline

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
14. Persistent Audit & Observability Blueprint
15. Controlled Practical Capability Blueprint
16. Controlled Runtime Sandbox Blueprint
17. Read-Only File Preview Adapter Blueprint
18. Humanity Guide OS Intelligent Organization MVP UI

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
- controlled practical capability runtime
- governed runtime sandbox
- read-only file preview adapter
- operational monitoring

## 17. Verification

Before closing a phase, run:

```bash
npm --prefix apps/web run build
npm --prefix apps/web run test
npm run build:api
npm test
```

## 18. Production Blueprint And Testing

Production-readiness planning lives in:

```text
docs/MASTER_PRODUCTION_ARCHITECTURE.md
docs/PRODUCTION_TESTING_GUIDE.md
docs/AUTH_BLUEPRINT.md
docs/OBSERVABILITY_BLUEPRINT.md
docs/CAPABILITY_BLUEPRINT.md
docs/RUNTIME_SANDBOX_BLUEPRINT.md
docs/FILE_PREVIEW_ADAPTER_BLUEPRINT.md
```

These documents define:

- production architecture target
- readiness matrix
- web validation guide
- future roadmap by phase
- World Access Layer concept
- local and Vercel testing evidence
