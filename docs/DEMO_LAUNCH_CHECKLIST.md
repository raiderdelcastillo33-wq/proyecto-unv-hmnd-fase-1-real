# Humanity Guide OS Demo Launch Checklist

This checklist prepares Humanity Guide OS for public portfolio demos, recruiter walkthroughs, screenshots, and Vercel deployment review.

## Demo Positioning

One-sentence explanation:

```text
Humanity Guide OS is a governed AI organization demo that shows how simulated digital chaos can become reviewable proposals without unsafe execution.
```

What to emphasize:

- product clarity
- responsible AI UX
- Next.js production discipline
- typed frontend/backend boundaries
- governance-first architecture
- visible safety constraints
- recruiter-friendly walkthrough

What to avoid:

- AGI claims
- real consciousness claims
- magical prediction language
- surveillance framing
- autonomous execution promises
- claims of real Gmail, terminal, filesystem, or host control

## Two-Minute Walkthrough

1. Open `/`.
2. Explain the product promise: reduce simulated digital chaos with governed AI proposals.
3. Point out the distinction between current capabilities and future blueprints.
4. Open `/demo`.
5. Show the public multi-agent interaction and safe fallback behavior.
6. Open `/lab`.
7. Unlock with the local owner access code.
8. Show the organization simulation: GENIO analysis, GENESIS reflection, Alignment validation, and before/after proposal.
9. Show the controlled read-only preview: browser-selected metadata only, no write/delete/move.
10. Show the controlled email preview: fake inbox, preview-only labels, priority proposal, and draft suggestions.
11. Open `/personal`.
12. Show the owner daily mode: premium hero, Daily Organization Dashboard, Visual Chaos Score, Organization Zones, Smart Manual Checklist, Today's Focus, and visible safety boundaries.
13. Close on safety: proposal-only, approval-required, manual execution only, actionExecuted false.

## Visual Validation

Check these routes:

- `/`
- `/demo`
- `/lab`
- `/personal`

Verify:

- spacing is calm and consistent
- cards do not overlap
- navigation is visible and coherent
- text remains readable on desktop, tablet, and mobile
- CTA hierarchy is clear
- focus states are visible
- loading and empty states are understandable
- screenshot framing looks professional

## Safety Validation

Visible messages should confirm:

- no terminal runtime
- no filesystem runtime
- no Gmail API
- no real email actions
- no host scanning
- no delete, move, rename, write, send, reply, or forward
- no background agents
- no autonomous execution

Visible operating modes:

- `proposal-only`
- `preview-only`
- `read-only`
- `approval-required`
- `actionExecuted: false`

## Recruiter Talking Points

- The app demonstrates product thinking, not only UI polish.
- The architecture separates public demo, private lab, governance, approvals, audit, and future blueprints.
- Sensitive capabilities are deliberately blocked or simulated.
- The project shows production habits: TypeScript, App Router, tests, build checks, sitemap, manifest, and deployment-aware metadata.
- GENIO is governance metadata, not a claim of AGI.
- GENESIS is a reflection layer, not consciousness.

## Screenshot Suggestions

Official screenshot set:

1. Homepage recruiter presentation layer and governance contract.
2. `/demo` with one safe prompt response.
3. `/lab` organization simulation and safety indicators.
4. `/lab` controlled preview or email preview guardrails.
5. `/personal` daily owner surface and manual checklist.

Additional capture options:

- Homepage hero with Project Highlights.
- `/demo` after a safe prompt response.
- `/lab` organization simulation top section.
- `/lab` before/after visualization.
- `/lab` controlled read-only preview guardrails.
- `/lab` controlled email preview safety indicators.
- `/lab` audit and governance metadata.
- `/personal` premium hero with daily operating status.
- `/personal` Daily Organization Dashboard and Visual Chaos Score.
- `/personal` Smart Manual Checklist, Organization Zones, and Today's Focus cards.

## Official Screenshot Capture Guide

Recommended capture setup:

- Viewport: 1440 x 1200 for desktop screenshots.
- Secondary viewport: 390 x 844 for mobile sanity checks.
- Browser zoom: 100%.
- Theme: keep dark mode consistent.
- Console: clear before each capture and confirm no critical errors.

Capture order:

1. `/` homepage hero, governance contract, and recruiter presentation sections.
2. `/demo` after one safe prompt response.
3. `/lab` organization simulation top section.
4. `/lab` controlled read-only or controlled email preview guardrails.
5. `/personal` daily owner surface and manual checklist.

Naming convention:

```text
01-home-governance-contract.png
02-demo-safe-response.png
03-lab-governance-simulation.png
04-lab-preview-guardrails.png
05-personal-owner-dashboard.png
```

Before exporting screenshots:

- avoid broken placeholders
- avoid loading spinners
- keep the top navigation visible when useful
- confirm text does not overlap on desktop or mobile
- confirm safety chips remain visible where relevant
- do not capture secrets, local owner codes, tokens, or private environment values

## Deployment Readiness

Before deploying or recording:

```bash
npm --prefix apps/web run build
npm --prefix apps/web run test
npm run build:api
npm test
git status --short
```

Then verify:

- metadata and OpenGraph are coherent
- manifest loads
- sitemap contains `/`, `/demo`, `/personal`, and `/lab`
- icon renders
- no broken public routes
- no critical console errors
- no hydration warnings
- no secret is exposed as `NEXT_PUBLIC_OWNER_ACCESS_CODE`

## Portfolio Deployment Readiness

Final checklist before sharing the public URL:

- production build passes: `npm --prefix apps/web run build`
- web tests pass: `npm --prefix apps/web run test`
- API build passes: `npm run build:api`
- backend/domain tests pass: `npm test`
- Vercel project is linked to the correct repository
- Vercel root directory is set to `apps/web`
- main public routes are verified:
  - `/`
  - `/demo`
  - `/lab`
  - `/personal`
- official screenshots are captured and named consistently
- README is updated with the official recruiter walkthrough
- `docs/RECRUITER_DEMO_SCRIPT.md` is ready for a 3-5 minute demo
- no AGI, real runtime, autonomous execution, Gmail, filesystem execution, worker, DB/auth runtime, or OS-control claims appear in public copy
- final deployed URL has been tested in a clean browser profile or private window

## Before Sharing With Recruiters

Run this final human review:

- review the homepage hero and first-screen governance contract
- review CTAs: `Try public demo`, `Explore governance lab`, `View personal organizer`
- open DevTools and confirm there are no critical console errors
- check a basic mobile viewport for readable text and non-overlapping cards
- review README as it appears on GitHub
- rehearse the 3-5 minute script in `docs/RECRUITER_DEMO_SCRIPT.md`
- confirm screenshots do not show broken placeholders, secrets, owner codes, or loading states
- confirm the demo language stays recruiter-safe: proposal-only, preview-only, blueprint-only, and no real execution

## Launch Gate

The demo is ready when:

- `/` explains the product in under one minute
- `/demo` works without unsafe claims
- `/personal` shows a daily owner-facing organization mode without automation
- `/personal` explains that the owner executes manually outside the app
- `/lab` communicates value and safety in under two minutes
- current capabilities and future blueprints are clearly separated
- all verification commands pass
- no real runtime, filesystem, terminal, Gmail, DB, auth, or autonomous execution has been introduced
