import Image from 'next/image'

const portfolioHighlights = [
  {
    kicker: 'Communication visuelle',
    title: 'Diagrammes systèmes soutenant la proposition',
    description: 'Les éléments du portfolio ne sont pas décoratifs : ils expliquent le flux des requêtes, l’intention UI et la structure modulaire du système.'
  },
  {
    kicker: 'Cadre professionnel',
    title: 'Actifs alignés sur l’histoire du produit',
    description: 'Chaque visuel renforce la même narration utilisée sur la landing, la démo et les pages d’architecture.'
  },
  {
    kicker: 'Préparation à l’entretien',
    title: 'Facile à présenter à l’écran',
    description: 'La page est optimisée pour qu’un recruteur ou un interviewer puisse scanner les visuels sans contexte supplémentaire.'
  }
]

const portfolioItems = [
  {
    src: '/images/architecture-flux.svg',
    title: 'Flux de l’application',
    description: 'Une visualisation concise de la chaîne d’exécution Browser → Next.js → API Node.',
    impact: 'Utile pour expliquer pourquoi le frontend utilise des routes internes plutôt que des appels directs browser-to-backend.',
    tags: ['Conception de flux', 'API interne', 'Explication système']
  },
  {
    src: '/images/interface-agent.svg',
    title: 'Interface de démo',
    description: 'Une interface orientée recruteurs axée sur la clarté, la confiance et la compréhension rapide.',
    impact: 'Montre le projet comme un produit fini, pas seulement une démo technique.',
    tags: ['UI/UX', 'Surface de démo', 'Pensée produit']
  },
  {
    src: '/images/systeme-modulaire.svg',
    title: 'Système modulaire',
    description: 'Un élément visuel centré sur l’extensibilité et les limites claires du système.',
    impact: 'Soutient les discussions sur la maintenabilité, le layering et l’extension future.',
    tags: ['Architecture', 'Modularité', 'Scalabilité']
  }
]

export default function PortfolioPage() {
  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="status-pill status-pill--pending">Atouts du portfolio</span>
        <h1>Portefeuille professionnel</h1>
        <p>
          Une couche visuelle conçue pour aider les recruteurs et interviewers à comprendre l’histoire du produit,
          le flux système et l’intention d’ingénierie derrière UNV-HMND.
        </p>
      </section>

      <section className="signal-grid">
        {portfolioHighlights.map((item) => (
          <article className="signal-card" key={item.title}>
            <span className="signal-kicker">{item.kicker}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      <section className="gallery-grid">
        {portfolioItems.map((item) => (
          <article className="gallery-card" key={item.src}>
            <div className="gallery-media">
              <Image alt={item.title} height={900} priority={false} src={item.src} width={1400} />
            </div>

            <div className="gallery-copy">
              <div className="gallery-title-row">
                <h2>{item.title}</h2>
                <span className="status-pill status-pill--pending">Actif local</span>
              </div>
              <p>{item.description}</p>
              <p className="gallery-impact">{item.impact}</p>

              <div className="gallery-tags">
                {item.tags.map((tag) => (
                  <span className="gallery-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
