import Link from 'next/link'

const downloadItems = [
  {
    title: 'Curriculum Vitae',
    description: 'CV professionnel avec expérience en développement frontend, intégration IA et architecture de systèmes.',
    href: '/cv/raider-cv.pdf',
    filename: 'Raider-del-Castillo-CV.pdf',
    icon: '📄'
  },
  {
    title: 'Projet Complet',
    description: 'Code source du portfolio complet avec architecture Next.js, backend Node.js et intégration IA.',
    href: 'https://github.com/tu-usuario/proyecto-unv-hmnd',
    external: true,
    icon: '💻'
  }
]

export default function DownloadPage() {
  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="status-pill status-pill--success">Téléchargements disponibles</span>
        <h1>Ressources professionnelles</h1>
        <p>
          Téléchargez mon CV à jour et accédez au code source complet du projet.
          Tout le contenu est préparé pour une évaluation technique et le recrutement.
        </p>
      </section>

      <section className="download-grid">
        {downloadItems.map((item) => (
          <article className="download-card" key={item.title}>
            <div className="download-icon">
              {item.icon}
            </div>

            <div className="download-content">
              <h2>{item.title}</h2>
              <p>{item.description}</p>

              {item.external ? (
                <a
                  className="download-button"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver en GitHub
                </a>
              ) : (
                <a
                  className="download-button"
                  href={item.href}
                  download={item.filename}
                >
                  Descargar
                </a>
              )}
            </div>
          </article>
        ))}
      </section>

      <section className="section-block">
        <article className="story-card">
          <div>
            <p className="result-eyebrow">Intéressé par le projet ?</p>
            <h2 className="section-title">Explorez plus de contenu technique</h2>
            <p>
              Consultez l’architecture du système, testez la démo interactive ou
              explorez les actifs visuels du portfolio.
            </p>
          </div>

          <div className="story-card__actions">
            <Link className="primary-button" href="/demo">
              Tester la démo
            </Link>
            <Link className="secondary-button" href="/about">
              Voir l’architecture
            </Link>
          </div>
        </article>
      </section>
    </main>
  )
}