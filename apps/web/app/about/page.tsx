import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Architecture Humanity Guide OS & UNV-HMND',
  description:
    'Architecture human-centered, documentation-first, governance-first et proposal-only de Humanity Guide OS.'
}

const principles = [
  {
    title: 'Human-centered',
    description: 'La technologie aide à comprendre, organiser et décider sans remplacer la responsabilité humaine.'
  },
  {
    title: 'Governance-first',
    description: 'Les risques, permissions et limites sont pensés avant toute capacité sensible.'
  },
  {
    title: 'Documentation-first',
    description: 'Les intentions, relations et frontières sont écrites avant d’ajouter de la complexité.'
  },
  {
    title: 'Proposal-only',
    description: 'Une sortie décrit une option ou un plan contrôlé. Proposal != Execution.'
  }
]

const presentAndFuture = [
  {
    title: 'Présent',
    items: [
      'Frontend Next.js et TypeScript',
      'Démo conversationnelle publique',
      'Private Lab en simulation',
      'Personal Life OS en aperçu',
      'Métadonnées de gouvernance et audit en mémoire',
      'Architecture et documentation visibles'
    ]
  },
  {
    title: 'Futur contrôlé',
    items: [
      'Authentification réelle',
      'Persistance des audits',
      'Mémoire sûre et limitée',
      'Adaptateurs externes en lecture seule',
      'Planification réelle',
      'Outils communautaires et d’apprentissage'
    ]
  }
]

const stack = [
  'Next.js 15',
  'React 19',
  'TypeScript strict',
  'App Router',
  'Routes serveur internes',
  'Monorepo orienté déploiement'
]

const nonGoals = [
  'Pas d’AGI',
  'Pas d’agents autonomes',
  'Pas de mémoire totale réelle',
  'Pas d’exécution terminal',
  'Pas d’accès filesystem',
  'Pas de backend multiutilisateur réel',
  'Pas d’automatisation en arrière-plan'
]

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy hero-copy--stacked">
          <span className="hero-badge">Humanity Guide OS · UNV-HMND</span>
          <h1>Une architecture responsable avant d’être puissante</h1>
          <p>
            Humanity Guide OS organise une vision produit human-centered autour d’une architecture documentée,
            governance-first et limitée aux propositions et simulations contrôlées.
          </p>

          <div className="tag-row">
            <span className="tech-pill">Human-centered</span>
            <span className="tech-pill">Governance-first</span>
            <span className="tech-pill">Documentation-first</span>
            <span className="tech-pill">Proposal-only</span>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">Frontière centrale</p>
          <h2>Comprendre {'->'} Proposer {'->'} Décision humaine</h2>
          <p className="meta-text">
            L’approbation reste une décision visible. Elle ne déclenche pas automatiquement un runtime, un agent,
            un worker ou une action externe.
          </p>
          <div className="response-meta">
            <span className="info-chip">Simulation-only</span>
            <span className="info-chip">Human approval</span>
            <span className="info-chip">Action executed: false</span>
          </div>
        </aside>
      </section>

      <section className="section-block" aria-labelledby="principles-heading">
        <div className="section-head">
          <p className="result-eyebrow">Principes</p>
          <h2 className="section-title" id="principles-heading">Des règles simples pour une évolution maîtrisée</h2>
        </div>

        <div className="showcase-grid">
          {principles.map((principle) => (
            <article className="showcase-card" key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block" aria-labelledby="scope-heading">
        <div className="section-head">
          <p className="result-eyebrow">Present vs Future</p>
          <h2 className="section-title" id="scope-heading">Ce qui existe et ce qui reste blueprint</h2>
          <p>Le futur décrit une direction possible, jamais une capacité déjà disponible.</p>
        </div>

        <div className="capability-split">
          {presentAndFuture.map((group) => (
            <article className="capability-column" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="workspace">
        <article className="panel">
          <div className="panel-heading">
            <p className="result-eyebrow">Flux technique</p>
            <h2>Navigateur → Next.js → API contrôlée</h2>
            <p>
              Les interactions passent par les routes serveur de Next.js avant un éventuel service externe. Un
              fallback sûr maintient la démonstration sans transformer l’interface en système autonome.
            </p>
          </div>
          <div className="response-meta">
            <span className="info-chip">UI publique</span>
            <span className="info-chip">Routage interne</span>
            <span className="info-chip">Fallback contrôlé</span>
          </div>
        </article>

        <article className="panel">
          <div className="panel-heading">
            <p className="result-eyebrow">Stack actuelle</p>
            <h2>Fondations techniques</h2>
          </div>
          <ul className="bullet-list bullet-list--dense">
            {stack.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </article>
      </section>

      <section className="section-block personal-safety" aria-labelledby="non-goals-heading">
        <div className="section-head">
          <p className="result-eyebrow">Non-goals</p>
          <h2 className="section-title" id="non-goals-heading">Ce que le projet ne prétend pas être</h2>
          <p>Ces limites protègent la clarté du produit et la crédibilité de son évolution.</p>
        </div>
        <div className="tag-row">
          {nonGoals.map((item) => <span className="tech-pill" key={item}>{item}</span>)}
        </div>
      </section>
    </main>
  )
}
