# Read-Only File Preview Adapter Blueprint

This document defines the future read-only file preview adapter architecture for GENIO.

This phase is metadata-only. It does not implement real filesystem access, uploads, watchers, indexing, embeddings, OCR, parsing, shell access, file execution, filesystem traversal, direct host access, writes, deletes, or modifications.

Core rules:

```text
Read-only preview blueprint != filesystem access real
Proposal != Execution
```

## Prepared Types

- `FilePreviewBlueprint`
- `FilePreviewProfile`
- `FilePreviewType`
- `FilePreviewPermission`
- `FilePreviewRiskLevel`
- `FilePreviewBoundary`
- `FilePreviewConstraint`
- `FilePreviewAuditTrace`
- `FilePreviewRedactionPolicy`
- `FilePreviewVisibility`
- `FilePreviewLifecycle`

## Supported Future Preview Types

Future-only preview types:

- `text`
- `markdown`
- `json`
- `yaml`
- `log`
- `code`
- `pdf-preview-future`
- `image-preview-future`
- `spreadsheet-preview-future`

No parser, renderer, OCR, spreadsheet reader, PDF reader, image reader, or code analyzer exists in this phase.

## Mandatory Boundaries

- `preview-only`
- `read-only`
- `no-write`
- `no-delete`
- `no-execute`
- `no-shell`
- `no-host-direct-access`
- `approval-required`
- `audit-required`
- `size-limited`
- `type-limited`

## Redaction Blueprint

Prepared future redaction modes:

- secret masking
- token masking
- env redaction
- key detection
- PII redaction
- unsafe content blocking

Detection is not implemented yet.

## File Preview Lifecycle

Prepared lifecycle:

- `requested`
- `awaiting-approval`
- `approved-for-preview`
- `simulated-preview`
- `blocked`
- `expired`

Current lifecycle:

```text
blocked
```

## Governance

GENIO may describe:

- which conceptual file would be previewed
- risk level
- required approval
- redaction policy
- audit trace
- sandbox route
- boundaries

GENIO does not access the host directly and does not read files in this phase.

## Runtime Integration

The blueprint is conceptually connected to:

- Controlled Runtime Sandbox Blueprint
- Controlled Practical Capability Blueprint
- Persistent Audit & Observability Blueprint
- Owner Approval Flow
- Real Owner Auth Blueprint

Future previews must be:

- sandbox-aware
- audit-aware
- approval-aware
- owner-controlled
- redaction-aware
- size-limited
- type-limited

## Non-Capabilities

The current system does not include:

- real filesystem read
- filesystem write
- uploads
- watchers
- indexing
- embeddings
- OCR
- parsing
- shell access
- file execution
- filesystem traversal
- direct host access
- file browser UI

Owner remains maximum authority.
