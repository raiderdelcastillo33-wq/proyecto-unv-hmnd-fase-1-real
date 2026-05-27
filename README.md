# UNV-HMND / Humanidad_Universo

UNV-HMND es un proyecto de portfolio y laboratorio IA orientado a produccion. Combina un frontend Next.js App Router, una capa API interna, un backend Node.js modular y una arquitectura humano + IA llamada Humanity Guide OS.

El proyecto evoluciono desde una demo publica de portfolio hacia un blueprint de Humanity Guide OS:

- portfolio frontend para reclutadores
- demo publica multiagente segura
- backend Node.js desacoplado
- Private AI Lab controlado por owner
- Humanity Guide OS como experiencia principal humano + IA
- GENIO como nucleo central de gobernanza
- GENESIS como reflection layer y contextual mirror
- Human-Centered Alignment Layer como validador etico/contextual
- blueprints de memoria, orquestacion y adapters futuros
- blueprint de autenticacion real futura del owner
- blueprint de observabilidad y audit persistente futuro
- blueprint de capacidades practicas controladas futuras
- blueprint de sandbox runtime controlado futuro
- blueprint de adapter read-only para preview futuro de archivos

La regla central del sistema es:

```text
Proposal != execution
```

GENIO puede analizar, organizar, priorizar, simular y proponer. GENIO no ejecuta acciones reales.

## Humanity Guide OS

Humanity Guide OS es la direccion conceptual oficial del ecosistema.

Objetivo del MVP:

```text
Humanity Guide OS — Intelligent Organization MVP
```

Principios:

- La IA no invade. La IA muta con permiso.
- El humano no se adapta al sistema. El sistema se adapta al humano.
- La IA no entrega poder. La IA acompana evolucion.

Capas:

- `Humanity Guide OS`: experiencia principal, organizacion inteligente, claridad contextual y productividad consciente.
- `GENIO`: governance operativo, approval systems, permisos, estabilidad, policy enforcement y control reversible.
- `GENESIS`: reflection layer, contextual mirror, simulacion reflexiva y exploracion no invasiva de posibilidades.
- `Human-Centered Alignment Layer`: auditoria humano-centrica, ethics middleware, policy validator y contextual audit engine.

Limites:

- no AGI
- no conciencia real
- no claims espirituales reales
- no manipulacion emocional
- no scoring humano
- no vigilancia humana
- no dependencia psicologica

## Stack Tecnologico

- Next.js 15
- React 19
- TypeScript
- Node.js
- App Router
- Jest + Testing Library
- Vercel para despliegue frontend

Rutas principales:

```text
apps/web  Frontend Next.js
src       Backend Node.js y dominio
docs      Documentacion tecnica
tests     Tests backend/dominio
```

## Superficies Del Sistema

### Demo Publica `/demo`

La demo publica es una experiencia segura de conversacion IA:

- selector multiagente publico
- historial local en memoria
- memoria corta por sesion limitada
- typing simulation
- fallback seguro para Vercel
- separacion frontend/backend

No incluye base de datos, autenticacion, memoria persistente, localStorage persistente, streaming real ni ejecucion de acciones.

### Private AI Lab `/lab`

El Private AI Lab es una superficie privada para propuestas auditables:

- requiere `OWNER_ACCESS_CODE`
- muestra GENIO Central
- lista agentes y tools desde catalogos tipados
- genera `ToolResult` estructurado
- muestra approval metadata
- registra audit events en memoria
- permite aprobar/rechazar propuestas en modo simulation-only
- muestra blueprint de observabilidad futura sin telemetria real
- muestra blueprint de capacidades futuras sin runtime de ejecucion
- muestra blueprint de sandbox futuro sin ejecucion real ni acceso al host
- muestra blueprint de file preview futuro sin lectura real del filesystem

`/lab` no ejecuta terminal, filesystem, Gmail, adapters, workflows ni acciones reales.

`OWNER_ACCESS_CODE` es una barrera temporal minima del lado servidor. No es autenticacion real, no gestiona usuarios, no crea sesiones persistentes y no debe exponerse como `NEXT_PUBLIC_OWNER_ACCESS_CODE`.

## GENIO Central Governance Layer

GENIO es el perfil central de gobernanza del sistema. No es un agente comun; es la capa conceptual que coordina:

