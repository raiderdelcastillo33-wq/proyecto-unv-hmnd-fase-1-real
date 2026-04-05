import type { Metadata } from 'next'
import Link from 'next/link'
import DisqusComments from "../components/DisqusComments"

export const metadata: Metadata = {
  title: 'Raider del Castillo - Développeur Frontend & Intégration IA',
  description:
    'Portfolio professionnel de développeur frontend avec expertise en React, Next.js, TypeScript et intégration IA. Architecture modulaire, UX/UI moderne et solutions scalables.'
}

const systemSignals = [
  {
    kicker: 'Exécution Frontend',
    title: 'Architecture modulaire orientée produit',
    description: 'Système construit avec Next.js 15, TypeScript strict et séparation claire entre frontend, backend et services IA.'
  },
  {
    kicker: 'Qualité engineering',
    title: 'Intégration IA typée',
    description: 'Flux contrôlé Browser → Next.js → API interne → Services IA, avec gestion robuste des erreurs et des états de chargement.'
  },
  {
    kicker: 'Mentalité production',
    title: 'Prêt pour déploiement entreprise',
    description: 'Monorepo optimisé pour Vercel, avec routes API internes, validation de types et stratégies de fallback en production.'
  }
]

const stackHighlights = [
  'Next.js 15 App Router',
  'React 19 + TypeScript',
  'Architecture modulaire',
  'Intégration IA',
  'API REST typée',
  'Monorepo scalable'
]

const walkthrough = [
  {
    step: '01',
    title: 'Explore le portfolio professionnel',
    description: 'Découvrez mon expérience en développement frontend moderne, intégration IA et construction de produits scalables.'
  },
  {
    step: '02',
    title: 'Interagissez avec la démo fonctionnelle',
    description: 'Testez le système IA en temps réel : envoyez des messages et observez le flux complet Browser → API → IA.'
  },
  {
    step: '03',
    title: 'Revoyez l’architecture technique',
    description: 'Comprenez les décisions techniques, les patterns de conception et les stratégies de déploiement appliquées.'
  }
]

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy hero-copy--stacked">
          <span className="hero-badge">Portefeuille professionnel - Développeur Frontend</span>
          <h1>Système d’agents IA</h1>
          <p>
            UNV-HMND est une application Next.js niveau production démontrant une pensée produit,
            une orchestration d’APIs internes et une exécution frontend prête pour la production.
          </p>

          <div className="tag-row">
            {stackHighlights.map((item) => (
              <span className="tech-pill" key={item}>
                {item}
              </span>
            ))}
          </div>

          <div className="hero-actions">
            <Link className="primary-button" href="/demo">
              Tester la démo interactive
            </Link>
            <Link className="secondary-button" href="/about">
              Voir l’architecture
            </Link>
            <Link className="secondary-button" href="/portfolio">
              Explorer le portfolio
            </Link>
            <Link className="secondary-button" href="/gallery">
              Voir la galerie
            </Link>
            <Link className="secondary-button" href="/download">
              Télécharger le CV
            </Link>
          </div>
        </div>

        <aside className="hero-card hero-card--spotlight">
          <p className="result-eyebrow">Ce que ce projet démontre</p>
          <h2>Browser → Next.js → API interne → Services IA</h2>
          <p className="meta-text">
            L’expérience est construite pour communiquer comment un ingénieur frontend raisonne sur l’UX produit,
            les limites serveur typées, le déploiement en production et les flux orientés IA.
          </p>

          <div className="metrics-grid">
            <article className="metric-card">
              <strong className="metric-value">Démo fonctionnelle</strong>
              <span className="metric-label">Flux complet requête/réponse</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">Stack typée</strong>
              <span className="metric-label">TypeScript strict en UI et routes</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">UI déployable</strong>
              <span className="metric-label">Configuration monorepo prête pour Vercel</span>
            </article>
            <article className="metric-card">
              <strong className="metric-value">Histoire système claire</strong>
              <span className="metric-label">Facile à expliquer en entretiens techniques</span>
            </article>
          </div>
        </aside>
      </section>

      <section className="section-block">
        <div className="section-head">
          <p className="result-eyebrow">Signaux de recrutement</p>
          <h2 className="section-title">Ce qu’un recruteur ou un manager tech peut comprendre rapidement</h2>
          <p>
            L’objectif n’est pas seulement d’avoir un rendu soigné. L’objectif est de rendre visible le jugement technique
            dès le premier scroll : structure, intention, fiabilité et clarté du système.
          </p>
        </div>

        <div className="signal-grid">
          {systemSignals.map((item) => (
            <article className="signal-card" key={item.title}>
              <span className="signal-kicker">{item.kicker}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-head">
          <p className="result-eyebrow">Parcours</p>
          <h2 className="section-title">Une histoire produit courte avec un payoff technique clair</h2>
          <p>
            Chaque page a une mission : orienter le visiteur, prouver que la démo fonctionne, et rendre l’architecture
            plus facile à faire confiance.
          </p>
        </div>

        <div className="timeline-grid">
          {walkthrough.map((item) => (
            <article className="timeline-card" key={item.step}>
              <span className="step-index">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block">
        <article className="story-card">
          <div>
            <p className="result-eyebrow">Prochaine étape</p>
            <h2 className="section-title">Allez directement à la partie qui prouve que le système fonctionne</h2>
            <p>
              Ouvrez la démo pour valider le flux d’exécution, puis utilisez la page d’architecture pour examiner
              les décisions techniques.
            </p>
          </div>

          <div className="story-card__actions">
            <Link className="primary-button" href="/demo">
              Exécuter démo
            </Link>
            <Link className="secondary-button" href="/about">
              Lire l’architecture
            </Link>   
          </div>
          <div style={{ marginTop: "40px", borderTop: "1px solid #333", paddingTop: "30px" }}>
           {typeof window !== "undefined" && (
  <DisqusComments url="https://TU-DOMINIO.vercel.app" identifier="home-page" />
)}
</div>
        </article>
      </section>
    </main>
  )
}
