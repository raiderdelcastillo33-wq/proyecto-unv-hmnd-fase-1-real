# UNV-HMND - Portfolio Profesional Frontend Developer

UNV-HMND es un proyecto de portfolio orientado a producción que combina un frontend Next.js App Router, una capa API interna, un backend Node.js y interacciones potenciadas por IA.

Está diseñado para demostrar:

- Una página de portfolio pulida orientada a reclutadores
- Un flujo de demo interactiva real
- Enrutamiento API interno con Next.js
- Orquestación backend en Node.js
- Integraciones IA listas para desarrollo local y despliegue en Vercel

## Lo que incluye el proyecto

- `Página principal`: superficie de portfolio orientada a reclutadores
- `Página de demo`: laboratorio IA con selector multiagente, historial local, memoria corta por sesión y respuesta simulada tipo typing
- `Rutas internas Next.js`: capa API segura para frontend bajo `apps/web/app/api`
- `API Node`: runtime backend servido desde `src/api/server.ts`, preparado para cloud hosting con `PORT`
- `Características IA`: tareas respaldadas por IA expuestas a través de `/api/v1/run`

## Stack Tecnológico

- Next.js 15
- React 19
- TypeScript
- Node.js
- App Router
- Jest + Testing Library
- Vercel para despliegue frontend

## Instalación Real

Instalar dependencias raíz:

```bash
npm install
```

Instalar dependencias del frontend:

```bash
cd apps/web
npm install
cd ../..
```

## Ejecutar Localmente

Iniciar la API Node y la app Next.js juntas desde la raíz del repo:

```bash
npm run dev
```

URLs locales:

```text
Frontend: http://localhost:3001
API Node: http://localhost:3000
Demo:     http://localhost:3001/demo
```

## Variables de Entorno

Crear `apps/web/.env.local` para desarrollo local:

```bash
OPENAI_API_KEY=tu_clave_openai_api # opcional
OPENAI_MODEL=gpt-4o-mini
UNV_API_BASE_URL=http://127.0.0.1:3000
```

Notas:

- `OPENAI_API_KEY` es opcional para el backend Node. Si no existe, la aplicación usa `MockAIProvider` para mantener la demo estable sin clave externa
- `OPENAI_API_KEY` nunca debe exponerse al frontend; solo debe existir en el entorno server-side cuando se quiera usar IA real
- `OPENAI_MODEL` es opcional y por defecto es `gpt-4o-mini`
- `UNV_API_BASE_URL` es opcional en desarrollo local porque la app puede usar la API Node local
- `UNV_API_BASE_URL` es opcional para la demo en Vercel: si falta, `/api/v1/run` usa un fallback demo seguro desde Next.js
- `UNV_API_BASE_URL` es necesaria cuando la demo debe usar un backend Node real externo

Archivo de referencia:

```text
apps/web/.env.example
```

## Cómo Ejecutar la Demo

1. Iniciar el stack completo con `npm run dev`
2. Abrir `http://localhost:3001/demo`
3. Elegir un agente público del selector
4. Ingresar un mensaje con al menos 5 caracteres
5. Enviar el formulario
6. La UI llamará a la ruta interna Next.js `/api/v1/run`
7. Esa ruta reenvía la petición a la API Node si existe `UNV_API_BASE_URL`, o usa fallback demo seguro si no existe backend externo
8. La conversación se renderiza en historial local con una simulación ligera de typing

## Resumen de API

### `/api/v1/run`

Propósito:

- accepts the demo form input
- validates the payload
- forwards the request to the Node API when configured
- returns a safe demo fallback when no external backend is configured
- normalizes backend failures into UI-safe responses

Behavior:

- local development: uses the local backend by default
- production without `UNV_API_BASE_URL`: returns a clear demo fallback response from Next.js
- production with `UNV_API_BASE_URL`: reaches the external Node API

Request shape:

```json
{
  "input": "hello demo flow",
  "agentId": "tutor-agent",
  "context": "User: previous message\nAssistant: previous response"
}
```

Limits:

- `input` must contain at least 5 characters
- local conversation history is limited to 12 messages
- short session memory uses the last 6 messages
- `context` is limited to 2,000 characters across frontend, Next.js route, and backend controller

### `/api/ai/run`

Purpose:

- executes AI tasks directly from the Next.js server layer
- supports summary, translation, and idea generation
- currently uses the OpenAI Chat Completions API

## AI Architecture