- jerarquia multiagente
- governance metadata
- approval flow
- observabilidad
- riesgo
- contexto global
- blueprints futuros

Jerarquia preparada:

- `central`: GENIO
- `supervisor`: architect/operator
- `specialist`: coder/reviewer/debugger
- `utility`: tutor y agentes de apoyo
- `observer`: rol futuro de observabilidad

El owner humano sigue siendo la autoridad maxima.

## Agentes Actuales

Agentes privados principales:

- `architect-agent`
- `coder-agent`
- `reviewer-agent`
- `debugger-agent`
- `tutor-agent`
- `operator-agent`

Agentes de compatibilidad:

- `tutor`
- `mentor`
- `architect`
- `course-generator`
- `cuba-education-assistant`

El catalogo publico no expone `systemInstructions`.

## Tools Y Proposal Mode

Tools actuales:

- `summarize-project-state`
- `propose-terminal-command`
- `explain-error-log`
- `generate-implementation-plan`
- `review-risk`
- `create-checklist`

Las tools producen propuestas, planes, checklists, explicaciones y comandos como texto. No ejecutan comandos ni modifican archivos.

## Owner Approval Flow Minimal

El flujo de aprobacion del owner es local, auditable y simulation-only.

Estados:

- `pending`
- `approved`
- `rejected`
- `blocked`

Regla:

```text
Approve != Execute
```

Aprobar una propuesta solo registra decision y metadata local. No ejecuta terminal, filesystem, email, adapters, workflows ni automatizaciones.

Campos clave:

- `proposalId`
- `correlationId`
- `sessionId`
- `approvalStatus`
- `reviewedBy`
- `reviewTimestamp`
- `simulationOnly: true`
- `actionExecuted: false`

## Real Owner Auth Blueprint

La autenticacion real del owner esta preparada solo como blueprint.

Metadata creada:

- `AuthBlueprint`
- `UserRole`
- `PermissionScope`
- `AccessPolicy`
- `SessionPolicy`
- `OwnerIdentity`
- `AdminIdentity`
- `OperatorIdentity`
- `GuestIdentity`
- `ProtectedSurface`
- `AuthRiskLevel`

Roles futuros:

- `owner`
- `admin`
- `operator`
- `guest`

Permisos futuros preparados:

- `view_lab`
- `use_demo`
- `request_tool_proposal`
- `approve_proposal`
- `reject_proposal`
- `view_audit`
- `manage_agents`
- `manage_tools`
- `manage_users`
- `manage_company`
- `configure_adapters`
- `execute_controlled_action_future`

`execute_controlled_action_future` esta marcado como future-only, high-risk, approval-required y not implemented.

No existe todavia login real, registro, DB, sesiones persistentes, cookies auth, JWT, OAuth, Supabase, Clerk, NextAuth, bcrypt ni multiempresa real.

## Persistent Audit & Observability Blueprint

GENIO queda preparado para observabilidad profesional futura solo como metadata.

Tipos preparados:

- `ObservabilityBlueprint`
- `AuditTrace`
- `EventLineage`
- `CorrelationChain`
- `GovernanceCheckpoint`
- `ExecutionLineage`
- `SystemObservation`
- `IncidentSignal`
- `MonitoringScope`
- `AuditRetentionPolicy`
- `ObservabilityRiskLevel`

Metadata preparada:

- `correlationId`
- `traceId`
- `parentEventId`
- `orchestrationId`
- `proposalId`
- `sessionId`
- `governanceSource`
- `originatingAgent`
- `approvalChain`

Roadmap futuro:

- persistent audit
- immutable logs
- encrypted audit storage
- audit retention
- event replay
- forensic analysis
- governance history
- incident escalation

No existe todavia DB de audit, OpenTelemetry real, cloud logging, Sentry, DataDog, Prometheus, Grafana, ElasticSearch, workers, realtime telemetry ni dashboards reales.

Observabilidad no significa vigilancia invasiva. Toda auditabilidad futura debe ser owner-controlled, privacy-aware, audit-first y compatible con approval flow.

## Controlled Practical Capability Blueprint

GENIO queda preparado para gobernar capacidades practicas futuras sin activar runtime real.

Tipos preparados:

