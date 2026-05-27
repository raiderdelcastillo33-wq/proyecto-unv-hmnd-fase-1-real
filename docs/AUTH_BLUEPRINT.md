# Real Owner Auth Blueprint

This document defines the future authentication and authorization architecture for the Private AI Lab.

This phase is metadata-only. It does not implement login, registration, persistent sessions, cookies, JWT, OAuth, Supabase, Clerk, NextAuth, password storage, email verification, database storage, or multi-tenant SaaS access.

## Current Auth Mode

Current mode:

```text
OWNER_ACCESS_CODE
```

`OWNER_ACCESS_CODE` is a temporary server-side gate for `/lab`.

It is useful for local/private control during the blueprint phase, but it is not real authentication.

Boundaries:

- no real user identity
- no persistent session
- no per-user audit attribution
- no revocation system
- no role-based access control runtime
- no SaaS user model
- no client-side exposure
- no `NEXT_PUBLIC_OWNER_ACCESS_CODE`

## Future Roles

Prepared future roles:

- `owner`: final human authority and primary approver
- `admin`: future administrative role for policies, users, and dashboards
- `operator`: future delegated proposal workflow role
- `guest`: future limited access role for public or invited surfaces

Only the current owner gate exists today. The other roles are blueprint metadata.

## Protected Surfaces

Prepared protected surfaces:

- `/lab`
- future `/admin`
- future `/company`
- future adapters
- future audit dashboard
- future memory dashboard

## Permission Model

Prepared permissions:

- `view_lab`
- `use_demo`
- `request_tool_proposal`
- `approve_proposal`
- `reject_proposal`
- `view_audit`
- `manage_agents`
- `manage_tools`
- `manage_users`
- `manage_company`
- `configure_adapters`
- `execute_controlled_action_future`

`execute_controlled_action_future` is future-only, high-risk, approval-required, and not implemented.

## Session Policy

Current session status:

```text
not-implemented
```

Future production sessions require:

- server-side authentication
- secure httpOnly cookies
- session expiration
- CSRF/session hardening
- revocation support
- audit linked to `userId`
- least-privilege permission checks

## Security Risks To Resolve

Known current risks:

- secret exposure if environment variables are misconfigured
- client-side auth assumptions
- missing persistent sessions
- shared access code
- no identity attribution
- no per-user audit
- no revocation system

These are documented constraints, not accepted production properties.

## Auth Roadmap

1. OWNER_ACCESS_CODE temporary gate
2. Real Owner Auth
3. Persistent Sessions
4. Role-Based Access Control
5. Persistent Audit per User
6. Admin Dashboard
7. Company/Multi-tenant Access
8. Controlled Execution Permissions

## GENIO Governance Compatibility

GENIO may observe and classify future auth metadata, but it cannot bypass the owner.

Future auth must remain:

- audit-first
- owner-controlled
- role-scoped
- permission-scoped
- reversible where possible
- explicit about risk

`Proposal != Execution` and `Approve != Execute` remain active.
