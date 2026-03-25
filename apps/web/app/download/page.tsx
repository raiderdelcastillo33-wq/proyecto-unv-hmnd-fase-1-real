import Link from 'next/link'

const downloadItems = [
  {
    title: 'Curriculum Vitae',
    description: 'CV profesional con experiencia en desarrollo frontend, integración de IA y arquitectura de sistemas.',
    href: '/cv/raider-cv.pdf',
    filename: 'Raider-del-Castillo-CV.pdf',
    icon: '📄'
  },
  {
    title: 'Proyecto Completo',
    description: 'Código fuente del portfolio completo con arquitectura Next.js, backend Node.js y integración IA.',
    href: 'https://github.com/tu-usuario/proyecto-unv-hmnd',
    external: true,
    icon: '💻'
  }
]

export default function DownloadPage() {
  return (
    <main className="page-shell">
      <section className="page-intro">
        <span className="status-pill status-pill--success">Descargas Disponibles</span>
        <h1>Materiales Profesionales</h1>
        <p>
          Descarga mi CV actualizado y accede al código fuente completo del proyecto.
          Todo el material está preparado para evaluación técnica y reclutamiento.
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
            <p className="result-eyebrow">¿Te interesa el proyecto?</p>
            <h2 className="section-title">Explora más contenido técnico</h2>
            <p>
              Revisa la arquitectura del sistema, prueba la demo interactiva o
              explora los activos visuales del portfolio.
            </p>
          </div>

          <div className="story-card__actions">
            <Link className="primary-button" href="/demo">
              Probar Demo
            </Link>
            <Link className="secondary-button" href="/about">
              Ver Arquitectura
            </Link>
          </div>
        </article>
      </section>
    </main>
  )
}