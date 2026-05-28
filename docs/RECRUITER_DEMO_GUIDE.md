# Recruiter Demo Guide

This guide explains how to present Humanity Guide OS without overstating capabilities.

## Quick Start

Recommended walkthrough:

1. Open `/`.
2. Explain the product in one sentence: a governed AI organization demo with explicit safety boundaries.
3. Open `/demo` to show the public multi-agent conversation flow.
4. Open `/personal` to show the owner-facing daily organization mode.
5. Open `/lab` to show the private governance and blueprint workspace.
6. Show the controlled read-only file metadata preview and the controlled email organization preview.
7. Close with `/about` or the README to explain architecture and roadmap.

Use `docs/DEMO_LAUNCH_CHECKLIST.md` before recordings, recruiter calls, and Vercel deployment reviews.

## What Exists Today

- Public `/demo` route.
- Owner-facing `/personal` route.
- Owner-gated `/lab` route.
- Mock organization simulation.
- Controlled read-only file metadata preview.
- Controlled email organization preview with a simulated inbox.
- Demo launch checklist for screenshots, walkthroughs, and deployment readiness.
- Proposal lifecycle metadata.
- Local approval states.
- In-memory audit events.
- Governance, memory, orchestration, adapter, sandbox, and observability blueprints.

## What Is Simulation-Only

- Organization analysis in `/lab`.
- File-like dataset shown in the UI.
- GENIO analysis cards.
- GENESIS reflection cards.
- Alignment validation cards.
- Before/after organization proposal.
- Time saved and clarity estimates.
- Email priority detection, category suggestions, and draft previews.
- Personal daily planning UI for documents, photos, email, and priorities.
- Personal dashboard visuals: daily operating status, chaos score, clarity score, focus score, organization zones, and smart manual checklist.

These are UI and metadata demonstrations. The email preview uses fake data and does not connect to Gmail or a real mailbox.

## Future Controlled Blueprints

- Real owner authentication.
- Persistent audit storage.
- Secure memory retrieval.
- Read-only file preview adapter.
- Controlled draft adapters.
- Controlled email draft adapters.
- Runtime sandbox.
- Company agents.
- SaaS admin dashboard.

These are not active runtime capabilities.

## Explicit Non-Capabilities

The project does not currently include:

- real filesystem access
- terminal execution
- host scanning
- Gmail integration
- real email sending, deletion, moving, labeling, replying, or forwarding
- DB persistence
- real auth
- background workers
- autonomous agents
- trading or banking integrations
- browser automation
- AGI, real consciousness, or human scoring

## Recording Notes

For a short video:

1. Start on the homepage hero.
2. Scroll through Recruiter Quick Start.
3. Show Current capabilities vs future blueprints.
4. Open `/demo` and send one safe prompt.
5. Open `/personal` and show the owner daily review surface, Visual Chaos Score, Organization Zones, and Smart Manual Checklist.
6. Open `/lab`, unlock with the local owner code, and show the organization simulation.
7. Show the email preview panel and point out `executionMode: email-preview-only`.
8. Point at `simulation-only`, `proposal-only`, `No real filesystem access`, `emailSendAccess: false`, and `actionExecuted: false`.

Keep the narration practical: product value, engineering quality, and governance discipline.

## Final Launch Validation

Before sharing the project publicly:

- run the four verification commands from the README
- open `/`, `/demo`, and `/lab`
- open `/personal` and confirm it is separate from `/lab`
- confirm mobile and desktop layouts remain readable
- confirm no critical console or hydration errors appear
- confirm no broken links in the top navigation
- confirm `/lab` still shows owner gate, safety indicators, read-only preview, and email preview
- confirm no `NEXT_PUBLIC_OWNER_ACCESS_CODE` is exposed
- confirm no real filesystem, terminal, Gmail, DB, auth, or autonomous execution is described as implemented