- `CapabilityBlueprint`
- `CapabilityProfile`
- `CapabilityCategory`
- `CapabilityRiskLevel`
- `CapabilityExecutionMode`
- `CapabilityBoundary`
- `CapabilityConstraint`
- `CapabilityApprovalPolicy`
- `CapabilitySimulation`
- `CapabilityCheckpoint`
- `CapabilityIncidentRisk`

Categorias futuras:

- `analysis`
- `planning`
- `drafting`
- `documentation`
- `simulation`
- `filesystem-read-future`
- `filesystem-write-future`
- `terminal-read-future`
- `terminal-execution-future`
- `browser-future`
- `finance-simulation`
- `organization`
- `orchestration`
- `monitoring`
- `company-management`

La fase prepara:

- lifecycle de capacidad
- classification de riesgo
- boundaries de ejecucion
- approval chain futura
- problem-solver-agent blueprint
- business-builder blueprint

`problem-solver-agent` es conceptual. Puede preparar estrategias, mapas de solucion, roadmaps y analisis de negocios, pero no reemplaza profesionales regulados, no actua fuera de GENIO y no ejecuta acciones reales.

`business-builder-blueprint` prepara planificacion de apps, websites, startups, monetizacion y SaaS roadmap solo como simulacion.

No existe todavia runtime de capacidades, ejecucion terminal, filesystem write, browser automation, external API execution, Gmail real, trading, OS automation, self-modification, self-replication ni autonomia irrestricta.

## Controlled Runtime Sandbox Blueprint

GENIO queda preparado para gobernar una zona futura de ejecucion controlada, aislada y auditada.

Tipos preparados:

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

Jerarquia obligatoria:

```text
Owner
-> GENIO Central
-> Governance Layer
-> Runtime Sandbox
-> Specialized Agents
-> Controlled Capabilities
```

Arquitectura prohibida:

```text
Agent
-> host machine directly
```

Estados preparados:

- `planned`
- `requested`
- `awaiting-approval`
- `approved-for-simulation`
- `simulated`
- `blocked`
- `terminated`

El estado actual es `blocked`, con `executionMode: no-runtime`, `isolationLevel: simulation-only`, `simulationOnly: true` y `actionExecuted: false`.

No existe todavia terminal real, shell real, `child_process`, filesystem real, Docker real, VM real, workers, queues, browser automation, OS automation, kill switch real ni sandbox runtime real.

## Read-Only File Preview Adapter Blueprint

GENIO queda preparado para gobernar un futuro adapter de preview controlado y read-only.

Tipos preparados:

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

Preview types futuros:

- `text`
- `markdown`
- `json`
- `yaml`
- `log`
- `code`
- `pdf-preview-future`
- `image-preview-future`
- `spreadsheet-preview-future`

El estado actual es `blocked`, `visibility: metadata-only`, `simulationOnly: true` y `actionExecuted: false`.

No existe todavia `fs` real, lectura real de archivos, uploads, watchers, indexing, embeddings, OCR, parsing, shell access, file execution, filesystem traversal, file browser UI ni acceso directo al host.

## GENIO Strategic Vision Metadata

GENIO esta descrito como una inteligencia estrategica calmada, analitica y orientada al crecimiento humano.

La vision prepara capacidades conceptuales futuras:

- simulacion predictiva
- razonamiento probabilistico
- planificacion estrategica
- analisis de oportunidades
- mapas de vida
- escenarios financieros simulados

Limites explicitos:

- GENIO no conoce el futuro
- GENIO no garantiza resultados
- GENIO no usa magia, omnisciencia ni control mental
- GENIO no toma decisiones irreversibles
- toda prediccion futura debe ser probabilistica, contextual y explicable

## GENIO Memory & Context Blueprint

La memoria futura esta preparada solo como metadata tipada.

Categorias:

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

Retencion preparada:

- `short-term`
- `mid-term`
- `long-term`
- `archived`

Blueprints incluidos:

- `ContextProfile`
- `MemoryFragment`
- `ContextWindow`
- `LifeObjective`
- `LifeRoadmap`
- `Milestone`
- `JournalEntry`
- `Reflection`
- `DailySummary`

No existe todavia:

- DB real
- memoria vectorial
- embeddings
- semantic search
- persistent memory
- cloud sync
- localStorage persistente

## Strategic Multi-Agent Orchestration Layer

GENIO tiene un blueprint de orquestacion multiagente simulation-only.

