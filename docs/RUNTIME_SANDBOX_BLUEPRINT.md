# Controlled Runtime Sandbox Blueprint

This document defines the future controlled runtime sandbox architecture for GENIO.

This phase is metadata-only. It does not implement terminal execution, shell execution, `child_process`, filesystem access, Docker, VMs, workers, queues, browser automation, OS automation, autonomous loops, self-modification, self-replication, or unrestricted execution.

Core rules:

```text
Sandbox blueprint != runtime real
Proposal != Execution
```

## Required Hierarchy

Correct future hierarchy:

```text
Owner
  -> GENIO Central
  -> Governance Layer
  -> Runtime Sandbox
  -> Specialized Agents
  -> Controlled Capabilities
```

Forbidden architecture:

```text
Agent
  -> host machine directly
```

GENIO may govern a future runtime. GENIO must not execute directly or bypass approval.

## Prepared Types

- `RuntimeSandboxBlueprint`
- `SandboxProfile`
- `SandboxExecutionMode`
- `SandboxIsolationLevel`
- `SandboxPermissionScope`
- `SandboxRiskLevel`
- `SandboxLifecycleState`
- `SandboxBoundary`
- `SandboxEmergencyStop`
- `SandboxRollbackPolicy`
- `SandboxAuditChain`
- `SandboxCapabilityRoute`

## Lifecycle Metadata

Prepared lifecycle states:

- `planned`
- `requested`
- `awaiting-approval`
- `approved-for-simulation`
- `simulated`
- `blocked`
- `terminated`

Current state:

```text
blocked
```

## Isolation Model

Prepared levels:

- `no-runtime`
- `simulation-only`
- `read-only-sandbox`
- `ephemeral-sandbox`
- `restricted-runtime`
- `isolated-runtime-future`

Current isolation:

```text
simulation-only
```

All real runtime levels are future-only.

## Emergency Stop Blueprint

Prepared metadata:

- `ownerStopRequired`
- `emergencyStopAvailable`
- `killSwitchFuture`
- `maxRuntimeFuture`
- `rollbackRequired`
- `auditBeforeTermination`

No kill switch exists yet because no runtime exists yet.

## Rollback And Safety

Prepared future policies:

- `no-write`
- `reversible-only`
- `snapshot-before-action`
- `dry-run-first`
- `approval-before-commit`
- `terminate-on-risk`

These are metadata-only policies until a future sandbox runtime is explicitly approved.

## Capability Routing

The sandbox blueprint is conceptually connected to:

- Controlled Practical Capability Blueprint
- Read-Only File Preview Adapter Blueprint
- Controlled Adapter Blueprint
- Persistent Audit & Observability Blueprint
- Owner Approval Flow
- Real Owner Auth Blueprint

Prepared route metadata includes:

- requesting capability
- future adapter
- approval status
- audit trace
- isolation level
- blocked permissions

The file preview adapter is the first future read-only adapter track that would route through this sandbox model. It remains blocked and metadata-only until real auth, persistent audit, scoped owner approval, redaction policy, and sandbox isolation are implemented.

## Non-Capabilities

The current system does not include:

- real sandbox runtime
- host machine access
- terminal execution
- shell execution
- filesystem access
- Docker or VM runtime
- workers or queues
- browser automation
- OS automation
- autonomous loops
- self-modifying behavior
- self-replication
- unrestricted execution

Owner remains maximum authority.
