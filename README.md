# UNV-HMND / Humanidad_Universo

UNV-HMND es un proyecto de portfolio y laboratorio IA orientado a produccion. Combina un frontend Next.js App Router, una capa API interna, un backend Node.js modular y una arquitectura privada de IA llamada GENIO.

El proyecto evoluciono desde una demo publica de portfolio hacia un blueprint de Private AI Operating System:

- portfolio frontend para reclutadores
- demo publica multiagente segura
- backend Node.js desacoplado
- Private AI Lab controlado por owner
- GENIO como nucleo central de gobernanza
- blueprints de memoria, orquestacion y adapters futuros

La regla central del sistema es:

```text
Proposal != execution
```

GENIO puede analizar, organizar, priorizar, simular y proponer. GENIO no ejecuta acciones reales.

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

`/lab` no ejecuta terminal, filesystem, Gmail, adapters, workflows ni acciones reales.

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
│  │  ├─ audit
│  │  ├─ context
│  │  ├─ governance
│  │  ├─ orchestration
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

Roadmap futuro:

- auth real de owner
- audit log persistente
- storage seguro
- memory retrieval con aprobacion
- adapters read-only controlados
- company agents
- SaaS multiempresa
- execution adapters reversibles y aprobados

La evolucion debe seguir siendo progresiva, auditable, reversible y controlada por el owner.

## Documentacion

- [API and AI Flow](docs/API_AND_AI_FLOW.md)
- [Private AI Lab Architecture](docs/PRIVATE_AI_LAB_ARCHITECTURE.md)
