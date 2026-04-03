import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Architecture Technique - Portfolio Développeur Frontend',
  description: 'Résumé technique de l’architecture du Système d’Agents IA, décisions de delivery et stratégie de déploiement.'
}

const principles = [
  {
    title: 'App Router comme base',
    description: 'Pages, layouts et routes serveur sont organisés dans une structure Next.js moderne et lisible qui évolue avec le projet.'
  },
  {
    title: 'Proxy d’API interne',
    description: 'Le navigateur communique d’abord avec Next.js ; Next retransmet les requêtes vers le backend via des routes internes.'
  },
  {
    title: 'Chemin de déploiement monorepo',
    description: 'Le frontend réside dans `apps/web`, avec un pipeline de build sécurisé en production et une config Vercel-friendly.'
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
  'Page d’accueil avec narration claire pour recrutement',
  'Démo fonctionnelle via `/demo`',
  'Actifs visuels du portfolio',
  'Surface de présentation du CV',
  'Documentation prête à déployer',
  'Repo public propre pour export'
]

export default function AboutPage() {
  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="status-pill status-pill--success">Résumé Technique</span>
        <h1>Architecture du Système</h1>
        <p>
          UNV-HMND est structuré pour démontrer une exécution frontend soignée, une intégration backend réaliste
          et un chemin de déploiement propre dans une configuration monorepo.
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
            <h2>Browser → Next.js → API Node</h2>
            <p>
              Le frontend ne dépend pas d’appels directs du navigateur vers le service backend. Les pages interactives
              passent par des routes serveur Next.js, ce qui rend le système plus robuste, déployable et publicisable.
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
            <h2>Version pour recruteur</h2>
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
            <h2>Production</h2>
            <p>
              Le frontend est prêt à être déployé sur Vercel avec `apps/web` comme racine de projet. `UNV_API_BASE_URL`
              est optionnel et sert uniquement si vous pointez l’app vers un backend externe.
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
