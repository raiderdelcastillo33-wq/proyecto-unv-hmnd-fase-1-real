# Public Repo Workflow

## Goal

Maintain two repositories:

- Private repo: full working environment
- Public repo: clean, portfolio-ready frontend version

## Public export command

From the private repo root:

```bash
./scripts/sync-public-repo.sh "/absolute/path/to/UNV-HMND-public"
```

If you omit the path, the export is generated in:

```bash
.public-repo
```

## Private push

```bash
git add .
git commit -m "feat: update private workspace"
git push origin main
```

## Public selective push

The export script already filters the content. After running it:

```bash
cd "/absolute/path/to/UNV-HMND-public"
npm install
git add .
git commit -m "sync: refresh public portfolio"
git push origin main
```

## What goes to the public repo

- `app`
- `lib`
- `public`
- `next.config.mjs`
- `tsconfig.json`
- `next-env.d.ts`
- `.env.example`
- public `package.json`
- professional `README.md`

## What stays private

- backend source
- internal tests
- compiled artifacts
- local Vercel state
- workspace-only scripts and duplicated legacy files
