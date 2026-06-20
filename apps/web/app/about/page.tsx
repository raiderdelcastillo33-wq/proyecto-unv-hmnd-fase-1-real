import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UNV-HMND & Humanity Guide OS - Architecture Governance-First',
  description:
    'Présentation de l’architecture UNV-HMND et Humanity Guide OS : documentation-first, governance-first et proposal-only.'
}

const principles = [
  {
    title: 'Architecture centrée sur l’humain',
    description:
      'La technologie soutient la compréhension et la décision humaine sans remplacer la responsabilité, le jugement ou l’approbation.'
  },
  {
    title: 'Documentation avant complexité',
    description:
      'Les principes, relations, limites et étapes d’évolution sont documentés avant l’ajout de capacités techniques supplémentaires.'
  },
  {
    title: 'Proposal != Execution',
    description:
      'Les sorties restent des propositions ou des simulations. Une approbation humaine ne déclenche jamais implicitement une exécution.'
  },
  {
    title: 'Présent séparé du futur',
    description:
      'La démo et l’architecture actuelles sont distinguées des idées futures comme la mémoire, les agents connectés ou la production.'
  },
  {
    title: 'Limites explicites',
    description:
      'Aucune revendication d’AGI, de conscience artificielle ou d’exécution autonome : le système reste contrôlé et proposal-only.'
  }
]

const stack = [
  'Next.js 15',
  'React 19',
  'TypeScript strict',
  'App Router',
  'Routes serveur internes',
  'Setup monorepo prêt pour Vercel'
]

const delivery = [
  'Architecture UNV-HMND documentée',
  'Humanity Guide OS présenté comme couche produit',
  'Démo contrôlée via `/demo`',
  'Séparation explicite entre présent et futur',
  'Gouvernance et limites visibles',
  'Documentation cohérente avec une approche proposal-only'
]

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="status-pill status-pill--success">Résumé Technique</span>
        <h1>Architecture UNV-HMND</h1>
        <p>
          UNV-HMND et Humanity Guide OS ne constituent pas seulement une démo frontend. Ils décrivent une
          architecture de produit IA responsable, documentée, governance-first, documentation-first et limitée à
          la simulation et aux propositions, avec approbation humaine obligatoire.
        </p>
      </section>

      <section className="grid-3">
        {principles.map((item) => (
          <article className="info-card" key={item.title}>
            <p className="result-eyebrow">Principe</p>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="workspace">
        <article className="panel">
          <div className="panel-heading">
            <p className="result-eyebrow">Flux d’exécution</p>
            <h2>Navigateur → Next.js → Proxy API</h2>
            <p>
              La structure technique prévoit que les interactions passent par les routes serveur de Next.js avant un
              éventuel backend externe. Cette organisation constitue une architecture de démonstration ; elle
              n’implique ni agents autonomes, ni mémoire persistante, ni base de données ou authentification réelles.
            </p>
          </div>

          <div className="response-meta">
            <span className="info-chip">UI publique</span>
            <span className="info-chip">Routage interne</span>
            <span className="info-chip">Prêt pour Vercel</span>
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <p className="result-eyebrow">Stack</p>
            <h2>Technos</h2>
          </div>

          <ul className="bullet-list bullet-list--dense">
            {stack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="workspace">
        <article className="panel">
          <div className="panel-heading">
            <p className="result-eyebrow">Livrables publics</p>
            <h2>État actuel du projet</h2>
          </div>

          <ul className="bullet-list bullet-list--dense">
            {delivery.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <p className="result-eyebrow">Déploiement</p>
            <h2>Chemin de déploiement</h2>
            <p>
              Le monorepo est configuré pour permettre le déploiement du frontend sur Vercel avec `apps/web` comme
              racine de projet. `UNV_API_BASE_URL` reste optionnel et ne signifie pas qu’un backend de production,
              une mémoire, une base de données ou une authentification réels sont actuellement disponibles.
            </p>
          </div>

          <div className="response-meta">
            <span className="info-chip">Répertoire racine : apps/web</span>
            <span className="info-chip">Build : next build</span>
          </div>
        </article>
      </section>
    </main>
  )
}