UNV-HMND mantiene una capa IA backend desacoplada para que el sistema funcione con o sin proveedor externo:

- `OpenAIProvider`: proveedor server-side para IA real usando `OPENAI_API_KEY` y Chat Completions API
- `FallbackAIProvider`: envuelve el proveedor real y vuelve a una respuesta segura si OpenAI falla
- `MockAIProvider`: proveedor local/test sin dependencias externas ni costos
- `AgentRegistry`: catálogo tipado de agentes IA reutilizables

El contrato separa `feature` y `agent`:

- `feature`: tarea solicitada, como `assistant`, `prompt-improver` o `code-feedback`
- `agent`: rol/persona/instrucciones que guían la respuesta

Agentes actuales:

- `architect-agent`
- `coder-agent`
- `reviewer-agent`
- `debugger-agent`
- `tutor-agent`
- `operator-agent`

Compatibility agents still exist internally for earlier flows:

- `tutor`, `mentor`, `architect`, `course-generator`, `cuba-education-assistant`

La implementación actual usa Chat Completions API. La arquitectura queda preparada para migrar a Responses API más adelante sin hacer obligatoria la clave de OpenAI ni romper el fallback local.

## AI Lab Behavior

The `/demo` page currently behaves as a lightweight AI lab:

- multi-agent selector with public labels only
- local in-memory conversation history
- short session memory sent as bounded `context`
- typing simulation after a full response is received
- safe Vercel fallback when no external Node backend is configured

There is no database, authentication, persistent memory, localStorage, or real streaming in the current implementation.

## Project Structure

```text
UNV-HMND/
├─ apps/
│  └─ web/
│     ├─ app/
│     │  ├─ page.tsx
│     │  ├─ about/page.tsx
│     │  ├─ portfolio/page.tsx
│     │  ├─ demo/page.tsx
│     │  └─ api/
│     │     ├─ ai/run/route.ts
│     │     ├─ health/route.ts
│     │     └─ v1/run/route.ts
│     ├─ lib/backend.ts
│     ├─ services/ai.ts
│     └─ package.json
├─ docs/
│  └─ API_AND_AI_FLOW.md
├─ src/
│  ├─ api/server.ts
│  ├─ app/
│  ├─ application/
│  ├─ domain/
│  ├─ infrastructure/
│  └─ interfaces/
├─ tests/
├─ package.json
└─ README.md
```

## Portfolio Flow Tree

```text
root
└─ frontend (apps/web)
   ├─ landing
   ├─ portfolio
   ├─ demo
   │  └─ POST /api/v1/run
   │     ├─ Node API when UNV_API_BASE_URL is configured
   │     └─ safe demo fallback on Vercel when backend is missing
   └─ POST /api/ai/run
      └─ OpenAI Chat Completions API
```

## Build And Test

Build the frontend:

```bash
npm run build
```

Build the backend TypeScript:

```bash
npm run build:api
```

Run the web tests:

```bash
npm run test:web
```

## Deploy To Vercel

Vercel configuration:

- `Framework Preset`: `Next.js`
- `Root Directory`: `apps/web`
- `Install Command`: `npm install`
- `Build Command`: `npm run build`
- `Output Directory`: leave default

Production environment variables:

```bash
OPENAI_API_KEY=your_openai_api_key # optional for backend fallback mode
OPENAI_MODEL=gpt-4o-mini
UNV_API_BASE_URL=https://your-node-api.example.com # optional for demo fallback mode
```

Important:

- `apps/web` is the project Vercel should build
- `/api/v1/run` works without a public Node API through a safe demo fallback
- `/api/v1/run` uses a real backend when `UNV_API_BASE_URL` points to a public Node API
- backend AI routes can fallback safely to `MockAIProvider` when `OPENAI_API_KEY` is not configured
- `/api/ai/run` is a Next.js server route and needs `OPENAI_API_KEY` only when that direct OpenAI path is used

## Production Notes

- The frontend can be deployed on Vercel
- The external Node API can be deployed separately when real backend execution is needed
- The demo remains stable in local development through internal routing and fallback logic
- The production demo remains usable without `UNV_API_BASE_URL` through safe fallback mode
- A real production backend should define `UNV_API_BASE_URL`
- Defining `OPENAI_API_KEY` enables real OpenAI responses; omitting it keeps the backend stable through mock fallback

## Documentation

Detailed technical documentation:

- [API and AI Flow](docs/API_AND_AI_FLOW.md)