Tipos preparados:

- `OrchestrationFlow`
- `AgentTask`
- `TaskAssignment`
- `CoordinationPlan`
- `PipelineStep`
- `DelegationRule`

Pipeline conceptual:

```text
GENIO
-> planner
-> specialist
-> reviewer
-> validator
-> final proposal
```

Esta capa no lanza procesos, jobs, workers, threads, queues ni agentes autonomos. Solo describe como se coordinaria una cadena futura bajo aprobacion humana.

## Controlled Adapter Blueprint

GENIO incluye un catalogo de adapters futuros, todos metadata-only.

Adapters preparados:

- `terminal-adapter`
- `filesystem-adapter`
- `file-preview-adapter`
- `email-draft-adapter`
- `finance-simulation-adapter`
- `local-computer-adapter`
- `document-organization-adapter`

Cada adapter declara:

- categoria
- capacidades
- riesgo
- modo de ejecucion
- aprobacion requerida
- safety boundaries
- acciones prohibidas
- `simulationOnly: true`
- `actionExecuted: false`

No existe adapter real todavia.

## Seguridad

Principios:

- Proposal != Execution
- Approve != Execute
- audit-first
- approval-required
- owner-controlled
- reversible architecture
- progressive safety
- no dangerous autonomy

Eventos auditados en memoria incluyen:

- `tool-requested`
- `approval-evaluated`
- `tool-result-created`
- `tool-blocked`
- `approval-requested`
- `approval-approved`
- `approval-rejected`
- `context-created`
- `context-linked`
- `memory-classified`
- `orchestration-created`
- `orchestration-routed`
- `task-delegated`
- `pipeline-completed`
- `governance-blocked`
- `adapter-discovered`
- `adapter-requested`
- `adapter-blocked`
- `adapter-simulated`

El audit log actual es en memoria y aplica redaccion basica de secretos. No persiste en disco ni DB.

## Limitaciones Actuales

No existen todavia:

- terminal real
- filesystem real
- DB real
- auth real
- observabilidad real
- audit persistente
- tracing real
- capability runtime real
- sandbox runtime real
- host machine access
- file preview runtime real
- filesystem read real
- memoria vectorial
- embeddings reales
- autonomous agents
- real workflows
- background jobs
- queues/workers
- Gmail integration
- finance integrations reales
- trading
- banking
- browser automation
- OS automation
- external execution adapters
- SaaS multiempresa

## Instalacion

Instalar dependencias raiz:

```bash
npm install
```

Instalar dependencias frontend:

```bash
cd apps/web
npm install
cd ../..
```

## Ejecucion Local

Iniciar API Node y frontend juntos:

```bash
npm run dev
```

URLs locales:

```text
Frontend: http://localhost:3001
API Node: http://localhost:3000
Demo:     http://localhost:3001/demo
Lab:      http://localhost:3001/lab
```

## Variables De Entorno

Crear `apps/web/.env.local`:

```bash
OPENAI_API_KEY=tu_clave_openai_api # opcional
OPENAI_MODEL=gpt-4o-mini
UNV_API_BASE_URL=http://127.0.0.1:3000
OWNER_ACCESS_CODE=owner-local-code
```

Notas:

- `OPENAI_API_KEY` es opcional para backend Node gracias a `MockAIProvider`
- `OPENAI_API_KEY` nunca debe exponerse al frontend
- `UNV_API_BASE_URL` es opcional en Vercel porque `/api/v1/run` tiene fallback demo seguro
- `OWNER_ACCESS_CODE` protege `/lab`, pero no sustituye una capa auth real
- no crear ni exponer `NEXT_PUBLIC_OWNER_ACCESS_CODE`

## API Principal

### `/api/v1/run`

Ruta interna para la demo publica.

```json
{
  "input": "hello demo flow",
  "agentId": "tutor-agent",
  "context": "User: previous message\nAssistant: previous response"
}
```

Limites:

- `input` minimo 5 caracteres
- historial local maximo 12 mensajes
- memoria corta usa ultimos 6 mensajes
- `context` maximo 2,000 caracteres

### `/api/lab/catalog`

Ruta privada server-side para catalogo seguro:

- agentes privados
- tools
- GENIO governance metadata
- memory blueprint
- orchestration blueprint
- adapter blueprint
- auth blueprint
- observability blueprint
- capability blueprint
- runtime sandbox blueprint

