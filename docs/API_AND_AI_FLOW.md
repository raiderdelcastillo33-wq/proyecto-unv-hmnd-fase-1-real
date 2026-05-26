# API And AI Flow

This document explains the main execution paths in UNV-HMND:

- `Demo flow`: Browser -> Next.js -> `/api/v1/run` -> Node API
- `Backend AI flow`: Node API -> `AIController` -> `AskAIAssistantUseCase` -> `AIProvider`
- `Next.js AI flow`: Browser -> Next.js -> `/api/ai/run` -> OpenAI

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

## 4. Backend AI Flow

The backend AI contract lives in:

```text
src/domain/services/AIProvider.ts
```

The current provider implementations live in:

```text
src/infrastructure/ai/MockAIProvider.ts
src/infrastructure/ai/OpenAIProvider.ts
src/infrastructure/ai/FallbackAIProvider.ts
```

The use case and controller live in:

```text
src/application/use-cases/AskAIAssistantUseCase.ts
src/interfaces/http/controllers/AIController.ts
```

Execution flow:

```text
Node API
  -> ApiV1Router
  -> AIController
  -> AskAIAssistantUseCase
  -> AIProvider.generate()
  -> AIInteractionRepository
  -> ApiResponse
```

### Provider Strategy

The backend keeps AI access behind the `AIProvider` interface.

- `MockAIProvider`: deterministic local/demo provider used when real AI is not configured.
- `OpenAIProvider`: server-side provider that calls OpenAI when `OPENAI_API_KEY` is available.
- `FallbackAIProvider`: wraps the real provider and falls back to `MockAIProvider` if OpenAI fails, times out, or returns an invalid response.

This keeps the backend stable in local development, tests, and production demos.

### Environment Behavior

Without `OPENAI_API_KEY`:

```text
ApplicationContainer
  -> MockAIProvider
```

With `OPENAI_API_KEY`:

```text
ApplicationContainer
  -> FallbackAIProvider
     ├─ OpenAIProvider
     └─ MockAIProvider
```

`OPENAI_API_KEY` is optional for stability. It is required only when the backend should generate real OpenAI responses.

`OPENAI_MODEL` is optional. If omitted, the backend provider uses its default model.

### Backend AI Routes

The backend exposes AI through existing API v1 routes:

```text
POST /api/v1/run
POST /api/v1/ai/ask
```

`/api/v1/run` is the demo-safe route used by the frontend proxy.

`/api/v1/ai/ask` supports the domain-level AI request shape:

```json
{
  "userId": "user-1",
  "feature": "assistant",
  "prompt": "Help me create a TypeScript learning plan",
  "context": "Optional extra context"
}
```

Supported backend features:

- `assistant`
- `prompt-improver`
- `code-feedback`

### Cost And Risk Notes

- Real OpenAI usage may create API costs.
- The API key must remain server-side only.
- The fallback provider protects the product experience from upstream outages.
- The current implementation favors stability over surfacing raw provider errors to users.
- Future phases should add structured logging, cost tracking, and rate limiting before broad public usage.

## 5. Next.js AI Flow

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
  -> OpenAI Chat Completions API
  -> normalized result
  -> UI output
```

### Current API Note

The current implementation uses OpenAI Chat Completions API:

```text
https://api.openai.com/v1/chat/completions
```

The architecture keeps AI access behind provider/service boundaries so the project can migrate to OpenAI Responses API later without changing user-facing routes.

### Environment Variables

```bash
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-5-mini
```

For `/api/ai/run`, `OPENAI_API_KEY` is required because that route currently calls OpenAI directly from the Next.js server layer.

For backend `/api/v1/run` and `/api/v1/ai/ask`, `OPENAI_API_KEY` is optional because the backend has a mock fallback path.

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

## 6. Visual Tree

```text
UNV-HMND
├─ apps/web
│  ├─ landing
│  ├─ portfolio
│  ├─ demo
│  │  └─ /api/v1/run
│  │     └─ src/api/server.ts
│  └─ /api/ai/run
│     └─ OpenAI Chat Completions API
└─ src
   └─ API v1
      ├─ /api/v1/run
      ├─ /api/v1/ai/ask
      └─ AIProvider
         ├─ OpenAIProvider
         ├─ MockAIProvider
         └─ FallbackAIProvider
```

## 7. Vercel Notes

For Vercel:

- set `Root Directory` to `apps/web`
- keep `Output Directory` default
- define `OPENAI_API_KEY` if `/api/ai/run` should call OpenAI directly
- define `UNV_API_BASE_URL` if the demo should talk to an external Node API
- define `OPENAI_API_KEY` in the external Node API environment if backend `/api/v1/ai/ask` should use real OpenAI responses

Without `UNV_API_BASE_URL`, the production demo route cannot reach the external backend and will return a controlled error instead of crashing the UI.

Without `OPENAI_API_KEY`, backend AI routes can still operate through `MockAIProvider`. This is intentional for local development, demos, and safe fallback behavior.
