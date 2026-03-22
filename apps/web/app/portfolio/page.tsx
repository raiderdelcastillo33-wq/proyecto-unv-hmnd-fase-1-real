const portfolioItems = [
  {
    src: '/images/architecture-flux.svg',
    title: 'Flux applicatif',
    description: 'Visualisation du passage Browser → Next → Node API.'
  },
  {
    src: '/images/interface-agent.svg',
    title: 'Surface de démonstration',
    description: 'Exemple d’interface moderne, claire et démontrable.'
  },
  {
    src: '/images/systeme-modulaire.svg',
    title: 'Système modulaire',
    description: 'Base extensible prête pour des produits intelligents.'
  }
]

export default function PortfolioPage() {
  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="status-pill status-pill--pending">Images locales</span>
        <h1>Portfolio</h1>
        <p>Cette section charge ses visuels depuis `apps/web/public/images` sans dépendance externe.</p>
      </section>

      <section className="gallery-grid">
        {portfolioItems.map((item) => (
          <article className="gallery-card" key={item.src}>
            <div className="gallery-media">
              <img alt={item.title} loading="lazy" src={item.src} />
            </div>
            <div className="gallery-copy">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