Requiere `OWNER_ACCESS_CODE`.

### `/api/lab/tool`

Ruta privada server-side para generar propuestas auditables.

Requiere `OWNER_ACCESS_CODE`.

## Estructura Del Proyecto

```text
UNV-HMND/
├─ apps/web
│  ├─ app
│  │  ├─ demo
│  │  ├─ lab
│  │  └─ api
│  ├─ lib
│  └─ services
├─ docs
├─ src
│  ├─ api
│  ├─ application
│  ├─ domain
│  │  ├─ adapters
│  │  ├─ agents
│  │  ├─ auth
│  │  ├─ audit
│  │  ├─ capabilities
│  │  ├─ context
│  │  ├─ ecosystem
│  │  ├─ file-preview
│  │  ├─ governance
│  │  ├─ observability
│  │  ├─ orchestration
│  │  ├─ runtime
│  │  ├─ security
│  │  └─ tools
│  ├─ infrastructure
│  └─ interfaces
├─ tests
└─ README.md
```

## Build And Test

```bash
npm --prefix apps/web run build
npm --prefix apps/web run test
npm run build:api
npm test
```

## Evolucion Arquitectonica

Fases completadas:

- portfolio frontend y demo publica
- multi-agent demo selector
- private lab core
- dynamic agent/tool catalog
- GENIO Central Governance Layer
- Owner Approval Flow Minimal
- GENIO Strategic Vision Metadata
- GENIO Memory & Context Blueprint
- Strategic Multi-Agent Orchestration Layer
- Controlled Adapter Blueprint
- Master Production Architecture Blueprint
- Real Owner Auth Blueprint
- Persistent Audit & Observability Blueprint
- Controlled Practical Capability Blueprint
- Controlled Runtime Sandbox Blueprint
- Read-Only File Preview Adapter Blueprint
- Humanity Guide OS Architecture

Roadmap futuro:

- Real Owner Auth runtime
- Persistent Audit Log
- Read-only Capabilities
- Controlled Draft Capabilities
- Controlled Runtime Sandbox
- Secure Storage / DB
- Read-only File Preview Adapter
- Controlled Draft Adapters
- Memory Retrieval System
- Company Agents
- SaaS Admin Dashboard
- Controlled Execution Layer

La evolucion debe seguir siendo progresiva, auditable, reversible y controlada por el owner.

## Validacion Web

Local:

```text
http://localhost:3001
http://localhost:3001/demo
http://localhost:3001/lab
```

Produccion/Vercel:

```text
https://your-vercel-domain.example
https://your-vercel-domain.example/demo
https://your-vercel-domain.example/lab
```

Validar:

- `/demo` carga, selector de agentes funciona, fallback seguro responde y no hay errores criticos en Console
- `/lab` pide `OWNER_ACCESS_CODE`, muestra GENIO, approvals, audit, auth, observability, capabilities, sandbox, file preview, memory, orchestration y adapters
- Network muestra `/api/v1/run`, `/api/lab/catalog` y `/api/lab/tool` sin exponer secretos
- approve/reject no ejecutan acciones reales
- no existe `NEXT_PUBLIC_OWNER_ACCESS_CODE`

## Documentacion

- [API and AI Flow](docs/API_AND_AI_FLOW.md)
- [Humanity Guide OS Architecture](docs/HUMANITY_GUIDE_OS_ARCHITECTURE.md)
- [Private AI Lab Architecture](docs/PRIVATE_AI_LAB_ARCHITECTURE.md)
- [Real Owner Auth Blueprint](docs/AUTH_BLUEPRINT.md)
- [Persistent Audit & Observability Blueprint](docs/OBSERVABILITY_BLUEPRINT.md)
- [Controlled Practical Capability Blueprint](docs/CAPABILITY_BLUEPRINT.md)
- [Controlled Runtime Sandbox Blueprint](docs/RUNTIME_SANDBOX_BLUEPRINT.md)
- [Read-Only File Preview Adapter Blueprint](docs/FILE_PREVIEW_ADAPTER_BLUEPRINT.md)
- [Master Production Architecture](docs/MASTER_PRODUCTION_ARCHITECTURE.md)
- [Production Testing Guide](docs/PRODUCTION_TESTING_GUIDE.md)
