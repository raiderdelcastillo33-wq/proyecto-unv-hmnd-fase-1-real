# API And AI Flow

This document describes the current API, AI, and Private AI Lab flows in UNV-HMND.

The system has two separated surfaces:

- public demo: safe conversational showcase
- private lab: owner-gated proposal, governance, approval, and blueprint surface

Core rule:

```text
Proposal != execution
```

## 1. Public Demo Flow

Route:

```text
apps/web/app/demo/page.tsx
apps/web/app/api/v1/run/route.ts
```

Flow:

```text
Browser /demo
  -> POST /api/v1/run
  -> Next.js route handler
  -> backend proxy helper
  -> Node API when UNV_API_BASE_URL is configured
  -> safe demo fallback when no external backend is configured
  -> UI renders local conversation state
```

Request:

```json
{
  "input": "Help me plan a TypeScript project",
  "agentId": "tutor-agent",
  "context": "User: previous message\nAssistant: previous response"
}
```

Validation:

- body must be valid JSON
- `input` must be a string with at least 5 characters
- `agentId` is optional
- unknown agent IDs fall back safely
- `context` is optional
- `context` is capped at 2,000 characters

The demo UI keeps:

- local in-memory history
- maximum 12 local messages
- short session memory from the last 6 messages
- frontend typing simulation
- safe Vercel fallback

The demo does not include auth, DB, persistent memory, localStorage persistence, real streaming, filesystem, terminal, or external execution.

## 2. Backend AI Flow

Backend entry:

```text
src/api/server.ts
src/interfaces/http/routing/ApiV1Router.ts
src/interfaces/http/controllers/AIController.ts
```

Use case and provider:

```text
src/application/use-cases/AskAIAssistantUseCase.ts
src/domain/services/AIProvider.ts
src/infrastructure/ai/OpenAIProvider.ts
src/infrastructure/ai/MockAIProvider.ts
src/infrastructure/ai/FallbackAIProvider.ts
```

Flow:

```text
Node API
  -> ApiV1Router
  -> AIController
  -> AskAIAssistantUseCase
  -> AIProvider.generate()
  -> AIInteractionRepository
  -> ApiResponse
```

Provider behavior:

- without `OPENAI_API_KEY`: `MockAIProvider`
- with `OPENAI_API_KEY`: `FallbackAIProvider(OpenAIProvider, MockAIProvider)`
- if OpenAI fails: fallback keeps the demo stable

Supported backend features:

- `assistant`
- `prompt-improver`
- `code-feedback`

## 3. Next.js AI Route

Route:

```text
apps/web/app/api/ai/run/route.ts
apps/web/services/ai.ts
```

Supported tasks:

- `summary`
- `translation`
- `ideas`

This path calls OpenAI from the Next.js server layer when configured. It is separate from the private lab and does not grant tool execution.

## 4. Agent Registry

Registry:

```text
src/domain/agents/AgentRegistry.ts
src/domain/agents/AgentProfile.ts
```

Private agents:

- `architect-agent`
- `coder-agent`
- `reviewer-agent`
- `debugger-agent`
- `tutor-agent`
- `operator-agent`

Compatibility agents:

- `tutor`
- `mentor`
- `architect`
- `course-generator`
- `cuba-education-assistant`

The private catalog exposes safe labels and metadata. It does not expose `systemInstructions`.

## 5. Private Lab Catalog Flow

Route:

```text
apps/web/app/api/lab/catalog/route.ts
```

Purpose:

- validate `OWNER_ACCESS_CODE`
- expose private lab safe catalog metadata
- return agents, tools, GENIO metadata, memory blueprint, orchestration blueprint, and adapter blueprint

Flow:

```text
Browser /lab
  -> POST /api/lab/catalog
  -> OWNER_ACCESS_CODE check
  -> AgentRegistry.list()
  -> ToolRegistry.list()
  -> GenioGovernanceRegistry.centralProfile()
  -> safe metadata response
```

The catalog response is metadata-only. It does not expose secrets or internal prompts.

## 6. Private Tool Proposal Flow

Route:

```text
apps/web/app/api/lab/tool/route.ts
```

Domain:

```text
src/domain/tools/ToolProfile.ts
src/domain/tools/ToolRegistry.ts
src/infrastructure/tools/LocalToolExecutor.ts
src/domain/security/ApprovalGate.ts
src/domain/security/ApprovalPolicy.ts
src/infrastructure/audit/InMemoryAuditLog.ts
```

Flow:

```text
Browser /lab
  -> POST /api/lab/tool
  -> OWNER_ACCESS_CODE check
  -> ToolRegistry.resolve()
  -> AgentRegistry.resolve()
  -> ApprovalGate.evaluate()
  -> LocalToolExecutor.execute()
  -> InMemoryAuditLog.record()
  -> ToolResult + audit events
```

Current tools:

- `summarize-project-state`
- `propose-terminal-command`
- `explain-error-log`
- `generate-implementation-plan`
- `review-risk`
- `create-checklist`

