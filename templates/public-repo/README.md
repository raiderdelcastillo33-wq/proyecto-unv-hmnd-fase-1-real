# UNV-HMND

Portfolio-ready public version of the UNV-HMND frontend, built with Next.js, React and TypeScript.

## Highlights

- Strong landing page with a clear product story
- Functional demo flow through internal Next.js API routes
- Technical architecture page
- Local visual portfolio assets
- CV page ready for presentation and hiring contexts

## Stack

- Next.js 15
- React 19
- TypeScript
- App Router
- Vercel deployment

## Routes

- `/` landing page
- `/demo` interactive demo
- `/about` technical architecture
- `/portfolio` visual presentation
- `/cv` CV and contact surface

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3001`.

## Environment

Create `.env.local` from `.env.example`:

```bash
UNV_API_BASE_URL=https://your-public-node-api.example.com
```

## Deployment

Deploy on Vercel with:

- Framework Preset: `Next.js`
- Root Directory: repository root
- Build Command: `npm run build`

## Notes

This public repository is a curated, portfolio-friendly mirror generated from a private working repository.
