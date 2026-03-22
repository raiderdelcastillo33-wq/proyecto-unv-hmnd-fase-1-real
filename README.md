# UNV-HMND

Frontend Next.js dans `apps/web` et API Node dans `src/api`.

## Stack

- Next.js
- React
- TypeScript
- Node.js
- Architecture modulaire

## Architecture

Browser -> Next.js (`apps/web`)
Next.js -> routes internes `/api/*`
API Node -> `http://127.0.0.1:3000`

## Lancer le projet en local

```bash
npm run dev
```

Frontend local:

```text
http://localhost:3001
```

API locale:

```text
http://localhost:3000
```

## Deployer le frontend sur Vercel

Le backend Node n'est pas deploye ici. En production, il faut definir `UNV_API_BASE_URL` avec l'URL publique reelle de l'API.

### 1. Verifier le frontend

```bash
cd apps/web
npm install
npm run build
npm run start
```

### 2. Configurer Vercel

- Root Directory: `apps/web`
- Framework Preset: `Next.js`
- Build Command: laisser la valeur par defaut (`next build`)
- Output Directory: laisser la valeur par defaut (`.next`)

### 3. Variable d'environnement

```bash
UNV_API_BASE_URL=https://your-node-api.example.com
```

Le fichier de reference est:

```text
apps/web/.env.example
```

### 4. Deploy via CLI

```bash
npm i -g vercel
vercel
vercel --prod
```

La commande de production renvoie une URL publique du type:

```text
https://tu-projet.vercel.app
```