Tools return structured proposals only. They do not run commands, access files, read Gmail, call external services, move money, or control the operating system.

## 7. Owner Approval Flow

Domain:

```text
src/domain/security/OwnerApproval.ts
```

States:

- `pending`
- `approved`
- `rejected`
- `blocked`

Identity metadata:

- `proposalId`
- `correlationId`
- `sessionId`

Rule:

```text
Approve != Execute
```

Approving or rejecting a proposal updates local UI state and audit metadata only:

- `simulationOnly: true`
- `actionExecuted: false`

There is no real execution layer behind approval.

## 8. GENIO Governance Flow

Domain:

```text
src/domain/governance/GovernanceProfile.ts
src/domain/governance/GenioCentralProfile.ts
```

GENIO is the central governance profile:

- central authority metadata
- hierarchy owner
- risk awareness
- approval-first governance
- orchestration and context coordination
- adapter governance

Hierarchy:

```text
central      GENIO
supervisor   architect/operator
specialist   coder/reviewer/debugger
utility      tutor
observer     future observability role
```

GENIO does not bypass owner approval and does not execute actions.

## 9. Strategic Vision Metadata

GENIO includes strategic vision metadata for future reasoning:

- probabilistic simulation
- scenario comparison
- opportunity analysis
- life-map planning
- financial scenario modeling

Boundaries:

- no omniscience
- no guarantees
- no magic
- no absolute predictions
- no control over users

Future predictions must be framed as estimates based on data, assumptions, context, statistics, and uncertainty.

## 10. Memory And Context Blueprint

Domain:

```text
src/domain/context/ContextBlueprint.ts
```

Prepared types:

- `ContextProfile`
- `MemoryFragment`
- `ContextWindow`
- `LifeObjective`
- `LifeRoadmap`
- `Milestone`
- `JournalEntry`
- `Reflection`
- `DailySummary`

Categories:

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

Retention policies:

- `short-term`
- `mid-term`
- `long-term`
- `archived`

No real persistence exists. No vector memory, embeddings, semantic search, cloud sync, DB, filesystem storage, or browser persistence exists.

## 11. Strategic Multi-Agent Orchestration Blueprint

Domain:

```text
src/domain/orchestration/OrchestrationBlueprint.ts
```

Prepared types:

- `OrchestrationFlow`
- `AgentTask`
- `TaskAssignment`
- `CoordinationPlan`
- `PipelineStep`
- `DelegationRule`

Conceptual flow:

```text
GENIO
  -> planner
  -> specialist
  -> reviewer
  -> validator
  -> final proposal
```

This layer does not create jobs, queues, workers, threads, background tasks, real workflows, or autonomous agents.

## 12. Controlled Adapter Blueprint

Domain:

```text
src/domain/adapters/AdapterBlueprint.ts
```

Future adapter catalog:

- `terminal-adapter`
- `filesystem-adapter`
- `file-preview-adapter`
- `email-draft-adapter`
- `finance-simulation-adapter`
- `local-computer-adapter`
- `document-organization-adapter`

Every adapter is metadata-only:

- risk-classified
- permission-scoped
- approval-aware
- forbidden actions listed
- `simulationOnly: true`
- `actionExecuted: false`

No real adapter implementation exists. There is no `child_process`, `fs`, Gmail API, bank API, trading API, browser automation, OS automation, credential access, env secret reading, or external HTTP execution.

## 13. Audit Flow

Domain:

```text
src/domain/audit/AuditEvent.ts
src/infrastructure/audit/InMemoryAuditLog.ts
```

Current audit log:

- in-memory only
- latest 100 events
- basic redaction for obvious secret patterns
- no disk persistence
- no DB
- no localStorage

Event families include:

- tool events
- approval events
- context blueprint events
- orchestration blueprint events
- adapter blueprint events

All current events remain proposal/simulation metadata. `actionExecuted` remains `false`.

## 14. Current Limitations

The system does not currently provide:

- real terminal access
- filesystem access
- Gmail/email integration
- real authentication
- database persistence
- vector memory
- embeddings
- autonomous agents
- real workflows
- queues/workers/background jobs
- external execution adapters
- finance integrations
- trading/banking
- browser or OS automation
- SaaS multi-company management

## 15. Visual Tree

```text
UNV-HMND
├─ apps/web
│  ├─ /demo
│  │  └─ POST /api/v1/run
│  ├─ /lab
│  │  ├─ POST /api/lab/catalog
│  │  └─ POST /api/lab/tool
│  └─ POST /api/ai/run
└─ src/domain
   ├─ agents
   ├─ tools
   ├─ security
   ├─ audit
   ├─ governance
   ├─ context
   ├─ orchestration
   └─ adapters
```

## 16. Verification Commands

```bash
npm --prefix apps/web run build
npm --prefix apps/web run test
npm run build:api
npm test
```
