# Production Testing Guide

This guide explains how to test UNV-HMND locally and after Vercel deployment.

The current system is a controlled Private AI Lab blueprint. Testing should verify that the app works and that dangerous capabilities remain unavailable.

## 1. Automated Verification

Run from the repository root:

```bash
npm --prefix apps/web run build
npm --prefix apps/web run test
npm run build:api
npm test
```

Also inspect git state:

```bash
git status --short
git log --oneline -5
```

Expected:

- frontend build passes
- web tests pass
- backend TypeScript build passes
- root/domain tests pass
- worktree contains only intended changes

## 2. Local Browser Testing

Start the app:

```bash
npm run dev
```

Open:

```text
http://localhost:3001
http://localhost:3001/demo
http://localhost:3001/lab
```

### `/`

Check:

- page loads
- navigation works
- no critical console errors

### `/demo`

Check visually:

- page loads without errors
- agent selector appears
- prompt input validates short messages
- valid message sends to `/api/v1/run`
- fallback response is safe if backend is not configured
- local history updates
- typing simulation appears
- no secrets or internal prompts appear

DevTools Network:

- verify `POST /api/v1/run`
- response should be safe and bounded
- no `systemInstructions`
- no secrets

### `/lab`

Check before unlock:

- owner access screen appears
- missing code is rejected
- wrong code is rejected

Check after valid `OWNER_ACCESS_CODE`:

- GENIO Central is visible
- agent catalog is visible
- tool catalog is visible
- memory blueprint is visible
- orchestration blueprint is visible
- adapter blueprint is visible
- generated proposal renders `ToolResult`
- approval metadata is visible
- audit events are visible
- approve/reject buttons change state only
- no real command, filesystem, email, finance, adapter, workflow, or OS action occurs

DevTools Network:

- `POST /api/lab/catalog`
- `POST /api/lab/tool`

Responses should not expose:

- secrets
- `systemInstructions`
- `systemPrompt`
- raw environment variables

## 3. Vercel Testing

Open the deployed URL:

```text
https://your-vercel-domain.example
https://your-vercel-domain.example/demo
https://your-vercel-domain.example/lab
```

Vercel environment checks:

- `UNV_API_BASE_URL` optional for demo fallback
- `OPENAI_API_KEY` optional depending on desired AI mode
- `OWNER_ACCESS_CODE` required for `/lab`
- never define `NEXT_PUBLIC_OWNER_ACCESS_CODE`

Validate:

- `/` loads
- `/demo` works with fallback or configured backend
- `/lab` remains locked without correct owner code
- `/lab` unlocks only when server-side owner code matches
- Console has no critical runtime errors
- Network responses do not leak secrets

## 4. What Good Looks Like

A phase is OK when:

- automated commands pass
- `/demo` works locally
- `/lab` works locally with owner code
- Vercel deploy succeeds
- `/demo` works in production
- `/lab` is protected in production
- approval buttons do not execute anything
- adapter blueprint remains metadata-only
- no secrets are exposed
- no internal prompts are exposed
- no real execution path exists

## 5. Evidence To Save Before Continuing

Before starting a new risky phase, save:

- command results
- `git status --short`
- latest commit hash
- Vercel deployment URL
- screenshot or note confirming `/demo` OK
- screenshot or note confirming `/lab` OK
- note confirming Console OK
- note confirming Network OK
- note confirming no secrets exposed

## 6. Red Flags

Stop and fix before continuing if:

- build fails
- tests fail
- `/lab` unlocks without owner code
- `/api/lab/catalog` exposes system prompts
- `/api/lab/tool` implies action execution
- adapter metadata claims real execution
- console shows critical runtime errors
- Network reveals secrets
- any code imports real execution modules for adapters

## 7. Current Non-Execution Guarantee

The current architecture must remain:

- proposal-only
- simulation-only
- audit-first
- owner-controlled

Current phase should not include:

- auth runtime
- DB runtime
- terminal execution
- filesystem access
- Gmail integration
- finance execution
- workers
- queues
- autonomous agents
- external execution adapters
