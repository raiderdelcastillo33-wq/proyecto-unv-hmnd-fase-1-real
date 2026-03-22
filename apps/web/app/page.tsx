import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <span className="status-pill status-pill--success">Next.js • Node API</span>
          <h1>Développeur Frontend avec architecture IA</h1>
          <p>Application construite avec Next.js + Node API, prête pour évoluer vers des systèmes intelligents.</p>

          <div className="hero-actions">
            <Link className="primary-button" href="/demo">
              Voir la démo
            </Link>
            <Link className="secondary-button" href="/cv">
              Voir mon CV
            </Link>
            <Link className="secondary-button" href="/portfolio">
              Portfolio
            </Link>
          </div>
        </div>

        <aside className="hero-card">
          <p className="result-eyebrow">Architecture</p>
          <h2>Browser → Next → API</h2>
          <p className="meta-text">Le frontend officiel est maintenant Next.js sur `3001`, relié à l’API Node sur `3000`.</p>
        </aside>
      </section>

      <section className="grid-3">
        <article className="info-card">
          <p className="result-eyebrow">Frontend</p>
          <h2>Next.js principal</h2>
          <p>Plus de Vite dans le flux de développement. Toute la navigation passe par l’application `apps/web`.</p>
        </article>
        <article className="info-card">
          <p className="result-eyebrow">Démo</p>
          <h2>Flux réel</h2>
          <p>La page `/demo` appelle l’API interne de Next, puis Next contacte le backend Node sur `3000`.</p>
        </article>
        <article className="info-card">
          <p className="result-eyebrow">Présentation</p>
          <h2>Routes propres</h2>
          <p>La base rend maintenant `/`, `/demo`, `/portfolio` et `/cv` dans l’architecture correcte.</p>
        </article>
      </section>
    </main>
  )
}
