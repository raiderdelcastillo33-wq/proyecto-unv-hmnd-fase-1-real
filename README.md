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
- `Página de demo`: UI interactiva que envía mensajes y renderiza respuestas del backend
- `Rutas internas Next.js`: capa API segura para frontend bajo `apps/web/app/api`
- `API Node`: runtime backend servido desde `src/api/server.ts`
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
- `UNV_API_BASE_URL` es requerida en producción cuando `/api/v1/run` necesita alcanzar una API Node externa

Archivo de referencia:

```text
apps/web/.env.example
```

## Cómo Ejecutar la Demo

1. Iniciar el stack completo con `npm run dev`
2. Abrir `http://localhost:3001/demo`
3. Ingresar un mensaje con al menos 5 caracteres
4. Enviar el formulario
5. La UI llamará a la ruta interna Next.js `/api/v1/run`
6. Esa ruta reenvía la petición a la API Node
7. La respuesta del backend se renderiza de vuelta en la UI de la demo

## Resumen de API

### `/api/v1/run`

Propósito:

- accepts the demo form input
- validates the payload
- forwards the request to the Node API
- normalizes backend failures into UI-safe responses

Behavior:

- local development: uses the local backend by default
- production: requires `UNV_API_BASE_URL` to reach the external Node API

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

- `tutor`
- `mentor`
- `architect`
- `course-generator`
- `cuba-education-assistant`

La implementación actual usa Chat Completions API. La arquitectura queda preparada para migrar a Responses API más adelante sin hacer obligatoria la clave de OpenAI ni romper el fallback local.

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
   │     └─ Node API
   │        └─ backend response
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
UNV_API_BASE_URL=https://your-node-api.example.com
```

Important:

- `apps/web` is the project Vercel should build
- `/api/v1/run` needs a public Node API URL in production
- backend AI routes can fallback safely to `MockAIProvider` when `OPENAI_API_KEY` is not configured
- `/api/ai/run` is a Next.js server route and needs `OPENAI_API_KEY` only when that direct OpenAI path is used

## Production Notes

- The frontend can be deployed on Vercel
- The external Node API should be deployed separately
- The demo remains stable in local development through internal routing and fallback logic
- The production setup should explicitly define `UNV_API_BASE_URL`
- Defining `OPENAI_API_KEY` enables real OpenAI responses; omitting it keeps the backend stable through mock fallback

## Documentation

Detailed technical documentation:

- [API and AI Flow](docs/API_AND_AI_FLOW.md)
