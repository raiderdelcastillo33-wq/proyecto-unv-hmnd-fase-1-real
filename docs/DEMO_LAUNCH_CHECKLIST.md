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
6. Open `/personal`.
7. Show the owner daily mode: premium hero, Daily Organization Dashboard, Visual Chaos Score, Organization Zones, Smart Manual Checklist, Today's Focus, and visible safety boundaries.
8. Open `/lab`.
9. Unlock with the local owner access code.
10. Show the organization simulation: GENIO analysis, GENESIS reflection, Alignment validation, and before/after proposal.
11. Show the controlled read-only preview: browser-selected metadata only, no write/delete/move.
12. Show the controlled email preview: fake inbox, preview-only labels, priority proposal, and draft suggestions.
13. Close on safety: proposal-only, approval-required, actionExecuted false.

## Visual Validation

Check these routes:

- `/`
- `/demo`
- `/personal`
- `/lab`

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

- Homepage hero with Project Highlights.
- `/demo` after a safe prompt response.
- `/personal` premium hero with daily operating status.
- `/personal` Daily Organization Dashboard and Visual Chaos Score.
- `/personal` Smart Manual Checklist, Organization Zones, and Today's Focus cards.
- `/lab` organization simulation top section.
- `/lab` before/after visualization.
- `/lab` controlled read-only preview guardrails.
- `/lab` controlled email preview safety indicators.
- `/lab` audit and governance metadata.

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
