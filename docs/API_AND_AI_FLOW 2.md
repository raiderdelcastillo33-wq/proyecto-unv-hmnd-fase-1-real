# API And AI Flow

This document explains the two main execution paths in UNV-HMND:

- `Demo flow`: Browser -> Next.js -> `/api/v1/run` -> Node API
- `AI flow`: Browser -> Next.js -> `/api/ai/run` -> OpenAI

## 1. `/api/v1/run`

File:

```text
apps/web/app/api/v1/run/route.ts
```

Purpose:

- receive the demo form payload from the browser
- validate the input
- forward the request to the backend Node API
- convert backend failures into predictable frontend responses

### Request Shape

```json
{
  "input": "hello demo flow"
}
```

### Validation Rules

- body must be valid JSON
- `input` must be a string
- `input` cannot be empty
- `input` must contain at least 5 characters

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "run-1",
    "response": "Hello from the backend"
  }
}
```

### Controlled Error Responses

Invalid JSON:

```json
{
  "success": false,
  "error": "Invalid JSON body."
}
```

Input too short:

```json
{
  "success": false,
  "error": "Please enter at least 5 characters before sending the demo request."
}
```

Missing production backend URL:

```json
{
  "success": false,
  "error": "UNV_API_BASE_URL is required in production to connect the demo with the Node API.",
  "code": "BACKEND_URL_MISSING",
  "mode": "missing"
}
```

## 2. Demo Flow

The interactive demo page lives in:

```text
apps/web/app/demo/page.tsx
```

Execution flow:

```text
Browser
  -> /demo
  -> POST /api/v1/run
  -> Next.js route handler
  -> backend proxy helper
  -> Node API
  -> JSON response
  -> rendered UI state
```

### What Happens In The UI

1. The page checks backend status through `/api/health`
2. The user writes a message
3. The client validates the input
4. The form posts to `/api/v1/run`
5. The response is parsed and rendered in the result panel
6. Controlled failures are shown as user-safe error messages

## 3. Backend Routing

The Node API lives in:

```text
src/api/server.ts
```

The frontend proxy logic lives in:

```text
apps/web/lib/backend.ts
```

Behavior by environment:

- local development:
  - default backend is `http://127.0.0.1:3000`
  - `UNV_API_BASE_URL` is optional
- production:
  - `UNV_API_BASE_URL` is required for `/api/v1/run`
  - if missing, the route returns a controlled `503`

## 4. AI Flow

The AI service lives in:

```text
apps/web/services/ai.ts
```

The Next.js route lives in:

```text
apps/web/app/api/ai/run/route.ts
```

Supported tasks:

- `summary`
- `translation`
- `ideas`

Execution flow:

```text
Browser
  -> /demo or future AI UI
  -> POST /api/ai/run
  -> Next.js route handler
  -> apps/web/services/ai.ts
  -> OpenAI Responses API
  -> normalized result
  -> UI output
```

### Required Environment Variables

```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5-mini
```

### AI Request Example

```json
{
  "task": "summary",
  "text": "Long product text to summarize"
}
```

### AI Response Example

```json
{
  "task": "summary",
  "output": "Short high-signal summary",
  "model": "gpt-5-mini"
}
```

## 5. Visual Tree

```text
UNV-HMND
└─ apps/web
   ├─ landing
   ├─ portfolio
   ├─ demo
   │  └─ /api/v1/run
   │     └─ src/api/server.ts
   └─ /api/ai/run
      └─ OpenAI Responses API
```

## 6. Vercel Notes

For Vercel:

- set `Root Directory` to `apps/web`
- keep `Output Directory` default
- define `OPENAI_API_KEY`
- define `UNV_API_BASE_URL` if the demo should talk to an external Node API

Without `UNV_API_BASE_URL`, the production demo route cannot reach the external backend and will return a controlled error instead of crashing the UI.
