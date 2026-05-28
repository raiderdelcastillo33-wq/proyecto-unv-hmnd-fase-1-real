# Recruiter Demo Guide

This guide explains how to present Humanity Guide OS without overstating capabilities.

## Quick Start

Recommended walkthrough:

1. Open `/`.
2. Explain the product in one sentence: a governed AI organization demo with explicit safety boundaries.
3. Open `/demo` to show the public multi-agent conversation flow.
4. Open `/lab` to show the private simulation-only organization walkthrough.
5. Show the controlled read-only file metadata preview and the controlled email organization preview.
6. Close with `/about` or the README to explain architecture and roadmap.

## What Exists Today

- Public `/demo` route.
- Owner-gated `/lab` route.
- Mock organization simulation.
- Controlled read-only file metadata preview.
- Controlled email organization preview with a simulated inbox.
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
5. Open `/lab`, unlock with the local owner code, and show the organization simulation.
6. Show the email preview panel and point out `executionMode: email-preview-only`.
7. Point at `simulation-only`, `proposal-only`, `No real filesystem access`, `emailSendAccess: false`, and `actionExecuted: false`.

Keep the narration practical: product value, engineering quality, and governance discipline.
